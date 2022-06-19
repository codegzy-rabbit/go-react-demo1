package models

import "time"

type Movies []Movie

type Movie struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	Year        int          `json:"year"`
	ReleaseDate time.Time    `json:"release_date"`
	Runtime     int          `json:"runtime"`
	Rating      int          `json:"rating"`
	MPAARating  string       `json:"mpaa_rating"`
	CreateAt    time.Time    `json:"create_at"`
	UpdateAt    time.Time    `json:"update_at"`
	MovieGenre  []MovieGenre `json:"-"`
}

type Genre struct {
	ID        int       `json:"id"`
	GenreName string    `json:"genre_name"`
	CreateAt  time.Time `json:"create_at"`
	UpdateAt  time.Time `json:"update_at"`
}

type MovieGenre struct {
	ID       int       `json:"id"`
	MovieId  string    `json:"movie_id"`
	GenreId  int       `json:"genre_id"`
	Genre    Genre     `json:"genre"`
	CreateAt time.Time `json:"create_at"`
	UpdateAt time.Time `json:"update_at"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
