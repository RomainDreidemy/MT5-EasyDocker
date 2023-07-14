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
		Preload("ServicePorts").
		First(&service, "id = ?", id)
	return service, result
}

func FindServicesByStackId(stackId string) ([]models.Service, *gorm.DB) {
	var services []models.Service
	result := initializers.DB.Where("stack_id = ?", stackId).Find(&services)
	return services, result
}

func FindServicesByStackIdWithAssociation(stackId string) ([]models.Service, *gorm.DB) {
	var services []models.Service
	result := initializers.DB.
		Preload("ServiceVolumes").
		Preload("ServiceEnvVariables").
		Preload("ServicePorts").
		Where("stack_id = ?", stackId).
		Find(&services)
	return services, result
}

func CreateService(service *models.Service) *gorm.DB {
	result := initializers.DB.Create(&service)
	return result
}

func DeleteService(service models.Service) *gorm.DB {
	result := initializers.DB.Delete(&service)
	return result
}
