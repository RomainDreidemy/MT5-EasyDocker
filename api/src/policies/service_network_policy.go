package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func CanAccessServiceNetworkLink(currentUser models.UserResponse, id string) bool {
	link, db := repositories.FindServiceNetworkLink(id)
	var linkCount int64
	db.Count(&linkCount)

	if linkCount != 1 {
		return false
	}

	return CanAccessService(currentUser, link.ServiceID) &&
		CanAccessNetwork(currentUser, link.NetworkID)
}
