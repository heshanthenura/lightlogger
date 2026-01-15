package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	apiGrp := r.Group("/api/v1")
	RegisterIndexRoutes(apiGrp)
	RegisterServiceRoutes(apiGrp)
	RegisterLogRoutes(apiGrp)
}
