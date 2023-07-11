package docker_compose

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/docker_compose/builders"
	"gopkg.in/yaml.v3"
)

func BuildDockerComposeFile(services []models.Service) string {
	dockerCompose := models.DockerCompose{
		Version:  "3",
		Services: builders.DockerComposeServicesBuilder(services),
	}

	result, _ := yaml.Marshal(dockerCompose)

	fmt.Println(string(result))

	return string(result)
}
