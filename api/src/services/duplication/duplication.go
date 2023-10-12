package duplication

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
)

func DuplicateStack(stack models.Stack) models.Stack {
	newStack := models.Stack{
		UserID:      stack.UserID,
		Name:        "Copy of " + stack.Name,
		Description: stack.Description,
	}

	repositories.Create[models.Stack](&newStack)

	serviceMapping := make(map[string]string)
	networkMapping := make(map[string]string)
	volumeMapping := make(map[string]string)

	for _, service := range stack.Services {
		newService := duplicateService(service, newStack.ID.String())
		repositories.Create[models.Service](&newService)
		newServiceId := newService.ID.String()
		serviceMapping[service.ID.String()] = newServiceId

		duplicateServiceEnvVariables(service.ServiceEnvVariables, newServiceId)
		duplicateServicePorts(service.ServicePorts, newServiceId)
		duplicateServiceVolumes(service.ServiceVolumes, newServiceId)
	}

	for _, network := range stack.Networks {
		newNetwork := models.Network{
			StackID:     newStack.ID.String(),
			Name:        network.Name,
			Description: network.Description,
			IsExternal:  network.IsExternal,
			PositionX:   network.PositionX,
			PositionY:   network.PositionY,
			Driver:      network.Driver,
		}

		repositories.Create[models.Network](&newNetwork)
		networkMapping[network.ID.String()] = newNetwork.ID.String()
	}

	for _, volume := range stack.ManagedVolumes {
		newVolume := models.ManagedVolume{
			StackID:     newStack.ID.String(),
			Name:        volume.Name,
			Description: volume.Description,
			PositionX:   volume.PositionX,
			PositionY:   volume.PositionY,
		}

		repositories.Create[models.ManagedVolume](&newVolume)
		volumeMapping[volume.ID.String()] = newVolume.ID.String()
	}

	for _, service := range stack.Services {
		links := make([]models.ServiceNetworkLink, 0)
		for _, link := range service.ServiceNetworkLinks {
			newLink := models.ServiceNetworkLink{
				ServiceID:            serviceMapping[link.ServiceID],
				NetworkID:            networkMapping[link.NetworkID],
				ServiceArrowPosition: link.ServiceArrowPosition,
				NetworkArrowPosition: link.NetworkArrowPosition,
			}

			links = append(links, newLink)
		}

		repositories.Create[[]models.ServiceNetworkLink](&links)

		volumeLinks := make([]models.ServiceManagedVolumeLink, 0)
		for _, link := range service.ServiceManagedVolumeLinks {
			newLink := models.ServiceManagedVolumeLink{
				ServiceID:                  serviceMapping[link.ServiceID],
				ManagedVolumeID:            volumeMapping[link.ManagedVolumeID],
				ServiceArrowPosition:       link.ServiceArrowPosition,
				ManagedVolumeArrowPosition: link.ManagedVolumeArrowPosition,
				ContainerPath:              link.ContainerPath,
			}

			volumeLinks = append(volumeLinks, newLink)
		}

		repositories.Create[[]models.ServiceManagedVolumeLink](&volumeLinks)
	}

	return newStack
}

func duplicateService(service models.Service, stackId string) models.Service {
	return models.Service{
		StackID:            stackId,
		Name:               service.Name,
		ContainerName:      service.ContainerName,
		ImageSelectionType: service.ImageSelectionType,
		Description:        service.Description,
		DockerImage:        service.DockerImage,
		DockerTag:          service.DockerTag,
		EnvFile:            service.EnvFile,
		Entrypoint:         service.Entrypoint,
		Context:            service.Context,
		Dockerfile:         service.Dockerfile,
		PositionX:          service.PositionX,
		PositionY:          service.PositionY,
	}
}

func duplicateServiceEnvVariables(environmentVariables []models.ServiceEnvVariable, serviceId string) {
	envVariables := make([]models.ServiceEnvVariable, 0)
	for _, environmentVariable := range environmentVariables {
		envVariables = append(envVariables, models.ServiceEnvVariable{
			ServiceID: serviceId,
			Key:       environmentVariable.Key,
			Value:     environmentVariable.Value,
		})
	}

	repositories.Create[[]models.ServiceEnvVariable](&envVariables)
}

func duplicateServicePorts(ports []models.ServicePort, serviceId string) {
	newPorts := make([]models.ServicePort, 0)

	for _, port := range ports {
		newPorts = append(newPorts, models.ServicePort{
			ServiceID: serviceId,
			Private:   port.Private,
			Public:    port.Public,
		})
	}

	repositories.Create[[]models.ServicePort](&newPorts)
}

func duplicateServiceVolumes(volumes []models.ServiceVolume, serviceId string) {
	newVolumes := make([]models.ServiceVolume, 0)

	for _, volume := range volumes {
		newVolumes = append(newVolumes, models.ServiceVolume{
			ServiceID:     serviceId,
			LocalPath:     volume.LocalPath,
			ContainerPath: volume.ContainerPath,
		})
	}

	repositories.Create[[]models.ServiceVolume](&newVolumes)
}
