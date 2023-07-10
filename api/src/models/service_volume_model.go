package models

import "github.com/google/uuid"

type ServiceVolume struct {
	ID            *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	LocalPath     string     `gorm:"type:varchar(255);not null"`
	ContainerPath string     `gorm:"type:varchar(255)"`

	ServiceID string `gorm:"type:uuid;not null"`
	Service   Service
}

type ServiceVolumeCreateInput struct {
	LocalPath     string `json:"localPath" validate:"required"`
	ContainerPath string `json:"containerPath"`
}

type ServiceVolumeUpdateInput struct {
	ServiceVolumeCreateInput
}

type ServiceVolumeResponse struct {
	ID            *uuid.UUID `json:"id"`
	LocalPath     string     `json:"localPath"`
	ContainerPath string     `json:"containerPath"`
}
