package main

/*

- include app/build/* in the executable and serve from there; see go-bindata
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
	log.Fatal(http.ListenAndServe("localhost:8241", nil))
}
