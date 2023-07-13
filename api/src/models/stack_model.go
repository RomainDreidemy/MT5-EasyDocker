package models

import "github.com/google/uuid"

type Stack struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Name        string     `gorm:"type:varchar(100);not null"`
	Description string     `gorm:"type:text"`
	UserID      *uuid.UUID
	User        User
	Services    []Service `gorm:"constraint:OnDelete:CASCADE;"`
}

type StackCreateInput struct {
	Name        string `json:"name" validate:"required,min=3,max=100"`
	Description string `json:"description"`
}

type StackUpdateInput struct {
	StackCreateInput
}

type StackResponse struct {
	ID          *uuid.UUID `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
}
