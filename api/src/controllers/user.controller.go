package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/gofiber/fiber/v2"
)

// GetMe godoc
// @Summary      Get current user
// @Tags         Users
// @Accept       json
// @Produce      json
// @Success      200  {object}  models.UserResponse
// @Router       /users/me [get]
func GetMe(c *fiber.Ctx) error {
	user := c.Locals("user").(models.UserResponse)

	return c.Status(fiber.StatusOK).JSON(user)
}
