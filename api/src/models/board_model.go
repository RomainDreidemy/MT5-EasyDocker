package models

import "github.com/google/uuid"

type Board struct {
	Services []BoardItem `json:"services"`
	Networks []BoardItem `json:"networks"`
}

type BoardItem struct {
	ID        *uuid.UUID `json:"id"`
	Name      string     `json:"name"`
	PositionX float32    `json:"positionX"`
	PositionY float32    `json:"positionY"`
}