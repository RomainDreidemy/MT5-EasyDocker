package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func FindStack(stackId string) (models.Stack, *gorm.DB) {
	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ?", stackId)

	return stack, result
}

func GetStackByIdForAUser(stackId string, userId uuid.UUID) (*gorm.DB, models.Stack) {
	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", stackId, userId)

	return result, stack
}

func GetStacksForAUser(userId uuid.UUID) ([]models.Stack, *gorm.DB) {
	var stacks []models.Stack

	result := initializers.DB.Where("user_id = ?", userId).Find(&stacks)

	return stacks, result
}
