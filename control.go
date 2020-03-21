package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	ignoreOrigin = flag.Bool("origin", false, "ignore origin for websocket")
)

var (
	tagSeparator   = []byte(":")
	msgDeltaTag    = []byte("delta")
	msgPositionTag = []byte("position")
)

type msgDelta struct {
	DeltaX float64
	DeltaY float64
	DeltaZ float64
}

type msgPosition struct {
	MachineX float64
	MachineY float64
	MachineZ float64
}

func sendMsgPosition(c *websocket.Conn, machineX, machineY, machineZ float64) error {
	msg := msgPosition{machineX, machineY, machineZ}
	buf, err := json.Marshal(msg)
	if err != nil {
		return fmt.Errorf("marshal: %s", err)
	}

	buf = bytes.Join([][]byte{msgPositionTag, buf}, tagSeparator)
	if err := c.WriteMessage(websocket.TextMessage, buf); err != nil {
		return fmt.Errorf("write message: %s", err)
	}
	return nil
}

func controlHandler(w http.ResponseWriter, req *http.Request) {
	log.Println("/control")

	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	if *ignoreOrigin {
		upgrader.CheckOrigin = func(req *http.Request) bool { return true }
	}

	c, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		log.Printf("Upgrade: %s", err)
		return

	}
	defer c.Close()

	var machineX, machineY, machineZ float64

	for {
		err := sendMsgPosition(c, machineX, machineY, machineZ)
		if err != nil {
			log.Printf("sendMsgPosition: %s", err)
			return
		}

		mtyp, buf, err := c.ReadMessage()
		if err != nil {
			log.Printf("ReadMessage: %s", err)
			return
		}
		if mtyp != websocket.TextMessage {
			log.Printf("expected text message: %d", mtyp)
			return
		}

		fields := bytes.SplitN(buf, tagSeparator, 2)
		if bytes.Equal(fields[0], msgDeltaTag) {
			var delta msgDelta
			err = json.Unmarshal(fields[1], &delta)
			if err != nil {
				log.Printf("Unmarshal(%s): %s", string(fields[1]), err)
				return
			}

			machineX += delta.DeltaX
			machineY += delta.DeltaY
			machineZ += delta.DeltaZ
		} else {
			log.Printf("unexpected message type: %s", string(fields[0]))
			return
		}
	}
}

func setupControlServer() {
	http.HandleFunc("/control", controlHandler)
}
