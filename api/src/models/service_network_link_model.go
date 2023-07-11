package models

type ServiceNetworkLink struct {
	ServiceId            string `gorm:"type:uuid;not null"`
	Service              Service
	NetworkId            string `gorm:"type:uuid;not null"`
	Network              Network
	ServiceArrowPosition string `gorm:"type:varchar(255);not null"`
	NetworkArrowPosition string `gorm:"type:varchar(255);not null"`
}
