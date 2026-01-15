-- Active: 1768393419490@@172.19.0.2@5432@lightlogger@public

CREATE TABLE IF NOT EXISTS users (
    id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(255) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL
);

INSERT INTO
    users (username, password_hash)
VALUES (
        'admin',
        '$2y$10$zkbQhQJeSNXKnkPkmSFlyudZks5PE8l8.AYM7an0TN5zBw53DnIJ.'
    );

CREATE TABLE IF NOT EXISTS services (
    service_id VARCHAR(255) PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_description VARCHAR(1024) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);