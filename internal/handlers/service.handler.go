package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddNewServiceHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Light Logger is running",
		"status":  "ok",
	})
}
