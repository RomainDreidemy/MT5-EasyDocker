package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildServiceNetworkLinkResponse(link models.ServiceNetworkLink) models.ServiceNetworkLinkResponse {
	return models.ServiceNetworkLinkResponse{
		ID:                   link.ID,
		ServiceID:            link.ServiceID,
		NetworkID:            link.NetworkID,
		ServiceArrowPosition: link.ServiceArrowPosition,
		NetworkArrowPosition: link.NetworkArrowPosition,
	}
}

func BuildServiceNetworkLinkResponses(links []models.ServiceNetworkLink) []models.ServiceNetworkLinkResponse {
	linkResponses := make([]models.ServiceNetworkLinkResponse, 0)

	for _, link := range links {
		linkResponses = append(linkResponses, BuildServiceNetworkLinkResponse(link))
	}

	return linkResponses
}

func BuildServiceNetworkLinkFromCreateInput(body models.ServiceNetworkLinkCreateInput) models.ServiceNetworkLink {
	return models.ServiceNetworkLink{
		ServiceID:            body.ServiceID,
		NetworkID:            body.NetworkID,
		ServiceArrowPosition: body.ServiceArrowPosition,
		NetworkArrowPosition: body.NetworkArrowPosition,
	}
}
