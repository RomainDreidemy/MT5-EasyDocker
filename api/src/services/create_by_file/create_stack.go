package create_by_file

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"strings"
)

func CreateStackWithModel(stack models.Stack, model models.DockerCompose) error {
	composeServices := model.Services

	services := createServices(composeServices, stack.ID.String())
	repositories.Create[[]models.Service](&services)

	networks := createNetworks(model.Networks, stack.ID.String())
	repositories.Create[[]models.Network](&networks)

	volumes := createVolumes(model.Volumes, stack.ID.String())
	repositories.Create[[]models.ManagedVolume](&volumes)

	serviceNetworkLinks := createServiceNetworkLinks(networks, services, model)
	repositories.Create[[]models.ServiceNetworkLink](&serviceNetworkLinks)

	serviceVolumeLinks := createServiceVolumeLinks(volumes, services, model)
	repositories.Create[[]models.ServiceManagedVolumeLink](&serviceVolumeLinks)

	return nil
}

func createServices(composeServices map[string]models.DockerComposeService, stackId string) []models.Service {
	services := make([]models.Service, 0)

	index := 0
	for key, composeService := range composeServices {
		image := strings.Split(composeService.Image, ":")

		services = append(services, models.Service{
			StackID:     stackId,
			Name:        key,
			DockerImage: image[0],
			DockerTag:   image[1],
			Entrypoint:  composeService.Entrypoint,
			PositionY:   10,
			PositionX:   float32(250*(index) + 10),
		})

		index += 1
	}

	return services
}

func createNetworks(composeNetworks map[string]models.DockerComposeNetwork, stackId string) []models.Network {
	networks := make([]models.Network, 0)

	index := 0
	for key, composeNetwork := range composeNetworks {
		network := models.Network{
			StackID:    stackId,
			Name:       key,
			Driver:     composeNetwork.Driver,
			IsExternal: composeNetwork.External,
			PositionY:  200,
			PositionX:  float32(250*(index) + 10),
		}

		networks = append(networks, network)
		index += 1
	}

	return networks
}

func createVolumes(composeVolumes map[string]struct{}, stackId string) []models.ManagedVolume {
	volumes := make([]models.ManagedVolume, 0)

	index := 0
	for key := range composeVolumes {
		volume := models.ManagedVolume{
			StackID:   stackId,
			Name:      key,
			PositionY: 400,
			PositionX: float32(250*(index) + 10),
		}

		volumes = append(volumes, volume)
		index += 1
	}

	return volumes
}

func createServiceNetworkLinks(networks []models.Network, services []models.Service, model models.DockerCompose) []models.ServiceNetworkLink {
	links := make([]models.ServiceNetworkLink, 0)

	for _, network := range networks {
		for _, service := range services {
			for _, networkName := range model.Services[service.Name].Networks {
				if networkName == network.Name {
					links = append(links, models.ServiceNetworkLink{
						NetworkID:            network.ID.String(),
						ServiceID:            service.ID.String(),
						ServiceArrowPosition: "bottom",
						NetworkArrowPosition: "top",
					})
				}
			}
		}
	}

	return links
}

func createServiceVolumeLinks(volumes []models.ManagedVolume, services []models.Service, model models.DockerCompose) []models.ServiceManagedVolumeLink {
	links := make([]models.ServiceManagedVolumeLink, 0)

	for _, volume := range volumes {
		for _, service := range services {
			for _, volumeName := range model.Services[service.Name].Volumes {
				fmt.Println(volumeName)
				fmt.Println(strings.Split(volumeName, ":")[0])
				fmt.Println(volume.Name)
				if volume.Name == strings.Split(volumeName, ":")[0] {
					links = append(links, models.ServiceManagedVolumeLink{
						ManagedVolumeID:            volume.ID.String(),
						ServiceID:                  service.ID.String(),
						ServiceArrowPosition:       "bottom",
						ManagedVolumeArrowPosition: "top",
					})
				}
			}
		}
	}

	return links
}
