package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

// CanAccessVolume checks if a user can access a network by
// searching if the network exists and if the user has access to the stack the network belongs to
func CanAccessVolume(user models.UserResponse, volumeId string) bool {
	volume, result := repositories.Find[models.ManagedVolume](volumeId)

	if result.RowsAffected == 0 {
		return false
	}

	return CanAccessStack(user, volume.StackID)
}
