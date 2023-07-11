package builders

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildDockerCompose(services []models.Service, networks []models.Network) models.DockerCompose {
	return models.DockerCompose{
		Version:  "3",
		Services: DockerComposeServicesBuilder(services),
		Networks: BuildDockerComposeNetworks(networks),
	}
}
