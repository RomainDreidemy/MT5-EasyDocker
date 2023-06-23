package helpers

import (
	"github.com/gofiber/fiber/v2"
)

func BodyParse[ModelInput interface{}](context *fiber.Ctx) (ModelInput, error) {
	var body ModelInput
	return body, context.BodyParser(&body)
}
