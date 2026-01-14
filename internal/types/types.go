package types

type AddNewServiceType struct {
	ServiceID   *string `json:"service_id"`
	Name        string  `json:"service_name"`
	Description string  `json:"service_description"`
	CreatedAt   *string `json:"created_at"`
}
