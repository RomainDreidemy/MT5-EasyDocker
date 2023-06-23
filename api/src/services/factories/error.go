package factories

import "github.com/RomainDreidemy/MT5-docker-extension/src/models"

func BuildErrorResponse(status string, message string) models.ErrorResponse {
	return models.ErrorResponse{
		Status:  status,
		Message: message,
	}
}
