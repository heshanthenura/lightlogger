package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/helpers"
	"github.com/heshanthenura/lightlogger/internal/types"
)

func AddNewServiceHandler(c *gin.Context) {
	req, err := helpers.BindJSON[types.AddNewServiceType](c)
	if err != nil {
		log.Println("Failed to parse request payload:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON format",
		})
		return
	}

	if req.Name == "" {
		log.Println("Service name is required")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Service name is required",
		})
		return
	}

	if req.Description == "" {
		log.Println("Service description is required")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Service description is required",
		})
		return
	}

	if len(req.Name) > 255 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Service name must be less than 255 characters",
		})
		return
	}

	if len(req.Description) > 1000 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Service description must be less than 1000 characters",
		})
		return
	}

	log.Printf("Received new service: %+v\n", req)
	c.JSON(http.StatusOK, gin.H{
		"message": "Service added successfully",
	})
}
