package models

import "github.com/google/uuid"

type ManagedVolume struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Name        string     `gorm:"type:varchar(255)"`
	Description string     `gorm:"type:text"`
	PositionX   float32    `gorm:"type:decimal(20,8);not null"`
	PositionY   float32    `gorm:"type:decimal(20,8);not null"`

	StackID string `gorm:"type:uuid;not null"`
	Stack   Stack
}

type ManagedVolumeResponse struct {
	ID   *uuid.UUID `json:"id"`
	Name string     `json:"name"`

	Description string  `json:"description"`
	PositionX   float32 `json:"positionX"`
	PositionY   float32 `json:"positionY"`
}

type ManagedVolumeCreateInput struct {
	Name        string  `json:"name" validate:"required"`
	Description string  `json:"description"`
	PositionX   float32 `json:"positionX" validate:"required"`
	PositionY   float32 `json:"positionY" validate:"required"`
}

type ManagedVolumeUpdateInput struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	PositionX   float32 `json:"positionX"`
	PositionY   float32 `json:"positionY"`
}
