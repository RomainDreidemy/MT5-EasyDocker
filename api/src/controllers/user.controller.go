package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/gofiber/fiber/v2"
)

func GetMe(c *fiber.Ctx) error {
	user := c.Locals("user").(models.UserResponse)

	return c.Status(fiber.StatusOK).JSON(user)
}
