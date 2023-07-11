package models

import "github.com/google/uuid"

type ServiceNetworkLink struct {
	ID                   *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	ServiceID            string     `gorm:"type:uuid;not null"`
	Service              Service
	NetworkID            string `gorm:"type:uuid;not null"`
	Network              Network
	ServiceArrowPosition string `gorm:"type:varchar(255);not null"`
	NetworkArrowPosition string `gorm:"type:varchar(255);not null"`
}

type ServiceNetworkLinkResponse struct {
	ID                   *uuid.UUID `json:"id"`
	ServiceID            string     `json:"serviceId"`
	NetworkID            string     `json:"networkId"`
	ServiceArrowPosition string     `json:"serviceArrowPosition"`
	NetworkArrowPosition string     `json:"networkArrowPosition"`
}
