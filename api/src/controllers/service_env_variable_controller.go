package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers/concerns"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetServiceEnvVariables godoc
// @Summary      Get env variables for a service
// @Tags         Service Env Variables
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Success      200  {array}  models.ServiceEnvVariableResponse
// @Router       /services/{serviceId}/env_variables [get]
func GetServiceEnvVariables(c *fiber.Ctx) error {
	return concerns.GetServiceRelations[
		models.ServiceEnvVariable,
		[]models.ServiceEnvVariableResponse](
		c,
		repositories.FindServiceRelationsByServiceId[models.ServiceEnvVariable],
		factories.BuildServiceEnvVariableResponses,
		policies.CanAccessService,
	)
}

// GetServiceEnvVariable godoc
// @Summary      Get an env variable
// @Tags         Service Env Variables
// @Accept       json
// @Produce      json
// @Param id path string true "Service Env Variable ID"
// @Success      200  {object}  models.ServiceEnvVariableResponse
// @Router       /env_variables/{id} [get]
func GetServiceEnvVariable(c *fiber.Ctx) error {
	return concerns.GetServiceRelation[
		models.ServiceEnvVariable,
		models.ServiceEnvVariableResponse](
		c,
		repositories.FindServiceRelation[models.ServiceEnvVariable],
		factories.BuildServiceEnvVariableResponse,
		policies.CanAccessServiceEnvVariable,
	)
}

// CreateServiceEnvVariable godoc
// @Summary      Create a new service env variable
// @Tags         Service Env Variables
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Param request body models.ServiceEnvVariableCreateInput true "query params"
// @Success      201  {object}  models.ServiceEnvVariableResponse
// @Router       /services/{serviceId}/env_variables [post]
func CreateServiceEnvVariable(c *fiber.Ctx) error {
	return concerns.CreateServiceRelation[
		models.ServiceEnvVariable,
		models.ServiceEnvVariableResponse,
		models.ServiceEnvVariableCreateInput](
		c,
		factories.BuildServiceEnvVariableFromServiceEnvVariableCreateInput,
		factories.BuildServiceEnvVariableResponse,
		policies.CanAccessService,
	)
}

// UpdateServiceEnvVariable godoc
// @Summary      Update a service env variable
// @Tags         Service Env Variables
// @Accept       json
// @Produce      json
// @Param id path string true "Service Env Variable ID"
// @Param request body models.ServiceEnvVariableUpdateInput true "query params"
// @Success      200  {object}  models.ServiceEnvVariableResponse
// @Router       /env_variables/{id} [put]
func UpdateServiceEnvVariable(c *fiber.Ctx) error {
	return concerns.UpdateServiceRelation[
		models.ServiceEnvVariable,
		models.ServiceEnvVariableResponse,
		models.ServiceEnvVariableUpdateInput](
		c,
		repositories.FindServiceRelation[models.ServiceEnvVariable],
		factories.BuildServiceEnvVariableFromServiceEnvVariableUpdateInput,
		factories.BuildServiceEnvVariableResponse,
		policies.CanAccessServiceEnvVariable,
	)
}

// DeleteServiceEnvVariable godoc
// @Summary      Delete a service env variable
// @Tags         Service Env Variables
// @Accept       json
// @Produce      json
// @Param id path string true "Service Env Variable ID"
// @Success      204
// @Router       /env_variables/{id} [delete]
func DeleteServiceEnvVariable(c *fiber.Ctx) error {
	return concerns.DeleteServiceRelation[models.ServiceEnvVariable](
		c,
		repositories.FindServiceRelation[models.ServiceEnvVariable],
		policies.CanAccessServiceEnvVariable,
	)
}
