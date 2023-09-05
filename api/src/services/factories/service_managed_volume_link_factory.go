package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildServiceManagedVolumeLinkResponse(link models.ServiceManagedVolumeLink) models.ServiceManagedVolumeLinkResponse {
	return models.ServiceManagedVolumeLinkResponse{
		ID:                         link.ID,
		ServiceID:                  link.ServiceID,
		ManagedVolumeID:            link.ManagedVolumeID,
		ServiceArrowPosition:       link.ServiceArrowPosition,
		ManagedVolumeArrowPosition: link.ManagedVolumeArrowPosition,
		ContainerPath:              link.ContainerPath,
	}
}

func BuildServiceManagedVolumeLinkResponses(links []models.ServiceManagedVolumeLink) []models.ServiceManagedVolumeLinkResponse {
	var linkResponses []models.ServiceManagedVolumeLinkResponse

	for _, link := range links {
		linkResponses = append(linkResponses, BuildServiceManagedVolumeLinkResponse(link))
	}

	return linkResponses
}

func BuildServiceManagedVolumeLinkFromCreateInput(body models.ServiceManagedVolumeLinkCreateInput) models.ServiceManagedVolumeLink {
	return models.ServiceManagedVolumeLink{
		ServiceID:                  body.ServiceID,
		ManagedVolumeID:            body.ManagedVolumeID,
		ServiceArrowPosition:       body.ServiceArrowPosition,
		ManagedVolumeArrowPosition: body.ManagedVolumeArrowPosition,
	}
}

func BuildServiceManagedVolumeLinkFromUpdateInput(body models.ServiceManagedVolumeLinkUpdateInput) models.ServiceManagedVolumeLink {
	return models.ServiceManagedVolumeLink{
		ContainerPath: body.ContainerPath,
	}
}
