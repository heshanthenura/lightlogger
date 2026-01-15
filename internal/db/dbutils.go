package db

import (
	"context"

	"github.com/heshanthenura/lightlogger/internal/helpers"
	"github.com/heshanthenura/lightlogger/internal/types"
)

func AddNewService(service *types.ServiceType) bool {
	id := helpers.GenerateServiceID()
	service.ServiceID = &id

	_, err := Pool.Exec(context.Background(), `
        INSERT INTO services (service_id, service_name, service_description)
        VALUES ($1, $2, $3)
    `,
		*service.ServiceID,
		service.Name,
		service.Description,
	)

	return err == nil
}

func GetAllServices() ([]types.ServiceType, error) {
	var services []types.ServiceType

	rows, err := Pool.Query(context.Background(), `
        SELECT service_id, service_name, service_description, created_at
        FROM services
    `)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var s types.ServiceType
		err := rows.Scan(
			&s.ServiceID,
			&s.Name,
			&s.Description,
			&s.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		services = append(services, s)
	}

	return services, nil
}
