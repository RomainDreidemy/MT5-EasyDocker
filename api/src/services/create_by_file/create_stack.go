package create_by_file

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"strings"
)

func CreateStackWithModel(stack models.Stack, model models.DockerCompose) error {
	composeServices := model.Services

	services := make([]models.Service, 0)
	index := 0
	for key, composeService := range composeServices {
		image := strings.Split(composeService.Image, ":")

		services = append(services, models.Service{
			StackID:     stack.ID.String(),
			Name:        key,
			DockerImage: image[0],
			DockerTag:   image[1],
			Entrypoint:  composeService.Entrypoint,
			PositionY:   10,
			PositionX:   float32(250*(index) + 10),
		})

		index += 1
	}

	repositories.Create[[]models.Service](&services)

	networks := make([]models.Network, 0)
	index = 0
	for key, composeNetwork := range model.Networks {
		fmt.Println(key, composeNetwork)
		network := models.Network{
			StackID:    stack.ID.String(),
			Name:       key,
			Driver:     composeNetwork.Driver,
			IsExternal: composeNetwork.External,
			PositionY:  200,
			PositionX:  float32(250*(index) + 10),
		}

		networks = append(networks, network)
		index += 1
	}

	repositories.Create[[]models.Network](&networks)

	return nil
}
