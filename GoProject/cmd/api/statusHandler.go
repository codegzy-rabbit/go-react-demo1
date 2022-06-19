package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) statusHandler(writer http.ResponseWriter, r *http.Request) {
	currentStatus := AppStatus{"Success", app.config.env, version}
	js, err := json.Marshal(currentStatus)
	if err != nil {
		app.logger.Println("something was wrong")
	}
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	writer.Write(js)
}
