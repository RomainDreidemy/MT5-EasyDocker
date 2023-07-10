package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"gorm.io/gorm"
)

func FindServiceRelation[Model interface{}](id string) (Model, *gorm.DB) {
	var relation Model
	result := initializers.DB.First(&relation, "id = ?", id)
	return relation, result
}

func FindServiceRelationsByServiceId[Model interface{}](serviceId string) ([]Model, *gorm.DB) {
	var relations []Model
	result := initializers.DB.Where("service_id = ?", serviceId).Find(&relations)
	return relations, result
}
