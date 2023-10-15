package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/RomainDreidemy/MT5-docker-extension/src/services/dockerhub"
)

// DockerHubSearchController est le contrôleur qui gère les recherches Docker Hub.
type DockerHubSearchController struct {
	searchService *dockerhub.DockerhubSearchService
}

// NewSearchController crée un nouveau contrôleur de recherche avec une instance du service.
func NewSearchController(searchService *dockerhub.DockerhubSearchService) *DockerHubSearchController {
	return &DockerHubSearchController{searchService: searchService}
}

// SearchDockerHubImages est la méthode du contrôleur pour rechercher des images.
func (c *DockerHubSearchController) SearchDockerHubImages(ctx *fiber.Ctx) error {
	term := ctx.Query("term")

	// c.searchService pour appeler la méthode du service
	searchResult, err := c.searchService.SearchImages(term)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(searchResult)
}


func (c *DockerHubSearchController) SearchDockerHubImageTags(ctx *fiber.Ctx) error {
	image := ctx.Query("image")

	if image == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Missing 'image' parameter",
		})
	}

	// c.searchService pour appeler la méthode du service
	searchResult, err := c.searchService.SearchTags(image)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal Server Error",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(searchResult)
}
