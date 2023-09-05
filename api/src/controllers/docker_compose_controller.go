package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/docker_compose"
	"github.com/gofiber/fiber/v2"
)

func GenerateDockerComposeFile(c *fiber.Ctx) error {
	stackId := c.Params("stackId")
	currentUser := c.Locals("user").(models.UserResponse)

	if !policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	services, _ := repositories.FindServicesByStackIdWithAssociation(stackId)
	networks, _ := repositories.FindNetworksByStackId(stackId)

	yaml := docker_compose.GenerateDockerCompose(services, networks)

	return c.Status(fiber.StatusOK).Send([]byte(yaml))
}
