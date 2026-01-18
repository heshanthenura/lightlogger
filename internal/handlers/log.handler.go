package handlers

import (
	"log"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/heshanthenura/lightlogger/internal/db"
	"github.com/heshanthenura/lightlogger/internal/helpers"
	"github.com/heshanthenura/lightlogger/internal/types"
)

func AddNewLogHandler(c *gin.Context) {
	serviceID := c.Param("service_id")
	if serviceID == "" {
		c.JSON(400, gin.H{"error": "ServiceID is required"})
		return
	}

	req, err := helpers.BindJSON[types.LogType](c)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	if strings.TrimSpace(req.Level) == "" || strings.TrimSpace(req.Message) == "" {
		c.JSON(400, gin.H{"error": "Level and Message are required"})
		return
	}

	req.ServiceID = &serviceID
	req.Level = strings.ToLower(strings.TrimSpace(req.Level))
	req.Message = strings.TrimSpace(req.Message)

	ok := db.AddNewLog(&req)
	if !ok {
		c.JSON(500, gin.H{"error": "Failed to create log"})
		return
	}

	log.Printf(
		"Log created | service=%s level=%s message=%s",
		serviceID,
		req.Level,
		req.Message,
	)

	c.JSON(201, gin.H{"message": "Log created successfully"})
}

func GetLogsHandler(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "100")

	page, err := strconv.Atoi(pageStr)
	limit, err := strconv.Atoi(limitStr)

	logs, totalPages, err := db.GetLogs(page, limit)
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to fetch logs"})
		return
	}

	c.JSON(200, gin.H{"logs": logs, "page": page, "limit": limit, "totalPages": totalPages})
}
