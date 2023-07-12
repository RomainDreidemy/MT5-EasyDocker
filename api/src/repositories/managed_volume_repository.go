package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gorm.io/gorm"
)

func FindManagedVolumesByStackId(stackId string) ([]models.ManagedVolume, *gorm.DB) {
	var managedVolumes []models.ManagedVolume
	result := initializers.DB.Where("stack_id = ?", stackId).Find(&managedVolumes)
	return managedVolumes, result
}
