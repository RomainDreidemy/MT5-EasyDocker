package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

// CanAccessNetwork checks if a user can access a network by
// searching if the network exists and if the user has access to the stack the network belongs to
func CanAccessNetwork(user models.UserResponse, networkId string) bool {
	network, result := repositories.FindNetwork(networkId)

	if result.RowsAffected == 0 {
		return false
	}

	return CanAccessStack(user, network.StackID)
}
