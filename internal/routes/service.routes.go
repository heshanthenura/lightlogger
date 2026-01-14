package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/handlers"
)

func RegisterServiceRoutes(r *gin.RouterGroup) {
	serviceGroup := r.Group("/service")

	serviceGroup.POST("/new", handlers.AddNewServiceHandler)
}
