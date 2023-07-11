package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/docker_compose"
	"github.com/gofiber/fiber/v2"
)

func GenerateDockerComposeFile(c *fiber.Ctx) error {
	services, _ := repositories.FindServicesByStackId("85843022-39cc-4e8f-b7e5-ec8bbac57296")
	docker_compose.BuildDockerComposeFile(services)

	return c.Status(fiber.StatusOK).Send(nil)
}
