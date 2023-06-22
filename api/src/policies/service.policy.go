package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

// CanAccessService checks if a user can access a service by
// searching if the service exists and if the user has access to the stack the service belongs to
func CanAccessService(user models.UserResponse, serviceId string) bool {
	service, result := repositories.FindService(serviceId)

	if result.RowsAffected == 0 {
		return false
	}

	result, _ = repositories.GetStackByIdForAUser(service.StackID, user.ID)

	return result.RowsAffected > 0
}
