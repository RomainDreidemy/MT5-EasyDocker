package models

import "github.com/google/uuid"

type Stack struct {
	ID          *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Name        string     `gorm:"type:varchar(100);not null"`
	Description string     `gorm:"type:text"`
	UserID      *uuid.UUID
	User        User
}
