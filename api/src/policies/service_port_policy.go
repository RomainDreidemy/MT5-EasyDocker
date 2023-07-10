package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func CanAccessServicePort(user models.UserResponse, servicePortId string) bool {
	servicePort, result := repositories.FindServicePort(servicePortId)

	if result.RowsAffected == 0 {
		return false
	}

	return CanAccessService(user, servicePort.ServiceID)
}
