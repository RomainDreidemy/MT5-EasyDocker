package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func CanAccessServiceEnvVariable(user models.UserResponse, serviceEnvVariableId string) bool {
	serviceEnvVariable, result := repositories.FindServiceRelation[models.ServiceEnvVariable](serviceEnvVariableId)

	if result.RowsAffected == 0 {
		return false
	}

	return CanAccessService(user, serviceEnvVariable.ServiceID)
}
