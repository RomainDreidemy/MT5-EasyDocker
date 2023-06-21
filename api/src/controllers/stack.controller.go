package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/gofiber/fiber/v2"
)

// CreateStack godoc
// @Summary      Create a new stack
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Param request body models.StackCreateInput true "query params"
// @Success      200  {object}  models.StackResponse
// @Router       /stacks [post]
func CreateStack(c *fiber.Ctx) error {
	var payload *models.StackCreateInput
	currentUser := c.Locals("user").(models.UserResponse)

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	errors := models.ValidateStruct(payload)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	newStack := models.Stack{
		Name:        payload.Name,
		Description: payload.Description,
		UserID:      &currentUser.ID,
	}

	result := initializers.DB.Create(&newStack)

	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "error", "message": "Something bad happened"})
	}

	return c.Status(fiber.StatusCreated).JSON(models.StackResponse{
		ID:   newStack.ID,
		Name: newStack.Name,
	})
}
