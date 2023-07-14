package builders

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"strconv"
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

	if len(service.ServicePorts) > 0 {
		dockerComposeService.Ports = BuildDockerComposeServicePorts(service.ServicePorts)
	}

	if len(service.ServiceVolumes) > 0 {
		dockerComposeService.Volumes = BuildDockerComposeServiceVolumes(service.ServiceVolumes)
	}

	if len(service.ServiceEnvVariables) > 0 {
		dockerComposeService.Environment = BuildDockerComposeServiceEnvironments(service.ServiceEnvVariables)
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

func BuildDockerComposeServicePorts(servicePorts []models.ServicePort) []string {
	var ports []string

	for _, servicePort := range servicePorts {
		var port string

		if servicePort.Public == 0 {
			port = strconv.Itoa(servicePort.Private)
		} else {
			port = strconv.Itoa(servicePort.Public) + ":" + strconv.Itoa(servicePort.Private)
		}

		ports = append(ports, port)
	}

	return ports
}

func BuildDockerComposeServiceVolumes(serviceVolumes []models.ServiceVolume) []string {
	var volumes []string

	for _, serviceVolume := range serviceVolumes {
		volumes = append(volumes, serviceVolume.LocalPath+":"+serviceVolume.ContainerPath)
	}

	return volumes
}

func BuildDockerComposeServiceEnvironments(serviceEnvironments []models.ServiceEnvVariable) map[string]string {
	environments := make(map[string]string)

	for _, serviceEnvironment := range serviceEnvironments {
		environments[serviceEnvironment.Key] = serviceEnvironment.Value
	}

	return environments
}
