package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildServiceResponse(service models.Service) models.ServiceResponse {
	return models.ServiceResponse{
		ID:          service.ID,
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
	}
}

func BuildServiceResponses(services []models.Service) []models.ServiceResponse {
	var serializedServices []models.ServiceResponse
	for i := 0; i < len(services); i++ {
		serializedServices = append(serializedServices, BuildServiceResponse(services[i]))
	}
	return serializedServices
}

func BuildServiceFromServiceCreationInput(service models.ServiceCreateInput) models.Service {
	return models.Service{
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
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
