package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildNetworkResponse(network models.Network) models.NetworkResponse {
	return models.NetworkResponse{
		ID:          network.ID,
		Name:        network.Name,
		IsExternal:  network.IsExternal,
		Description: network.Description,
		PositionX:   network.PositionX,
		PositionY:   network.PositionY,
	}
}

func BuildNetworkResponses(networks []models.Network) []models.NetworkResponse {
	var serializedNetworks []models.NetworkResponse
	for i := 0; i < len(networks); i++ {
		serializedNetworks = append(serializedNetworks, BuildNetworkResponse(networks[i]))
	}
	return serializedNetworks
}

func BuildNetworkFromNetworkCreationInput(network models.NetworkCreateInput, stackId string) models.Network {
	return models.Network{
		Name:        network.Name,
		IsExternal:  network.IsExternal,
		Description: network.Description,
		PositionX:   network.PositionX,
		PositionY:   network.PositionY,
		StackID:     stackId,
	}
}

func BuildNetworkFromNetworkUpdateInput(network models.NetworkUpdateInput) models.Network {
	return models.Network{
		Name:        network.Name,
		IsExternal:  network.IsExternal,
		Description: network.Description,
		PositionX:   network.PositionX,
		PositionY:   network.PositionY,
	}
}
