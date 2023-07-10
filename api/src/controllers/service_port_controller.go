package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers/concerns"
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
	return concerns.GetServiceRelations[
		models.ServicePort,
		[]models.ServicePortResponse](
		c,
		repositories.FindServicePortsByServiceId,
		factories.BuildServicePortResponses,
		policies.CanAccessService,
	)
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
	return concerns.GetServiceRelation[
		models.ServicePort,
		models.ServicePortResponse](
		c,
		repositories.FindServicePort,
		factories.BuildServicePortResponse,
		policies.CanAccessServicePort,
	)
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
	return concerns.CreateServiceRelation[
		models.ServicePort,
		models.ServicePortResponse,
		models.ServicePortCreateInput](
		c,
		factories.BuildServicePortFromServicePortCreationInput,
		factories.BuildServicePortResponse,
		policies.CanAccessService,
	)
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
	return concerns.UpdateServiceRelation[
		models.ServicePort,
		models.ServicePortResponse,
		models.ServicePortUpdateInput](
		c,
		repositories.FindServicePort,
		factories.BuildServicePortFromServicePortUpdateInput,
		factories.BuildServicePortResponse,
		policies.CanAccessServicePort,
	)
}

// DeleteServicePort godoc
// @Summary      Delete a service port
// @Tags         Service Ports
// @Accept       json
// @Produce      json
// @Param id path string true "Service Port ID"
// @Success      204
// @Router       /ports/{id} [delete]
func DeleteServicePort(c *fiber.Ctx) error {
	return concerns.DeleteServiceRelation[models.ServicePort](
		c,
		repositories.FindServicePort,
		policies.CanAccessServicePort,
	)
}
