package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildManagedVolumeResponse(managedVolume models.ManagedVolume) models.ManagedVolumeResponse {
	return models.ManagedVolumeResponse{
		ID:          managedVolume.ID,
		Name:        managedVolume.Name,
		Description: managedVolume.Description,
		PositionX:   managedVolume.PositionX,
		PositionY:   managedVolume.PositionY,
	}
}
