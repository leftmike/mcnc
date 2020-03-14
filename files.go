package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	indexHTML = `
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>mCNC</title>
</head>
<body>
Use ./mcnc --files app/build<p>
Need to include app/build in mcnc and serve it from there
</body>
</html>
`
)

var (
	filesDir = flag.String("files", "",
		"directory for files rather than builtin ones (development)")
)

func fileHandler(w http.ResponseWriter, req *http.Request) {
	log.Printf("url path: %s\n", req.URL.Path)

	// XXX: need to set cache control
	// Cache-Control: max-age=31536000 for your build/static assets
	// Cache-Control: no-cache for everything else

	if req.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	if *filesDir != "" {
		n := filepath.Join(*filesDir, req.URL.Path)
		log.Printf("file: %s\n", n)

		f, err := os.Open(n)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error: os.Open(%q): %s", n, err)
			return
		}
		defer f.Close()

		_, err = io.Copy(w, f)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error: io.Copy(%q): %s", n, err)
			return
		}
	} else {
		if req.URL.Path == "/" || req.URL.Path == "/index.html" {
			_, err := io.WriteString(w, indexHTML)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				fmt.Fprintf(w, "Error: io.WriteString(%q): %s", req.URL.Path, err)
				return
			}
		} else {
			http.NotFound(w, req)
			return
		}

	}
}

func init() {
	http.HandleFunc("/", fileHandler)
}
