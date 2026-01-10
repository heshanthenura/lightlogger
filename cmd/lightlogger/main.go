package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.String(200, "Light Logger is sd")
	})

	fmt.Print("Hello This is a change done by Dasun")

	r.Run(":8080")
}
