package docker_compose

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func DockerComposeServicesBuilder(services []models.Service) map[string]models.DockerComposeService {
	dockerComposeServices := make(map[string]models.DockerComposeService)

	for _, service := range services {
		dockerComposeService := models.DockerComposeService{
			ContainerName: service.Name,
		}

		if service.Context != "" && service.Dockerfile != "" {
			dockerComposeService.Build = models.DockerComposeServiceBuild{
				Context:    service.Context,
				Dockerfile: service.Dockerfile,
			}
		}

		if service.DockerImage != "" {
			tag := service.DockerTag
			if tag == "" {
				tag = "latest"
			}

			dockerComposeService.Image = service.DockerImage + ":" + tag
		}

		dockerComposeServices[service.Name] = dockerComposeService
	}

	return dockerComposeServices
}
