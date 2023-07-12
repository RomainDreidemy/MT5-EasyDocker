package models

import "github.com/google/uuid"

type ServicePort struct {
	ID      *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Private int        `gorm:"type:integer;not null"`
	Public  int        `gorm:"type:integer;"`

	ServiceID string `gorm:"type:uuid;not null"`
	Service   Service
}

type ServicePortCreateInput struct {
	Private int `json:"private" validate:"required"`
	Public  int `json:"public"`
}

type ServicePortUpdateInput struct {
	ServicePortCreateInput
}

type ServicePortResponse struct {
	ID      *uuid.UUID `json:"id"`
	Private int        `json:"private"`
	Public  int        `json:"public"`
}
