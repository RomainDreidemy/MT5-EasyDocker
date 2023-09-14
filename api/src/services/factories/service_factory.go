package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServiceResponse(service models.Service) models.ServiceResponseItem {
	return models.ServiceResponseItem{
		ID:            service.ID,
		Name:          service.Name,
		ContainerName: service.ContainerName,
		DockerImage:   service.DockerImage,
		DockerTag:     service.DockerTag,
		EnvFile:       service.EnvFile,
		Entrypoint:    service.Entrypoint,
		Description:   service.Description,
		PositionX:     service.PositionX,
		PositionY:     service.PositionY,
		Volumes:       BuildServiceVolumeResponses(service.ServiceVolumes),
		EnvVariables:  BuildServiceEnvVariableResponses(service.ServiceEnvVariables),
		Ports:         BuildServicePortResponses(service.ServicePorts),
	}
}

func BuildServiceResponses(services []models.Service) []models.ServiceResponseItem {
	serializedServices := make([]models.ServiceResponseItem, 0)
	for i := 0; i < len(services); i++ {
		serializedServices = append(serializedServices, BuildServiceResponse(services[i]))
	}
	return serializedServices
}

func BuildServiceFromServiceCreationInput(service models.ServiceCreateInput, stackId string) models.Service {
	return models.Service{
		Name:          service.Name,
		ContainerName: service.ContainerName,
		DockerImage:   service.DockerImage,
		DockerTag:     service.DockerTag,
		EnvFile:       service.EnvFile,
		Entrypoint:    service.Entrypoint,
		Description:   service.Description,
		PositionX:     service.PositionX,
		PositionY:     service.PositionY,
		StackID:       stackId,
	}
}

func BuildServiceFromServiceUpdateInput(service models.ServiceUpdateInput) models.Service {
	return models.Service{
		Name:          service.Name,
		ContainerName: service.ContainerName,
		DockerImage:   service.DockerImage,
		DockerTag:     service.DockerTag,
		EnvFile:       service.EnvFile,
		Entrypoint:    service.Entrypoint,
		Description:   service.Description,
		PositionX:     service.PositionX,
		PositionY:     service.PositionY,
	}
}
