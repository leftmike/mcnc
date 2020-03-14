package main

/*

- set cache control

*/

import (
	_ "expvar"
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("mCNC")

	flag.Parse()
	setupFileServer()

	log.Fatal(http.ListenAndServe("localhost:8241", nil))
}
