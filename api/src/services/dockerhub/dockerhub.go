package dockerhub

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
)

func SearchImages(term string) (*models.DockerHubSearchImagesResponse, error) {
	dockerhubApiUrl := "https://hub.docker.com/api/content/v1/products/search?page_size=25&type=image&q=" + term
	resp, err := http.Get(dockerhubApiUrl)
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

func SearchTags(image string) (*models.DockerHubTagResponse, error) {
	if image == "" {
		return nil, fmt.Errorf("Missing 'image' parameter")
	}

	dockerhubApiUrl := "https://hub.docker.com/v2/repositories/library/" + image + "/tags"
	resp, err := http.Get(dockerhubApiUrl)
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
