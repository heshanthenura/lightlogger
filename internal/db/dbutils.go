package db

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"

	"github.com/heshanthenura/lightlogger/internal/helpers"
	"github.com/heshanthenura/lightlogger/internal/types"
)

func GetUserByUsername(username string) (*types.UserType, error) {
	var user types.UserType

	err := Pool.QueryRow(context.Background(), `
        SELECT id, username, password_hash
        FROM users
        WHERE username = $1
    `, username).Scan(&user.ID, &user.Username, &user.PasswordHash)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUserPassword(userID int, newPasswordHash string) error {
	_, err := Pool.Exec(context.Background(), `
        UPDATE users
        SET password_hash = $1
        WHERE id = $2
    `, newPasswordHash, userID)

	return err
}

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

func AddNewLog(logData *types.LogType) bool {
	var metadata interface{}

	if logData.Metadata != nil {
		b, err := json.Marshal(logData.Metadata)
		if err != nil {
			log.Println("AddNewLog | metadata marshal error:", err)
			return false
		}
		metadata = b
	} else {
		metadata = nil
	}

	_, err := Pool.Exec(
		context.Background(),
		`
        INSERT INTO logs (service_id, level, message, metadata)
        VALUES ($1, $2, $3, $4)
        `,
		*logData.ServiceID,
		logData.Level,
		logData.Message,
		metadata,
	)

	if err != nil {
		log.Println("AddNewLog | db insert error:", err)
		return false
	}

	return true
}

func GetLogs(page int, limit int) ([]types.LogType, int, error) {
	if limit <= 0 {
		return nil, 0, fmt.Errorf("limit must be positive")
	}
	offset := (page - 1) * limit
	log.Printf("GetLogs | page=%d limit=%d offset=%d", page, limit, offset)

	var totalCount int
	if err := Pool.QueryRow(context.Background(), `SELECT COUNT(*) FROM logs`).Scan(&totalCount); err != nil {
		log.Println("GetLogs | count query error:", err)
		return nil, 0, err
	}
	totalPages := int(math.Ceil(float64(totalCount) / float64(limit)))

	var logs []types.LogType

	rows, err := Pool.Query(context.Background(), `
        SELECT log_id, service_id, level, message, metadata, created_at
        FROM logs
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    `, limit, offset)
	if err != nil {
		log.Println("GetLogs | query error:", err)
		return nil, 0, err
	}
	defer rows.Close()

	for rows.Next() {
		var l types.LogType
		var metadata []byte

		if err := rows.Scan(
			&l.LogID,
			&l.ServiceID,
			&l.Level,
			&l.Message,
			&metadata,
			&l.CreatedAt,
		); err != nil {
			log.Println("GetLogs | scan error:", err)
			return nil, 0, err
		}

		l.Metadata = nil
		logs = append(logs, l)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, err
	}

	return logs, totalPages, nil
}
