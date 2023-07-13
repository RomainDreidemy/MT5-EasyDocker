package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
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

	if !policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	services, _ := repositories.FindServicesByStackId(stackId)

	return c.Status(fiber.StatusOK).JSON(factories.BuildServiceResponses(services))
}

// GetService godoc
// @Summary      Get a service
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param id path string true "Service ID"
// @Success      200  {object}  models.ServiceResponseItem
// @Router       /services/{id} [get]
func GetService(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessService(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	service, _ := repositories.FindService(id)

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

	if !policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	body, err := helpers.BodyParse[models.ServiceCreateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	service := factories.BuildServiceFromServiceCreationInput(body, stackId)

	result := repositories.CreateService(&service)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot create service"))
	}

	return c.Status(fiber.StatusCreated).JSON(factories.BuildServiceResponse(service))
}

// UpdateService godoc
// @Summary      Update a service
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param id path string true "Service ID"
// @Param request body models.ServiceUpdateInput true "query params"
// @Success      200  {object}  models.ServiceResponse
// @Router       /services/{id} [put]
func UpdateService(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessService(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	service, _ := repositories.FindService(id)

	body, err := helpers.BodyParse[models.ServiceUpdateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	updatedService := factories.BuildServiceFromServiceUpdateInput(body)

	result := repositories.UpdateService(service, updatedService)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot update service"))
	}

	return c.Status(fiber.StatusOK).JSON(factories.BuildServiceResponse(service))
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

	if !policies.CanAccessService(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	service, _ := repositories.FindService(id)

	// we check if the user want to access to a service that belongs to him
	result, _ := repositories.GetStackByIdForAUser(service.StackID, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
	}

	repositories.DeleteService(service)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(
			fiber.Map{"status": "error", "message": "Cannot delete service"})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
