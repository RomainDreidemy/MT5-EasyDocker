package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServiceResponse(service models.Service) models.ServiceResponseItem {
	return models.ServiceResponseItem{
		ID:          service.ID,
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
		Volumes:     BuildServiceVolumeResponses(service.ServiceVolumes),
	}
}

func BuildServiceResponses(services []models.Service) []models.ServiceResponse {
	var serializedServices []models.ServiceResponse
	for i := 0; i < len(services); i++ {
		serializedServices = append(serializedServices, models.ServiceResponse{
			ID:          serializedServices[i].ID,
			DockerImage: serializedServices[i].DockerImage,
			DockerTag:   serializedServices[i].DockerTag,
			Entrypoint:  serializedServices[i].Entrypoint,
			Description: serializedServices[i].Description,
			PositionX:   serializedServices[i].PositionX,
			PositionY:   serializedServices[i].PositionY,
		})
	}
	return serializedServices
}

func BuildServiceFromServiceCreationInput(service models.ServiceCreateInput, stackId string) models.Service {
	return models.Service{
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
		StackID:     stackId,
	}
}

func BuildServiceFromServiceUpdateInput(service models.ServiceUpdateInput) models.Service {
	return models.Service{
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
	}
}
