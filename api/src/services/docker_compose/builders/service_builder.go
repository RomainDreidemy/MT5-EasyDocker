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
	if service.ContainerName == "" {
		service.ContainerName = service.Name
	}

	dockerComposeService := models.DockerComposeService{
		ContainerName: service.ContainerName,
		Entrypoint:    service.Entrypoint,
	}

	if service.Context != "" && service.Dockerfile != "" {
		dockerComposeService.Build = BuildDockerComposeServiceBuild(service)
	}

	if service.DockerImage != "" {
		dockerComposeService.Image = BuildDockerComposeServiceImage(service)
	}

	if service.EnvFile != "" {
		dockerComposeService.EnvFile = service.EnvFile
	}

	if len(service.ServicePorts) > 0 {
		dockerComposeService.Ports = BuildDockerComposeServicePorts(service.ServicePorts)
	}

	if len(service.ServiceVolumes) > 0 || len(service.ServiceManagedVolumeLinks) > 0 {
		dockerComposeService.Volumes = BuildDockerComposeServiceVolumes(service)
	}

	if len(service.ServiceEnvVariables) > 0 {
		dockerComposeService.Environment = BuildDockerComposeServiceEnvironments(service.ServiceEnvVariables)
	}

	if len(service.ServiceNetworkLinks) > 0 {
		dockerComposeService.Networks = BuildDockerComposeServiceNetworks(service.ServiceNetworkLinks)
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

func BuildDockerComposeServiceVolumes(service models.Service) []string {
	var volumes []string

	for _, serviceVolume := range service.ServiceVolumes {
		volumes = append(volumes, serviceVolume.LocalPath+":"+serviceVolume.ContainerPath)
	}

	for _, link := range service.ServiceManagedVolumeLinks {
		volumes = append(volumes, link.ManagedVolume.Name+":"+link.ContainerPath)
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

func BuildDockerComposeServiceNetworks(networkLinks []models.ServiceNetworkLink) []string {
	var dockerComposeNetworks []string

	for _, networkLink := range networkLinks {
		dockerComposeNetworks = append(dockerComposeNetworks, networkLink.Network.Name)
	}

	return dockerComposeNetworks
}
