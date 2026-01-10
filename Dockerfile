FROM golang:1.25-alpine AS development

# Install air for hot reload
RUN go install github.com/air-verse/air@latest

# Set working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Create bin directory
RUN mkdir -p bin

# Expose port
EXPOSE 8080

# Use air for hot reload in development
CMD ["air", "-c", ".air.toml"]

# Production stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN go build -o bin/lightlogger cmd/lightlogger/main.go

# Final production stage
FROM alpine:latest AS production

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/bin/lightlogger .

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./lightlogger"]