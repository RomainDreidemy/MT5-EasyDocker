package factories

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/google/uuid"
)

func BuildStackResponse(stack models.Stack) models.StackResponse {
	return models.StackResponse{
		ID:          stack.ID,
		Name:        stack.Name,
		Description: stack.Description,
	}
}

func BuildStackResponses(stacks []models.Stack) []models.StackResponse {
	serializedStacks := make([]models.StackResponse, 0)
	for i := 0; i < len(stacks); i++ {
		serializedStacks = append(serializedStacks, BuildStackResponse(stacks[i]))
	}
	return serializedStacks
}

func BuildStackFromStackCreateInput(stackCreateInput models.StackCreateInput, userId uuid.UUID) models.Stack {
	return models.Stack{
		Name:        stackCreateInput.Name,
		Description: stackCreateInput.Description,
		UserID:      &userId,
	}
}

func BuildStackFromStackUpdateInput(stackCreateInput models.StackUpdateInput, userId uuid.UUID) models.Stack {
	return models.Stack{
		Name:        stackCreateInput.Name,
		Description: stackCreateInput.Description,
		UserID:      &userId,
	}
}
