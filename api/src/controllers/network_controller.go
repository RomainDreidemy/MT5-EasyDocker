package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/policies"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/factories"
	"github.com/gofiber/fiber/v2"
)

// GetNetworks godoc
// @Summary      Get networks for a stack
// @Tags         Networks
// @Accept       json
// @Produce      json
// @Param stackId path string true "Stack ID"
// @Success      200  {array}  models.NetworkResponse
// @Router       /stacks/{stackId}/networks [get]
func GetNetworks(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	stackId := c.Params("stackId")

	if !policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	networks, _ := repositories.FindNetworksByStackId(stackId)

	return c.Status(fiber.StatusOK).JSON(factories.BuildNetworkResponses(networks))
}

// GetNetwork godoc
// @Summary      Get a network
// @Tags         Networks
// @Accept       json
// @Produce      json
// @Param id path string true "Network ID"
// @Success      200  {object}  models.NetworkResponse
// @Router       /networks/{id} [get]
func GetNetwork(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessNetwork(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Network not found"))
	}

	network, _ := repositories.FindNetwork(id)

	return c.Status(fiber.StatusOK).JSON(factories.BuildNetworkResponse(network))
}

// CreateNetwork godoc
// @Summary      Create a new network
// @Tags         Networks
// @Accept       json
// @Produce      json
// @Param stackId path string true "Stack ID"
// @Param request body models.NetworkCreateInput true "query params"
// @Success      201  {object}  models.NetworkResponse
// @Router       /stacks/{stackId}/networks [post]
func CreateNetwork(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	stackId := c.Params("stackId")

	if !policies.CanAccessStack(currentUser, stackId) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Stack not found"))
	}

	body, err := helpers.BodyParse[models.NetworkCreateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	network := factories.BuildNetworkFromNetworkCreationInput(body, stackId)

	result := repositories.CreateNetwork(&network)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot create service"))
	}

	return c.Status(fiber.StatusCreated).JSON(factories.BuildNetworkResponse(network))
}

// UpdateNetwork godoc
// @Summary      Update a network
// @Tags         Networks
// @Accept       json
// @Produce      json
// @Param id path string true "Network ID"
// @Param request body models.NetworkUpdateInput true "query params"
// @Success      200  {object}  models.NetworkResponse
// @Router       /networks/{id} [put]
func UpdateNetwork(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessNetwork(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Network not found"))
	}

	network, _ := repositories.FindNetwork(id)

	body, err := helpers.BodyParse[models.NetworkUpdateInput](c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot parse JSON"))
	}

	updatedNetwork := factories.BuildNetworkFromNetworkUpdateInput(body)

	result := repositories.UpdateNetwork(network, updatedNetwork)

	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(factories.BuildErrorResponse("error", "Cannot update network"))
	}

	return c.Status(fiber.StatusOK).JSON(factories.BuildNetworkResponse(network))
}

// DeleteNetwork godoc
// @Summary      Delete a network
// @Tags         Networks
// @Accept       json
// @Produce      json
// @Param id path string true "Network ID"
// @Success      204
// @Router       /networks/{id} [delete]
func DeleteNetwork(c *fiber.Ctx) error {
	currentUser := c.Locals("user").(models.UserResponse)
	id := c.Params("id")

	if !policies.CanAccessNetwork(currentUser, id) {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Network not found"))
	}

	network, _ := repositories.FindNetwork(id)

	//check if the network belongs to the user
	result, _ := repositories.GetStackByIdForAUser(network.StackID, currentUser.ID)

	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(factories.BuildErrorResponse("error", "Network not found"))
	}

	repositories.DeleteNetwork(network)

	return c.SendStatus(fiber.StatusNoContent)
}
