package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/gofiber/fiber/v2"
)

// CreateService godoc
// @Summary      Create a new service
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param stackId path string true "Stack ID"
// @Param request body models.ServiceCreateInput true "query params"
// @Success      201  {object}  models.ServiceResponse
// @Router       /stacks/{stackId}/services [post]
func CreateService(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	stackId := c.Params("stackId")

	stack := models.Stack{}
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", stackId, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	var body models.ServiceCreateInput
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Cannot parse JSON"})
	}

	service := models.Service{
		DockerImage: body.DockerImage,
		DockerTag:   body.DockerTag,
		Entrypoint:  body.Entrypoint,
		Description: body.Description,
		PositionX:   body.PositionX,
		PositionY:   body.PositionY,
		StackID:     stack.ID,
	}

	result = initializers.DB.Create(&service)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Cannot create service"})
	}

	return c.Status(fiber.StatusCreated).JSON(models.ServiceResponse{
		ID:          service.ID,
		DockerImage: service.DockerImage,
		DockerTag:   service.DockerTag,
		Entrypoint:  service.Entrypoint,
		Description: service.Description,
		PositionX:   service.PositionX,
		PositionY:   service.PositionY,
	})
}
