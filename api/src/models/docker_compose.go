package models

type DockerCompose struct {
	Version  string                          `yaml:"version"`
	Services map[string]DockerComposeService `yaml:"services"`
}

type DockerComposeService struct {
	ContainerName string                    `yaml:"container_name"`
	Build         DockerComposeServiceBuild `yaml:"build,omitempty"`
	Image         string                    `yaml:"image,omitempty"`
}

type DockerComposeServiceBuild struct {
	Context    string `yaml:"context,omitempty"`
	Dockerfile string `yaml:"dockerfile,omitempty"`
}
