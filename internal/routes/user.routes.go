package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/handlers"
)

func RegisterUserRoutes(r *gin.RouterGroup) {
	userGroup := r.Group("/user")
	userGroup.POST("/login", handlers.LoginHandler)
	userGroup.GET("/check", handlers.CheckAuthHandler)
	userGroup.POST("/logout", handlers.LogoutHandler)
	userGroup.POST("/reset-password", handlers.ResetPasswordHandler)
}
