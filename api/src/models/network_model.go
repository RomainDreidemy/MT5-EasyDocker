package models

import "github.com/google/uuid"

type Network struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Name        string     `gorm:"type:varchar(255)"`
	IsExternal  bool       `gorm:"type:boolean"`
	Description string     `gorm:"type:text"`
	PositionX   float32    `gorm:"type:decimal(20,8);not null"`
	PositionY   float32    `gorm:"type:decimal(20,8);not null"`

	StackID string `gorm:"type:uuid;not null"`
	Stack   Stack

	ServiceNetworkLinks []ServiceNetworkLink `gorm:"constraint:OnDelete:CASCADE;"`
}

type NetworkResponse struct {
	ID          *uuid.UUID `json:"id"`
	Name        string     `json:"name"`
	IsExternal  bool       `json:"isExternal"`
	Description string     `json:"description"`
	PositionX   float32    `json:"positionX"`
	PositionY   float32    `json:"positionY"`
}

type NetworkCreateInput struct {
	Name        string  `json:"name" validate:"required"`
	IsExternal  bool    `json:"isExternal"`
	Description string  `json:"description"`
	PositionX   float32 `json:"positionX" validate:"required"`
	PositionY   float32 `json:"positionY" validate:"required"`
}

type NetworkUpdateInput struct {
	Name        string  `json:"name"`
	IsExternal  bool    `json:"isExternal"`
	Description string  `json:"description"`
	PositionX   float32 `json:"positionX"`
	PositionY   float32 `json:"positionY"`
}
