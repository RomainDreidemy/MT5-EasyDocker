package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetManagedVolume godoc
// @Summary      Get a volume
// @Tags         Managed Volumes
// @Accept       json
// @Produce      json
// @Param id path string true "Volume ID"
// @Success      200  {object}  models.ManagedVolumeResponse
// @Router       /managed_volumes/{id} [get]
func GetManagedVolume(c *fiber.Ctx) error {
	id := c.Params("id")
	currentUser := c.Locals("user").(models.UserResponse)

	if !policies.CanAccessVolume(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Volume not found"))
	}

	volume, _ := repositories.Find[models.ManagedVolume](id)

	return c.Status(fiber.StatusOK).JSON(factories.BuildManagedVolumeResponse(volume))
}
