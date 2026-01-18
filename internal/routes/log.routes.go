package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/handlers"
)

func RegisterLogRoutes(r *gin.RouterGroup) {
	serviceGroup := r.Group("/log")
	serviceGroup.GET("/add/:service_id", handlers.AddNewLogHandler)
	serviceGroup.GET("/get", handlers.GetLogsHandler)
}
