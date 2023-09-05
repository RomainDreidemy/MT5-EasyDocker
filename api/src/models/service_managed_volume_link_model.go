package models

type ServiceManagedVolumeLink struct {
	ID        string `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	ServiceID string `gorm:"type:uuid;not null"`
	Service   Service

	ManagedVolumeID string `gorm:"type:uuid;not null"`
	ManagedVolume   ManagedVolume

	ServiceArrowPosition       string `gorm:"type:varchar(255);not null"`
	ManagedVolumeArrowPosition string `gorm:"type:varchar(255);not null"`

	ContainerPath string `gorm:"type:varchar(255)"`
}

type ServiceManagedVolumeLinkResponse struct {
	ID                         string `json:"id"`
	ServiceID                  string `json:"serviceId"`
	ManagedVolumeID            string `json:"managedVolumeId"`
	ServiceArrowPosition       string `json:"serviceArrowPosition"`
	ManagedVolumeArrowPosition string `json:"managedVolumeArrowPosition"`
	ContainerPath              string `json:"containerPath"`
}

type ServiceManagedVolumeLinkCreateInput struct {
	ServiceID                  string `json:"serviceId" validate:"required,uuid4"`
	ManagedVolumeID            string `json:"managedVolumeId" validate:"required,uuid4"`
	ServiceArrowPosition       string `json:"serviceArrowPosition" validate:"required,oneof=top bottom left right"`
	ManagedVolumeArrowPosition string `json:"managedVolumeArrowPosition" validate:"required,oneof=top bottom left right"`
	ContainerPath              string `json:"containerPath"`
}

type ServiceManagedVolumeLinkUpdateInput struct {
	ContainerPath string `json:"containerPath"`
}
