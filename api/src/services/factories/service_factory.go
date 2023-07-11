package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServiceResponse(service models.Service) models.ServiceResponseItem {
	return models.ServiceResponseItem{
		ID:           service.ID,
		DockerImage:  service.DockerImage,
		DockerTag:    service.DockerTag,
		Entrypoint:   service.Entrypoint,
		Description:  service.Description,
		PositionX:    service.PositionX,
		PositionY:    service.PositionY,
		Volumes:      BuildServiceVolumeResponses(service.ServiceVolumes),
		EnvVariables: BuildServiceEnvVariableResponses(service.ServiceEnvVariables),
		Ports:        BuildServicePortResponses(service.ServicePorts),
	}
}

func BuildServiceResponses(services []models.Service) []models.ServiceResponse {
	var serializedServices []models.ServiceResponse
	for i := 0; i < len(services); i++ {
		serializedServices = append(serializedServices, models.ServiceResponse{
			ID:          services[i].ID,
			DockerImage: services[i].DockerImage,
			DockerTag:   services[i].DockerTag,
			Entrypoint:  services[i].Entrypoint,
			Description: services[i].Description,
			PositionX:   services[i].PositionX,
			PositionY:   services[i].PositionY,
		})
	}
	return serializedServices
}

func BuildServiceBoardResponses(services []models.Service) []models.ServiceBoardResponse {
	var serializedServices []models.ServiceBoardResponse
	for i := 0; i < len(services); i++ {
		serializedServices = append(serializedServices, models.ServiceBoardResponse{
			ID:        services[i].ID,
			Name:      services[i].DockerImage, //todo: change this with a name field
			PositionX: services[i].PositionX,
			PositionY: services[i].PositionY,
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
