package controllers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/dockerhub"
	"github.com/gofiber/fiber/v2"
)

// SearchDockerHubImages
// @Summary searches public images based on a given term.
// @Tags DockerHub
// @Accept       json
// @Produce      json
// @Param term query string false "Term"
// @Success      200  {object}  models.DockerHubSearchImagesResponse
// @Router       /dockerhub/images [get]
func SearchDockerHubImages(ctx *fiber.Ctx) error {
	term := ctx.Query("term")

	searchResult, err := dockerhub.SearchImages(term)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(searchResult)
}

// SearchDockerHubImageTags
// @Summary searches tags based on a given image.
// @Tags DockerHub
// @Accept       json
// @Produce      json
// @Param image query string true "Image"
// @Success      200  {object}  models.DockerHubTagResponse
// @Router       /dockerhub/tags [get]
func SearchDockerHubImageTags(ctx *fiber.Ctx) error {
	image := ctx.Query("image")

	if image == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Missing 'image' parameter",
		})
	}

	searchResult, err := dockerhub.SearchTags(image)

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(searchResult)
}
