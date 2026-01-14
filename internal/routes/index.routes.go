package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/handlers"
)

func RegisterIndexRoutes(r *gin.RouterGroup) {
	r.GET("/", handlers.IndexHandler)
}
