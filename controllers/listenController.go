package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/lib/pq"
	"net/http"
	"time"
)

var prettyJSON bytes.Buffer

func waitForNotification(l *pq.Listener) bytes.Buffer {
	for {
		select {
		case n := <-l.Notify:
			fmt.Println("Received data from channel [", n.Channel, "] :")
			// Prepare notification payload for pretty print
			err := json.Indent(&prettyJSON, []byte(n.Extra), "", "\t")
			if err != nil {
				fmt.Println("Error processing JSON: ", err)
				return prettyJSON
			}
			fmt.Println(string(prettyJSON.Bytes()))
			return prettyJSON
		case <-time.After(90 * time.Second):
			//fmt.Println("Received no events for 90 seconds, checking connection")
			//go func() {
			//	l.Ping()
			//}()
			return prettyJSON
		}
	}
}

func ListenNotify(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-Type", "application/json")
	//
	//_, err := sql.Open("postgres", models.GetDBUrl())
	//if err != nil {
	//	panic(err)
	//}
	//
	//reportProblem := func(ev pq.ListenerEventType, err error) {
	//	if err != nil {
	//		fmt.Println(err.Error())
	//	}
	//}
	//
	//listener := pq.NewListener(models.GetDBUrl(), 10*time.Second, time.Minute, reportProblem)
	//err = listener.Listen("event_channel")
	//if err != nil {
	//	panic(err)
	//}
	//
	//fmt.Println("Start monitoring PostgreSQL...")
	//waitForNotification(listener)
	////fmt.Fprintf(w, "Привет!")
	//json.NewEncoder(w).Encode(string(prettyJSON.Bytes()))
	//prettyJSON = bytes.Buffer{}
	////ListenNotify(w, r)
}
