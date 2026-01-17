package types

import "time"

type UserType struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"-"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type ResetPasswordRequest struct {
	Username    string `json:"username" binding:"required"`
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

type ServiceType struct {
	ServiceID   *string    `json:"service_id"`
	Name        string     `json:"service_name"`
	Description string     `json:"service_description"`
	CreatedAt   *time.Time `json:"created_at"`
}

type LogType struct {
	LogID     *string      `json:"log_id"`
	ServiceID *string      `json:"service_id"`
	Level     string       `json:"level"`
	Message   string       `json:"message"`
	Metadata  *interface{} `json:"metadata"`
	CreatedAt *time.Time   `json:"created_at"`
}
