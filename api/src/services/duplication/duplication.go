package duplication

import (
	"fmt"
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

	for _, service := range stack.Services {
		newService := duplicateService(service, newStack.ID.String())
		repositories.Create[models.Service](&newService)
		newServiceId := newService.ID.String()

		fmt.Println(newServiceId)

		for _, environmentVariable := range service.ServiceEnvVariables {
			newEnvironmentVariable := duplicateServiceEnvVariable(environmentVariable, newServiceId)

			repositories.Create[models.ServiceEnvVariable](&newEnvironmentVariable)
		}

		for _, port := range service.ServicePorts {
			newPort := duplicateServicePort(port, newServiceId)

			repositories.Create[models.ServicePort](&newPort)
		}

		for _, volume := range service.ServiceVolumes {
			newVolume := duplicateServiceVolume(volume, newServiceId)

			repositories.Create[models.ServiceVolume](&newVolume)
		}
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
	}

	return newStack
}

func duplicateService(service models.Service, stackId string) models.Service {
	return models.Service{
		StackID:     stackId,
		Name:        service.Name,
		Description: service.Description,
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Context:     service.Context,
		Dockerfile:  service.Dockerfile,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
	}
}

func duplicateServiceEnvVariable(environmentVariable models.ServiceEnvVariable, serviceId string) models.ServiceEnvVariable {
	return models.ServiceEnvVariable{
		ServiceID: serviceId,
		Key:       environmentVariable.Key,
		Value:     environmentVariable.Value,
	}
}

func duplicateServicePort(port models.ServicePort, serviceId string) models.ServicePort {
	return models.ServicePort{
		ServiceID: serviceId,
		Private:   port.Private,
		Public:    port.Public,
	}
}

func duplicateServiceVolume(volume models.ServiceVolume, serviceId string) models.ServiceVolume {
	return models.ServiceVolume{
		ServiceID:     serviceId,
		LocalPath:     volume.LocalPath,
		ContainerPath: volume.ContainerPath,
	}
}
