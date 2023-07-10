package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServiceVolumeResponse(serviceVolume models.ServiceVolume) models.ServiceVolumeResponse {
	return models.ServiceVolumeResponse{
		ID:            serviceVolume.ID,
		LocalPath:     serviceVolume.LocalPath,
		ContainerPath: serviceVolume.ContainerPath,
	}
}

func BuildServiceVolumeResponses(serviceVolume []models.ServiceVolume) []models.ServiceVolumeResponse {
	var serializedServiceVolumes []models.ServiceVolumeResponse
	for i := 0; i < len(serviceVolume); i++ {
		serializedServiceVolumes = append(serializedServiceVolumes, BuildServiceVolumeResponse(serviceVolume[i]))
	}
	return serializedServiceVolumes
}

func BuildServiceVolumeFromServiceVolumeCreationInput(serviceVolume models.ServiceVolumeCreateInput, serviceId string) models.ServiceVolume {
	return models.ServiceVolume{
		LocalPath:     serviceVolume.LocalPath,
		ContainerPath: serviceVolume.ContainerPath,
		ServiceID:     serviceId,
	}
}

func BuildServiceVolumeFromServiceVolumeUpdateInput(serviceVolume models.ServiceVolumeUpdateInput) models.ServiceVolume {
	return models.ServiceVolume{
		LocalPath:     serviceVolume.LocalPath,
		ContainerPath: serviceVolume.ContainerPath,
	}
}
