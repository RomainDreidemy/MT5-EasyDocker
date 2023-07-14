package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/docker_compose"
	"github.com/gofiber/fiber/v2"
)

func GenerateDockerComposeFile(c *fiber.Ctx) error {
	stackId := "26cf2081-b4b5-41b0-9246-af3b8e93894b"
	services, _ := repositories.FindServicesByStackIdWithAssociation(stackId)
	networks, _ := repositories.FindNetworksByStackId(stackId)

	yaml := docker_compose.GenerateDockerCompose(services, networks)

	return c.Status(fiber.StatusOK).Send([]byte(yaml))
}
