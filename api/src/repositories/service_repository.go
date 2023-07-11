package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gorm.io/gorm"
)

func FindService(id string) (models.Service, *gorm.DB) {
	var service models.Service
	result := initializers.DB.
		Preload("ServiceVolumes").
		Preload("ServiceEnvVariables").
		First(&service, "id = ?", id)
	return service, result
}

func FindServicesByStackId(stackId string) ([]models.Service, *gorm.DB) {
	var services []models.Service
	result := initializers.DB.Where("stack_id = ?", stackId).Find(&services)
	return services, result
}
