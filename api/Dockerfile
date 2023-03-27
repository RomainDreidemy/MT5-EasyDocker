# syntax=docker/dockerfile:1

FROM golang:1.20-alpine

WORKDIR /app

RUN apk add curl
RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

CMD ["air"]
