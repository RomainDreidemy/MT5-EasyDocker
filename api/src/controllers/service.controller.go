package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetServices godoc
// @Summary      Get services for a stack
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param stackId path string true "Stack ID"
// @Success      200  {array}  models.ServiceResponse
// @Router       /stacks/{stackId}/services [get]
func GetServices(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	stackId := c.Params("stackId")

	stack := models.Stack{}
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", stackId, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	services := []models.Service{}
	initializers.DB.Find(&services, "stack_id = ?", stackId)

	return c.Status(fiber.StatusOK).JSON(factories.BuildServiceResponses(services))
}

// GetService godoc
// @Summary      Get services for a stack
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param id path string true "Service ID"
// @Success      200  {object}  models.ServiceResponse
// @Router       /services/{id} [get]
func GetService(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	service := models.Service{}
	result := initializers.DB.First(&service, "id = ?", id)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
	}

	// we check if the user want to access to a service that belongs to him
	stack := models.Stack{}
	result = initializers.DB.First(&stack, "id = ? and user_id = ?", service.StackID, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
	}

	return c.Status(fiber.StatusOK).JSON(factories.BuildServiceResponse(service))
}

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

	service := factories.BuildServiceFromServiceCreationInput(body)

	result = initializers.DB.Create(&service)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Cannot create service"})
	}

	return c.Status(fiber.StatusCreated).JSON(factories.BuildServiceResponse(service))
}

// DeleteService godoc
// @Summary      Delete a service
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param id path string true "Service ID"
// @Success      204
// @Router       /services/{id} [delete]
func DeleteService(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	service := models.Service{}
	result := initializers.DB.First(&service, "id = ?", id)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
	}

	// we check if the user want to access to a service that belongs to him
	result, _ = repositories.GetStackByIdForAUser(service.StackID, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
	}

	initializers.DB.Delete(&service)

	return c.Status(fiber.StatusNoContent).Send(nil)
}
