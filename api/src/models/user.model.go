package models

import (
	"github.com/google/uuid"
)

type User struct {
	ID       *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Email    string     `gorm:"type:varchar(100);uniqueIndex;not null"`
	Password string     `gorm:"type:varchar(100);not null"`
}

type SignUpInput struct {
	Email           string `json:"email" validate:"required"`
	Password        string `json:"password" validate:"required,min=8"`
	PasswordConfirm string `json:"passwordConfirm" validate:"required,min=8"`
}

type SignInInput struct {
	Email    string `json:"email"  validate:"required"`
	Password string `json:"password"  validate:"required"`
}

type UserResponse struct {
	ID    uuid.UUID `json:"id,omitempty"`
	Email string    `json:"email,omitempty"`
}

func FilterUserRecord(user *User) UserResponse {
	return UserResponse{
		ID:    *user.ID,
		Email: user.Email,
	}
}
