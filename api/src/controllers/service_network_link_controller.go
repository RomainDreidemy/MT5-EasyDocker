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

// CreateServiceNetworkLink godoc
// @Summary      Create a new link between a service and a network
// @Tags         Service Network Links
// @Accept       json
// @Produce      json
// @Param request body models.ServiceNetworkLinkCreateInput true "query params"
// @Success      200  {object}  models.ServiceNetworkLinkResponse
// @Router       /service_network_links [post]
func CreateServiceNetworkLink(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)

	body, err := helpers.BodyParse[models.ServiceNetworkLinkCreateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).
			JSON(factories.BuildErrorResponse("error", err.Error()))
	}

	errors := helpers.ValidateStruct(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).
			JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	if !policies.CanAccessService(currentUser, body.ServiceID) ||
		!policies.CanAccessNetwork(currentUser, body.NetworkID) {
		return c.Status(fiber.StatusNotFound).
			JSON(factories.BuildErrorResponse("error", "Service or network not found"))
	}

	_, db := repositories.FindServiceNetworkLink(body.ServiceID, body.NetworkID)
	var linkCount int64
	db.Count(&linkCount)

	if linkCount > 0 {
		return c.Status(fiber.StatusConflict).
			JSON(factories.BuildErrorResponse("error", "Link already exists"))
	}

	newServiceNetworkLink := factories.BuildServiceNetworkLinkFromCreateInput(body)

	result := initializers.DB.Create(&newServiceNetworkLink)

	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).
			JSON(fiber.Map{"status": "error", "message": "Something bad happened"})
	}

	return c.Status(fiber.StatusCreated).
		JSON(factories.BuildServiceNetworkLinkResponse(newServiceNetworkLink))
}
