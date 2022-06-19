package main

import (
	"backend/models"
	"encoding/json"
	"net/http"
)

var admin models.User = models.User{
	Username: "rabbit",
	Password: "fox",
}

func (app *application) login(writer http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		app.logger.Println("login api, json to struct was wrong")
		app.errorJson(writer, err)
	}
	app.logger.Println("user data is ", user)
	if user == admin {
		app.writeJson(writer, http.StatusOK, "success", "status")
		return
	}
	app.writeJson(writer, http.StatusOK, "fail", "status")
}
