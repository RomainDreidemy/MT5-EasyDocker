package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
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
	var stacks []models.Stack

	initializers.DB.Where("user_id = ?", currentUser.ID).Find(&stacks)

	var serializedStacks []models.StackResponse
	for i := 0; i < len(stacks); i++ {
		serializedStacks = append(serializedStacks, models.StackResponse{
			ID:          stacks[i].ID,
			Name:        stacks[i].Name,
			Description: stacks[i].Description,
		})
	}

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

	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", id, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	return c.Status(fiber.StatusOK).JSON(models.StackResponse{
		ID:          stack.ID,
		Name:        stack.Name,
		Description: stack.Description,
	})
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
	var payload *models.StackCreateInput
	currentUser := c.Locals("user").(models.UserResponse)

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	errors := models.ValidateStruct(payload)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	newStack := models.Stack{
		Name:        payload.Name,
		Description: payload.Description,
		UserID:      &currentUser.ID,
	}

	result := initializers.DB.Create(&newStack)

	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "error", "message": "Something bad happened"})
	}

	return c.Status(fiber.StatusCreated).JSON(models.StackResponse{
		ID:   newStack.ID,
		Name: newStack.Name,
	})
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
	var payload *models.StackUpdateInput

	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", id, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	errors := models.ValidateStruct(payload)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": errors})
	}

	updatedStack := models.Stack{
		Name:        payload.Name,
		Description: payload.Description,
	}

	result = initializers.DB.Model(&stack).Updates(updatedStack)

	if result.Error != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "error", "message": "Something bad happened"})
	}

	return c.Status(fiber.StatusOK).JSON(models.StackResponse{
		ID:          stack.ID,
		Name:        stack.Name,
		Description: stack.Description,
	})
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

	var stack models.Stack
	result := initializers.DB.First(&stack, "id = ? and user_id = ?", id, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "error", "message": "Stack not found"})
	}

	initializers.DB.Delete(&stack)

	return c.Status(fiber.StatusNoContent).Send(nil)
}
