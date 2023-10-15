package controllers

import (
		"github.com/RomainDreidemy/MT5-docker-extension/src/models"
    "github.com/gofiber/fiber/v2"
    "net/http"
    "encoding/json"
)

// SearchDockerHubImages godoc
// @Summary      Search Docker Hub for images
// @Tags         DockerHub
// @Accept       json
// @Produce      json
// @Param term query string true "Search Term"
// @Success      200  {json}  models.DockerHubSearchResponse
// @Router       /dockerhub/images [get]
func SearchDockerHubImages(c *fiber.Ctx) error {
    term := c.Query("term")

    // Effectuez la recherche d'images Docker sur Docker Hub
    dockerhubApiUrl := "https://hub.docker.com/api/content/v1/products/search?page_size=25&q=" + term

    resp, err := http.Get(dockerhubApiUrl)

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error":   "Internal Server Error",
            "message": "Failed to search Docker Hub for images",
        })
    }
    defer resp.Body.Close()

    var searchResult models.DockerHubSearchResponse
    
    decoder := json.NewDecoder(resp.Body)


    if err := decoder.Decode(&searchResult); err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error":   "Internal Server Error",
            "message": "Failed to decode JSON response",
        })
    }

    return c.Status(fiber.StatusOK).JSON(searchResult)
}
