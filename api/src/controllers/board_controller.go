package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetBoard godoc
// @Summary      Get board
// @Tags         Board
// @Accept       json
// @Produce      json
// @Param stackId path string true "Stack ID"
// @Success      200  {array}  models.ServiceResponse
// @Router       /stacks/{stackId}/board [get]
func GetBoard(c *fiber.Ctx) error {
	stackId := c.Params("stackId")
	currentUser := c.Locals("user").(models.UserResponse)

	if policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Board not found"))
	}

	services, _ := repositories.FindServicesByStackId(stackId)

	board := models.Board{
		Services: factories.BuildServiceBoardResponses(services),
	}

	return c.Status(fiber.StatusOK).JSON(board)
}
