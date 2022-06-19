package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
}

type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
	Version     string `json:"version"`
}

type application struct {
	config config
	logger *log.Logger
}

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment development")
	flag.Parse()

	fmt.Println("Http Running...")
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)
	app := &application{config: cfg, logger: logger}

	srv := &http.Server{Addr: fmt.Sprintf(":%d", app.config.port), Handler: app.routes()}
	err := srv.ListenAndServe()

	if err != nil {
		log.Println(err)
	}
}
