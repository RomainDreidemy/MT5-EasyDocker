package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers/concerns"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetServiceVolumes godoc
// @Summary      Get volumes for a service
// @Tags         Service Volumes
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Success      200  {array}  models.ServiceVolumeResponse
// @Router       /services/{serviceId}/volumes [get]
func GetServiceVolumes(c *fiber.Ctx) error {
	return concerns.GetServiceRelations[
		models.ServiceVolume,
		[]models.ServiceVolumeResponse](
		c,
		repositories.FindServiceRelationsByServiceId[models.ServiceVolume],
		factories.BuildServiceVolumeResponses,
		policies.CanAccessService,
	)
}

// GetServiceVolume godoc
// @Summary      Get a volume
// @Tags         Service Volumes
// @Accept       json
// @Produce      json
// @Param id path string true "Service Volume ID"
// @Success      200  {object}  models.ServiceVolumeResponse
// @Router       /volumes/{id} [get]
func GetServiceVolume(c *fiber.Ctx) error {
	return concerns.GetServiceRelation[
		models.ServiceVolume,
		models.ServiceVolumeResponse](
		c,
		repositories.FindServiceRelation[models.ServiceVolume],
		factories.BuildServiceVolumeResponse,
		policies.CanAccessServiceVolume,
	)
}

// CreateServiceVolume godoc
// @Summary      Create a new service volume
// @Tags         Service Volumes
// @Accept       json
// @Produce      json
// @Param serviceId path string true "Service ID"
// @Param request body models.ServiceVolumeCreateInput true "query params"
// @Success      201  {object}  models.ServiceVolumeResponse
// @Router       /services/{serviceId}/volumes [post]
func CreateServiceVolume(c *fiber.Ctx) error {
	return concerns.CreateServiceRelation[
		models.ServiceVolume,
		models.ServiceVolumeResponse,
		models.ServiceVolumeCreateInput](
		c,
		factories.BuildServiceVolumeFromServiceVolumeCreationInput,
		factories.BuildServiceVolumeResponse,
		policies.CanAccessService,
	)
}

// UpdateServiceVolume godoc
// @Summary      Update a service volume
// @Tags         Service Volumes
// @Accept       json
// @Produce      json
// @Param id path string true "Service Volume ID"
// @Param request body models.ServiceVolumeUpdateInput true "query params"
// @Success      200  {object}  models.ServiceVolumeResponse
// @Router       /volumes/{id} [put]
func UpdateServiceVolume(c *fiber.Ctx) error {
	return concerns.UpdateServiceRelation[
		models.ServiceVolume,
		models.ServiceVolumeResponse,
		models.ServiceVolumeUpdateInput](
		c,
		repositories.FindServiceRelation[models.ServiceVolume],
		factories.BuildServiceVolumeFromServiceVolumeUpdateInput,
		factories.BuildServiceVolumeResponse,
		policies.CanAccessServiceVolume,
	)
}

// DeleteServiceVolume godoc
// @Summary      Delete a service port
// @Tags         Service Volumes
// @Accept       json
// @Produce      json
// @Param id path string true "Service Volume ID"
// @Success      204
// @Router       /volumes/{id} [delete]
func DeleteServiceVolume(c *fiber.Ctx) error {
	return concerns.DeleteServiceRelation[models.ServiceVolume](
		c,
		repositories.FindServiceRelation[models.ServiceVolume],
		policies.CanAccessServiceVolume,
	)
}
