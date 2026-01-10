FROM golang:1.25-alpine AS development

WORKDIR /app

RUN apk add --no-cache git && go install github.com/air-verse/air@v1.63.6

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN mkdir -p bin

EXPOSE 8080
CMD ["air", "-c", ".air.toml"]
