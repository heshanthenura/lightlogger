package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/handlers"
)

func RegisterIndexRoutes(r *gin.Engine) {
	r.GET("/", handlers.IndexHandler)
}
