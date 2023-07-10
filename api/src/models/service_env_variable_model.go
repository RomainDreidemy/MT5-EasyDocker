package models

import "github.com/google/uuid"

type ServiceEnvVariable struct {
	ID    *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Key   string     `gorm:"type:varchar(255);not null"`
	Value string     `gorm:"type:varchar(255)"`

	ServiceID string `gorm:"type:uuid;not null"`
	Service   Service
}

type ServiceEnvVariableCreateInput struct {
	Key   string `json:"key" validate:"required"`
	Value string `json:"value" validate:"required"`
}

type ServiceEnvVariableUpdateInput struct {
	ServiceEnvVariableCreateInput
}

type ServiceEnvVariableResponse struct {
	ID    *uuid.UUID `json:"id"`
	Key   string     `json:"key"`
	Value string     `json:"value"`
}
