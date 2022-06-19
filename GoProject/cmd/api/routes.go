package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()
	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)
	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	router.HandlerFunc(http.MethodPut, "/v1/movie/edit", app.editMovie)
	router.HandlerFunc(http.MethodGet, "/v1/admin/delete/:id", app.deleteMovie)
	router.HandlerFunc(http.MethodPost, "/v1/login", app.login)
	return app.enableCORS(router)
}
