package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gorm.io/gorm"
)

func FindServiceNetworkLinksByStackId(stackId string) ([]models.ServiceNetworkLink, *gorm.DB) {
	var serviceNetworkLinks []models.ServiceNetworkLink
	db := initializers.DB.
		Joins("Service").
		Where("stack_id = ?", stackId).
		Find(&serviceNetworkLinks)

	return serviceNetworkLinks, db
}
