package models

type DockerHubSearchImagesResponse struct {
	PageSize int `json:"page_size"`
	Next     string `json:"next"`
	Previous string `json:"previous"`
	Page     int `json:"page"`
	Count    int `json:"count"`
	Summaries []DockerHubImage `json:"summaries"`
}

type DockerHubImage struct {
	ID                   string `json:"id"`
	Name                 string `json:"name"`
	Slug                 string `json:"slug"`
	Type                 string `json:"type"`
	Publisher            DockerHubPublisher `json:"publisher"`
	CreatedAt            string `json:"created_at"`
	UpdatedAt            string `json:"updated_at"`
	ShortDescription     string `json:"short_description"`
	Source               string `json:"source"`
	ExtensionReviewed    bool `json:"extension_reviewed"`
	Popularity           int `json:"popularity"`
	Categories           []DockerHubCategory `json:"categories"`
	OperatingSystems     []DockerHubOperatingSystem `json:"operating_systems"`
	Architectures        []DockerHubArchitecture `json:"architectures"`
	LogoURL              DockerHubLogoURL `json:"logo_url"`
	CertificationStatus  string `json:"certification_status"`
	StarCount            int `json:"star_count"`
	FilterType           string `json:"filter_type"`
}

type DockerHubPublisher struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type DockerHubCategory struct {
	Name  string `json:"name"`
	Label string `json:"label"`
}

type DockerHubOperatingSystem struct {
	Name  string `json:"name"`
	Label string `json:"label"`
}

type DockerHubArchitecture struct {
	Name  string `json:"name"`
	Label string `json:"label"`
}

type DockerHubLogoURL struct {
	Small    string `json:"small"`
	Small2x  string `json:"small@2x"`
}
