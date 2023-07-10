package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gorm.io/gorm"
)

func FindServicePort(id string) (models.Service, *gorm.DB) {
	var service models.Service
	result := initializers.DB.First(&service, "id = ?", id)
	return service, result
}

func FindServicePortsByServiceId(serviceId string) ([]models.ServicePort, *gorm.DB) {
	var servicePorts []models.ServicePort
	result := initializers.DB.Where("service_id = ?", serviceId).Find(&servicePorts)
	return servicePorts, result
}
