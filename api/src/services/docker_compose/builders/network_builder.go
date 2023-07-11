package builders

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildDockerComposeNetworks(networks []models.Network) map[string]models.DockerComposeNetwork {
	dockerComposeNetworks := make(map[string]models.DockerComposeNetwork)

	for _, network := range networks {
		dockerComposeNetworks[network.Name] = BuildDockerComposeNetwork(network)
	}

	return dockerComposeNetworks
}

func BuildDockerComposeNetwork(network models.Network) models.DockerComposeNetwork {
	return models.DockerComposeNetwork{}
}
