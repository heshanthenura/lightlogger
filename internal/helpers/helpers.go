package helpers

import (
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
)

func BindJSON[T any](c *gin.Context) (T, error) {
	var req T
	err := c.ShouldBindJSON(&req)
	return req, err
}

func GenerateServiceID() string {
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	rand.Seed(time.Now().UnixNano())

	b := make([]byte, 10)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}

	return "svc_" + string(b)
}
