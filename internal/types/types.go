package types

import "time"

type ServiceType struct {
	ServiceID   *string    `json:"service_id"`
	Name        string     `json:"service_name"`
	Description string     `json:"service_description"`
	CreatedAt   *time.Time `json:"created_at"`
}
