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

func BuildManagedVolumeBoardResponses(managedVolumes []models.ManagedVolume) []models.BoardItem {
	serializedManagedVolumes := make([]models.BoardItem, 0)
	for i := 0; i < len(managedVolumes); i++ {
		serializedManagedVolumes = append(serializedManagedVolumes, models.BoardItem{
			ID:        managedVolumes[i].ID,
			Name:      managedVolumes[i].Name,
			PositionX: managedVolumes[i].PositionX,
			PositionY: managedVolumes[i].PositionY,
		})
	}
	return serializedManagedVolumes
}

func BuildManagedVolumeFromCreationInput(body models.ManagedVolumeCreateInput, stackId string) models.ManagedVolume {
	return models.ManagedVolume{
		Name:        body.Name,
		Description: body.Description,
		PositionX:   body.PositionX,
		PositionY:   body.PositionY,
		StackID:     stackId,
	}
}
