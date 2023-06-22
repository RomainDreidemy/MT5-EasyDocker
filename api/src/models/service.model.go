package models

import "github.com/google/uuid"

type Service struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	DockerImage string     `gorm:"type:varchar(255)"`
	DockerTag   string     `gorm:"type:varchar(255)"`
	Entrypoint  string     `gorm:"type:varchar(255)"`
	Description string     `gorm:"type:text"`
	PositionX   float32    `gorm:"type:decimal(20,8);not null"`
	PositionY   float32    `gorm:"type:decimal(20,8);not null"`

	StackID *uuid.UUID `gorm:"type:uuid;not null"`
	Stack   Stack
}

type ServiceCreateInput struct {
	DockerImage string  `json:"dockerImage"`
	DockerTag   string  `json:"dockerTag"`
	Entrypoint  string  `json:"entrypoint"`
	Description string  `json:"description"`
	PositionX   float32 `json:"positionX" validate:"required"`
	PositionY   float32 `json:"positionY" validate:"required"`
}

type ServiceResponse struct {
	ID          *uuid.UUID `json:"id"`
	DockerImage string     `json:"dockerImage"`
	DockerTag   string     `json:"dockerTag"`
	Entrypoint  string     `json:"entrypoint"`
	Description string     `json:"description"`
	PositionX   float32    `json:"positionX"`
	PositionY   float32    `json:"positionY"`
}
