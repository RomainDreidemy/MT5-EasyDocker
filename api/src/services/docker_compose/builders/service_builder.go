package builders

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func DockerComposeServicesBuilder(services []models.Service) map[string]models.DockerComposeService {
	dockerComposeServices := make(map[string]models.DockerComposeService)

	for _, service := range services {
		dockerComposeServices[service.Name] = DockerComposeServiceBuilder(service)
	}

	return dockerComposeServices
}

func DockerComposeServiceBuilder(service models.Service) models.DockerComposeService {
	dockerComposeService := models.DockerComposeService{
		ContainerName: service.Name,
		Entrypoint:    service.Entrypoint,
	}

	if service.Context != "" && service.Dockerfile != "" {
		dockerComposeService.Build = BuildDockerComposeServiceBuild(service)
	}

	if service.DockerImage != "" {
		dockerComposeService.Image = BuildDockerComposeServiceImage(service)
	}

	return dockerComposeService
}

func BuildDockerComposeServiceBuild(service models.Service) models.DockerComposeServiceBuild {
	return models.DockerComposeServiceBuild{
		Context:    service.Context,
		Dockerfile: service.Dockerfile,
	}
}

func BuildDockerComposeServiceImage(service models.Service) string {
	tag := service.DockerTag
	if tag == "" {
		tag = "latest"
	}

	return service.DockerImage + ":" + tag
}
