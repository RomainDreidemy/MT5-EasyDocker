package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func BuildServiceEnvVariableResponse(serviceEnvVariable models.ServiceEnvVariable) models.ServiceEnvVariableResponse {
	return models.ServiceEnvVariableResponse{
		ID:    serviceEnvVariable.ID,
		Key:   serviceEnvVariable.Key,
		Value: serviceEnvVariable.Value,
	}
}

func BuildServiceEnvVariableResponses(serviceEnvVariable []models.ServiceEnvVariable) []models.ServiceEnvVariableResponse {
	serializedServiceEnvVariable := make([]models.ServiceEnvVariableResponse, 0)
	for i := 0; i < len(serviceEnvVariable); i++ {
		serializedServiceEnvVariable = append(serializedServiceEnvVariable, BuildServiceEnvVariableResponse(serviceEnvVariable[i]))
	}
	return serializedServiceEnvVariable
}

func BuildServiceEnvVariableFromServiceEnvVariableCreateInput(serviceEnvVariable models.ServiceEnvVariableCreateInput, serviceId string) models.ServiceEnvVariable {
	return models.ServiceEnvVariable{
		Key:       serviceEnvVariable.Key,
		Value:     serviceEnvVariable.Value,
		ServiceID: serviceId,
	}
}

func BuildServiceEnvVariableFromServiceEnvVariableUpdateInput(serviceEnvVariable models.ServiceEnvVariableUpdateInput) models.ServiceEnvVariable {
	return models.ServiceEnvVariable{
		Key:   serviceEnvVariable.Key,
		Value: serviceEnvVariable.Value,
	}
}
