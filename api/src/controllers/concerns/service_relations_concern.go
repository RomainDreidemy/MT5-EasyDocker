package concerns

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetServiceRelations[
	Model interface{},
	Response interface{},
](
	c *fiber.Ctx,
	getRelations func(serviceId string) ([]Model, *gorm.DB),
	responseFactory func([]Model) Response,
	hasAccess func(models.UserResponse, string) bool,
) error {
	currentUser := c.Locals("user").(models.UserResponse)
	serviceId := c.Params("serviceId")

	if !hasAccess(currentUser, serviceId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Relations not found"))
	}

	relations, _ := getRelations(serviceId)

	return c.Status(fiber.StatusOK).JSON(responseFactory(relations))
}

func GetServiceRelation[
	Model interface{},
	Response interface{},
](
	c *fiber.Ctx,
	getRelation func(relationId string) (Model, *gorm.DB),
	responseFactory func(Model) Response,
	hasAccess func(models.UserResponse, string) bool,
) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !hasAccess(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Relation not found"))
	}

	relation, _ := getRelation(id)

	return c.Status(fiber.StatusOK).JSON(responseFactory(relation))
}

func CreateServiceRelation[
	Model interface{},
	Response interface{},
	Body interface{},
](
	c *fiber.Ctx,
	createBuilder func(Body, string) Model,
	responseBuilder func(Model) Response,
	hasAccess func(models.UserResponse, string) bool,
) error {
	currentUser := c.Locals("user").(models.UserResponse)
	serviceId := c.Params("serviceId")

	if !hasAccess(currentUser, serviceId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service port not found"))
	}

	body, err := helpers.BodyParse[Body](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	relation := createBuilder(body, serviceId)

	result := initializers.DB.Create(&relation)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot create service"))
	}

	return c.Status(fiber.StatusCreated).JSON(responseBuilder(relation))
}

func UpdateServiceRelation[
	Model interface{},
	Response interface{},
	Body interface{},
](
	c *fiber.Ctx,
	getRelation func(relationId string) (Model, *gorm.DB),
	updateBuilder func(Body) Model,
	responseBuilder func(Model) Response,
	hasAccess func(models.UserResponse, string) bool,
) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !hasAccess(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	relation, _ := getRelation(id)

	body, err := helpers.BodyParse[Body](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	updatedRelation := updateBuilder(body)

	result := initializers.DB.Model(&relation).Updates(updatedRelation)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot update service"))
	}

	return c.Status(fiber.StatusOK).JSON(responseBuilder(relation))
}

func DeleteServiceRelation[Model interface{}](
	c *fiber.Ctx,
	getRelation func(relationId string) (Model, *gorm.DB),
	hasAccess func(models.UserResponse, string) bool,
) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !hasAccess(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Service not found"))
	}

	relation, _ := getRelation(id)

	initializers.DB.Delete(&relation)

	return c.Status(fiber.StatusNoContent).Send(nil)
}
