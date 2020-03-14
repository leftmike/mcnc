package main

//go:generate statik -src=app/build -p appdata

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	statikfs "github.com/rakyll/statik/fs"

	_ "github.com/leftmike/mcnc/appdata"
)

var (
	filesDir = flag.String("files", "",
		"directory for files rather than builtin ones (development)")
)

type fileHandler struct {
	handler http.Handler
	fs      http.FileSystem
}

func (fh fileHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	log.Printf("url path: %s\n", req.URL.Path)

	if req.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	if req.URL.Path != "/" {
		f, err := fh.fs.Open(req.URL.Path)
		if err != nil {
			if os.IsNotExist(err) {
				http.NotFound(w, req)
				return
			} else {
				w.WriteHeader(http.StatusInternalServerError)
				fmt.Fprintf(w, "Error: Open(%q): %s", req.URL.Path, err)
				return
			}
		} else {
			fi, err := f.Stat()
			f.Close()
			if err != nil || fi.IsDir() {
				http.NotFound(w, req)
				return
			}
		}
	}

	fh.handler.ServeHTTP(w, req)

	// XXX
	// Cache-Control: max-age=31536000 for your build/static assets
	// Cache-Control: no-cache for everything else
}

func setupFileServer() {
	var fs http.FileSystem

	if *filesDir != "" {
		fs = http.Dir(*filesDir)
	} else {
		var err error
		fs, err = statikfs.New()
		if err != nil {
			log.Fatal(err)
		}
	}

	http.Handle("/", fileHandler{
		handler: http.FileServer(fs),
		fs:      fs,
	})
}
