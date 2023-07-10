package policies

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func CanAccessServiceVolume(user models.UserResponse, serviceVolumeId string) bool {
	serviceVolume, result := repositories.FindServiceRelation[models.ServiceVolume](serviceVolumeId)

	if result.RowsAffected == 0 {
		return false
	}

	return CanAccessService(user, serviceVolume.ServiceID)
}
