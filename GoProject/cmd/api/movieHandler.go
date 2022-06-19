package main

import (
	"backend/models"
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"strconv"
	"time"
)

var movies = models.Movies{
	{1,
		"The Shawshank Redemption",
		"Two imprisoned men bond over a number of years",
		1994,
		time.Now(),
		142,
		5,
		"R",
		time.Now(),
		time.Now(),
		[]models.MovieGenre{}},
	{2,
		"The Godfather",
		"The aging patriarch of an organized crime dynasty transfers control to his son",
		1972,
		time.Now(),
		142,
		5,
		"R",
		time.Now(),
		time.Now(),
		[]models.MovieGenre{}},
	{3,
		"American Psycho",
		"A wealthy New York investment banking executive hides his alternate psychopathic ego",
		2000,
		time.Now(),
		142,
		5,
		"R",
		time.Now(),
		time.Now(),
		[]models.MovieGenre{}},
	{4,
		"The Dark Knight",
		"The menace known as the Joker wreaks havoc on Gotham City",
		2008,
		time.Now(),
		142,
		5,
		"R",
		time.Now(),
		time.Now(),
		[]models.MovieGenre{}},
}

func (app *application) getOneMovie(writer http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	id, err := strconv.Atoi(params.ByName("id"))
	if id > len(movies) {
		writer.WriteHeader(http.StatusBadRequest)
		writer.Write([]byte("the id is not exist"))
		return
	}
	if err != nil {
		app.logger.Println("something was wrong")
		app.errorJson(writer, err)
		return
	}
	err = app.writeJson(writer, http.StatusOK, movies[id-1], "movie")
	if err != nil {
		app.logger.Println("something was wrong")
		app.errorJson(writer, err)
	}
}

func (app *application) getAllMovies(writer http.ResponseWriter, r *http.Request) {

	err := app.writeJson(writer, http.StatusOK, movies, "movies")
	if err != nil {
		app.logger.Println("movies api was wrong")
		app.errorJson(writer, err)
	}
}

func (app *application) editMovie(writer http.ResponseWriter, r *http.Request) {
	var movie models.Movie
	err := json.NewDecoder(r.Body).Decode(&movie)
	if err != nil {
		app.logger.Println("editMovie api was wrong 1")
		app.errorJson(writer, err)
	}
	movies[movie.ID-1] = movie
	err = app.writeJson(writer, http.StatusOK, "success", "status")
	if err != nil {
		app.logger.Println("editMovie api was wrong 2")
		app.errorJson(writer, err)
	}
}

func (app *application) deleteMovie(writer http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Println("something was wrong1")
		app.errorJson(writer, err)
	}
	movies = append(movies[:id], movies[id+1:]...)
	err = app.writeJson(writer, http.StatusOK, "success", "status")
	if err != nil {
		app.logger.Println("something was wrong2")
		app.errorJson(writer, err)
	}
}
