package dockerhub

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

// SearchService définit un service pour effectuer des recherches Docker Hub.
type DockerhubSearchService struct {
}

// NewSearchService crée une nouvelle instance de SearchService.
func NewDockerhubSearchService() *DockerhubSearchService {
	return &DockerhubSearchService{}
}

// SearchImages effectue une recherche d'images Docker Hub.
func (s *DockerhubSearchService) SearchImages(term string) (*models.DockerHubSearchImagesResponse, error) {
	dockerhubAPIUrl := "https://hub.docker.com/api/content/v1/products/search?page_size=25&type=image&q=" + term
	resp, err := http.Get(dockerhubAPIUrl)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var searchResult models.DockerHubSearchImagesResponse
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&searchResult); err != nil {
		return nil, err
	}

	return &searchResult, nil
}

// SearchTags effectue une recherche de tags pour une image Docker spécifique.
func (s *DockerhubSearchService) SearchTags(image string) (*models.DockerHubTagResponse, error) {
	if image == "" {
		return nil, fmt.Errorf("Missing 'image' parameter")
	}

	dockerhubAPIURL := "https://hub.docker.com/v2/repositories/library/" + image + "/tags"
	resp, err := http.Get(dockerhubAPIURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var searchResult models.DockerHubTagResponse
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&searchResult); err != nil {
		return nil, err
	}

	return &searchResult, nil
}
