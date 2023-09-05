package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServicePortResponse(servicePort models.ServicePort) models.ServicePortResponse {
	return models.ServicePortResponse{
		ID:      servicePort.ID,
		Private: servicePort.Private,
		Public:  servicePort.Public,
	}
}

func BuildServicePortResponses(servicePort []models.ServicePort) []models.ServicePortResponse {
	serializedServicePorts := make([]models.ServicePortResponse, 0)
	for i := 0; i < len(servicePort); i++ {
		serializedServicePorts = append(serializedServicePorts, BuildServicePortResponse(servicePort[i]))
	}
	return serializedServicePorts
}

func BuildServicePortFromServicePortCreationInput(servicePort models.ServicePortCreateInput, serviceId string) models.ServicePort {
	return models.ServicePort{
		Private:   servicePort.Private,
		Public:    servicePort.Public,
		ServiceID: serviceId,
	}
}

func BuildServicePortFromServicePortUpdateInput(servicePort models.ServicePortUpdateInput) models.ServicePort {
	return models.ServicePort{
		Private: servicePort.Private,
		Public:  servicePort.Public,
	}
}
