package main

/*

UI:
- indication whether /control is connected or not
- reconnect /control if necessary
- indicator of connected or not; add events to CtrlWebSocket

Manager:
- Shared state which multiple UIs can access: use go routines and channels
- add mode: whether the machine is running gcode or not

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
	setupControlServer()
	setupFileServer()

	log.Fatal(http.ListenAndServe("localhost:8241", nil))
}
