package types

import "time"

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
