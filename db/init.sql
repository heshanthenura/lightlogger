-- Active: 1768393419490@@172.19.0.2@5432@lightlogger@public

CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'log_level') THEN
        CREATE TYPE log_level AS ENUM (
            'debug',
            'info',
            'warn',
            'error',
            'fatal'
        );
    END IF;
END$$;


CREATE TABLE IF NOT EXISTS logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id VARCHAR(255) NOT NULL,
    level log_level NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_service
        FOREIGN KEY (service_id)
        REFERENCES services(service_id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_logs_service_id ON logs (service_id);
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs (level);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs (created_at);
CREATE INDEX IF NOT EXISTS idx_logs_service_time ON logs (service_id, created_at DESC);