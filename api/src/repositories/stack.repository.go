package repositories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetStackByIdForAUser(stackId *uuid.UUID, userId uuid.UUID) (*gorm.DB, models.Stack) {
	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", stackId, userId)

	return result, stack
}
