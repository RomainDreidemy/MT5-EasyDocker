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
		Driver:      network.Driver,
	}
}

func BuildNetworkResponses(networks []models.Network) []models.NetworkResponse {
	var serializedNetworks []models.NetworkResponse
	for i := 0; i < len(networks); i++ {
		serializedNetworks = append(serializedNetworks, BuildNetworkResponse(networks[i]))
	}
	return serializedNetworks
}

func BuildNetworkBoardResponses(networks []models.Network) []models.BoardItem {
	serializedNetworks := make([]models.BoardItem, 0)
	for i := 0; i < len(networks); i++ {
		serializedNetworks = append(serializedNetworks, models.BoardItem{
			ID:        networks[i].ID,
			Name:      networks[i].Name,
			PositionX: networks[i].PositionX,
			PositionY: networks[i].PositionY,
		})
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
		Driver:      network.Driver,
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
		Driver:      network.Driver,
	}
}
