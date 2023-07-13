package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gorm.io/gorm"
)

func FindNetwork(id string) (models.Network, *gorm.DB) {
	var network models.Network
	result := initializers.DB.First(&network, "id = ?", id)
	return network, result
}

func FindNetworksByStackId(stackId string) ([]models.Network, *gorm.DB) {
	var networks []models.Network
	result := initializers.DB.Where("stack_id = ?", stackId).Find(&networks)
	return networks, result
}

func CreateNetwork(network *models.Network) *gorm.DB {
	result := initializers.DB.Create(network)
	return result
}

func UpdateNetwork(network models.Network, updatedNetwork models.Network) *gorm.DB {
	result := initializers.DB.Model(&network).Updates(updatedNetwork)
	return result
}

func DeleteNetwork(network models.Network) *gorm.DB {
	result := initializers.DB.Delete(&network)
	return result
}
