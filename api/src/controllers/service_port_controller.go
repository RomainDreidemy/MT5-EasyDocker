package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetServicePorts godoc
// @Summary      Get ports for a service
// @Tags         Service Ports
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Success      200  {array}  models.ServicePortResponse
// @Router       /services/{serviceId}/ports [get]
func GetServicePorts(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	serviceId := c.Params("serviceId")

	if !policies.CanAccessService(currentUser, serviceId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service port not found"))
	}

	servicePorts, _ := repositories.FindServicePortsByServiceId(serviceId)

	return c.Status(fiber.StatusOK).JSON(factories.BuildServicePortResponses(servicePorts))
}

// GetServicePort godoc
// @Summary      Get a port
// @Tags         Service Ports
// @Accept       json
// @Produce      json
// @Param id path string true "Service Port ID"
// @Success      200  {object}  models.ServicePortResponse
// @Router       /ports/{id} [get]
func GetServicePort(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessServicePort(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service Port not found"))
	}

	servicePort, _ := repositories.FindServicePort(id)

	return c.Status(fiber.StatusOK).JSON(factories.BuildServicePortResponse(servicePort))
}

// CreateServicePort godoc
// @Summary      Create a new service port
// @Tags         Service Ports
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Param request body models.ServicePortCreateInput true "query params"
// @Success      201  {object}  models.ServicePortResponse
// @Router       /services/{serviceId}/ports [post]
func CreateServicePort(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	serviceId := c.Params("serviceId")

	if !policies.CanAccessService(currentUser, serviceId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service port not found"))
	}

	body, err := helpers.BodyParse[models.ServicePortCreateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	servicePort := factories.BuildServicePortFromServicePortCreationInput(body, serviceId)

	result := initializers.DB.Create(&servicePort)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot create service"))
	}

	return c.Status(fiber.StatusCreated).JSON(factories.BuildServicePortResponse(servicePort))
}

// UpdateServicePort godoc
// @Summary      Update a service port
// @Tags         Service Ports
// @Accept       json
// @Produce      json
// @Param id path string true "Service Port ID"
// @Param request body models.ServicePortUpdateInput true "query params"
// @Success      200  {object}  models.ServicePortResponse
// @Router       /ports/{id} [put]
func UpdateServicePort(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessServicePort(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	servicePort, _ := repositories.FindServicePort(id)

	body, err := helpers.BodyParse[models.ServicePortUpdateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	updatedService := factories.BuildServicePortFromServicePortUpdateInput(body)

	result := initializers.DB.Model(&servicePort).Updates(updatedService)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot update service"))
	}

	return c.Status(fiber.StatusOK).JSON(factories.BuildServicePortResponse(servicePort))
}

// DeleteServicePort godoc
// @Summary      Delete a service
// @Tags         Services
// @Accept       json
// @Produce      json
// @Param id path string true "Service ID"
// @Success      204
// @Router       /ports/{id} [delete]
//func DeleteServicePort(c *fiber.Ctx) error {
//	currentUser := c.Locals("user").(models.UserResponse)
//	id := c.Params("id")
//
//	if !policies.CanAccessService(currentUser, id) {
//		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
//	}
//
//	service, _ := repositories.FindService(id)
//
//	// we check if the user want to access to a service that belongs to him
//	result, _ := repositories.GetStackByIdForAUser(service.StackID, currentUser.ID)
//
//	if result.RowsAffected == 0 {
//		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Service not found"})
//	}
//
//	initializers.DB.Delete(&service)
//
//	return c.Status(fiber.StatusNoContent).Send(nil)
//}
