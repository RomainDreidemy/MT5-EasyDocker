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
