# syntax=docker/dockerfile:1

FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod go.sum /app/

RUN go mod download && go mod verify

RUN go install github.com/cosmtrek/air@latest
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.53.3

COPY . /app

ENTRYPOINT ["air"]
