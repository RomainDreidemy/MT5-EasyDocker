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

// GetStacks godoc
// @Summary      Get stacks for current user
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Success      200  {array}  models.StackResponse
// @Router       /stacks [get]
func GetStacks(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)

	stacks, _ := repositories.GetStacksForAUser(currentUser.ID)

	serializedStacks := factories.BuildStackResponses(stacks)

	return c.Status(fiber.StatusOK).JSON(serializedStacks)
}

// GetStack godoc
// @Summary      Get a stack
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Param id path string true "Stack ID"
// @Success      200  {object}  models.StackResponse
// @Router       /stacks/{id} [get]
func GetStack(c *fiber.Ctx) error {
	id := c.Params("id")
	currentUser := c.Locals("user").(models.UserResponse)

	if !policies.CanAccessStack(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	stack, _ := repositories.FindStack(id)

	return c.Status(fiber.StatusOK).JSON(factories.BuildStackResponse(stack))
}

// CreateStack godoc
// @Summary      Create a new stack
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Param request body models.StackCreateInput true "query params"
// @Success      200  {object}  models.StackResponse
// @Router       /stacks [post]
func CreateStack(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)

	body, err := helpers.BodyParse[models.StackCreateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", err.Error()))
	}

	errors := helpers.ValidateStruct(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	newStack := factories.BuildStackFromStackCreateInput(body, currentUser.ID)

	result := initializers.DB.Create(&newStack)

	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "error", "message": "Something bad happened"})
	}

	return c.Status(fiber.StatusCreated).JSON(factories.BuildStackResponse(newStack))
}

// UpdateStack godoc
// @Summary      Update a stack
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Param id path string true "Stack ID"
// @Param request body models.StackUpdateInput true "query params"
// @Success      200  {object}  models.StackResponse
// @Router       /stacks/{id} [put]
func UpdateStack(c *fiber.Ctx) error {
	id := c.Params("id")
	currentUser := c.Locals("user").(models.UserResponse)

	if !policies.CanAccessStack(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	stack, _ := repositories.FindStack(id)

	body, err := helpers.BodyParse[models.StackUpdateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", err.Error()))
	}

	errors := helpers.ValidateStruct(body)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	updatedStack := factories.BuildStackFromStackUpdateInput(body, currentUser.ID)

	result := initializers.DB.Model(&stack).Updates(updatedStack)
	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(factories.BuildErrorResponse("error", "Something bad happened"))
	}

	return c.Status(fiber.StatusOK).JSON(factories.BuildStackResponse(stack))
}

// DeleteStack godoc
// @Summary      Delete a stack
// @Tags         Stacks
// @Accept       json
// @Produce      json
// @Param id path string true "Stack ID"
// @Success      204
// @Router       /stacks/{id} [delete]
func DeleteStack(c *fiber.Ctx) error {
	id := c.Params("id")
	currentUser := c.Locals("user").(models.UserResponse)

	if !policies.CanAccessStack(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	stack, _ := repositories.FindStack(id)

	initializers.DB.Delete(&stack)

	return c.Status(fiber.StatusNoContent).Send(nil)
}
