package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildServiceNetworkLinkResponses(links []models.ServiceNetworkLink) []models.ServiceNetworkLinkResponse {
	var linkResponses []models.ServiceNetworkLinkResponse

	for _, link := range links {
		linkResponses = append(linkResponses, models.ServiceNetworkLinkResponse{
			ID:                   link.ID,
			ServiceID:            link.ServiceID,
			NetworkID:            link.NetworkID,
			ServiceArrowPosition: link.ServiceArrowPosition,
			NetworkArrowPosition: link.NetworkArrowPosition,
		})
	}

	return linkResponses
}
