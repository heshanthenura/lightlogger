package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/db"
	"github.com/heshanthenura/lightlogger/internal/routes"
)

func main() {
	db.Connect()
	defer db.Pool.Close()

	r := gin.Default()
	routes.RegisterRoutes(r)
	log.Println("Light Logger starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
