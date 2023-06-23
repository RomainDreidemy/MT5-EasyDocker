package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func CanAccessStack(user models.UserResponse, stackId string) bool {
	result, _ := repositories.GetStackByIdForAUser(stackId, user.ID)

	return result.RowsAffected > 0
}
