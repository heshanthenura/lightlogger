package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/db"
	"github.com/heshanthenura/lightlogger/internal/helpers"
	"github.com/heshanthenura/lightlogger/internal/types"
)

func GetAllServicesHandler(c *gin.Context) {
	services, err := db.GetAllServices()
	if err != nil {
		log.Println("Failed to fetch services:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch services",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"services": services,
	})
}

func AddNewServiceHandler(c *gin.Context) {
	req, err := helpers.BindJSON[types.ServiceType](c)
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

	if db.AddNewService(&req) {
		log.Printf("Received new service: %+v\n", req)
		c.JSON(http.StatusOK, gin.H{
			"message": "Service added successfully",
		})
	} else {
		log.Println("Failed to add new service")
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to add service",
		})
	}
}
