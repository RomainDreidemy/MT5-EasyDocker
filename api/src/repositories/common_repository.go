package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"gorm.io/gorm"
)

func Find[Model interface{}](id string) (Model, *gorm.DB) {
	var object Model
	result := initializers.DB.First(&object, "id = ?", id)
	return object, result
}
