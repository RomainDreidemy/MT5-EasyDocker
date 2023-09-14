package models

type DockerCompose struct {
	Version  string                          `yaml:"version"`
	Services map[string]DockerComposeService `yaml:"services"`
	Networks map[string]DockerComposeNetwork `yaml:"networks,omitempty"`
	Volumes  map[string]struct{}             `yaml:"volumes,omitempty"`
}

type DockerComposeService struct {
	ContainerName string                    `yaml:"container_name"`
	Build         DockerComposeServiceBuild `yaml:"build,omitempty"`
	Image         string                    `yaml:"image,omitempty"`
	Ports         []string                  `yaml:"ports,omitempty"`
	EnvFile       string                    `yaml:"env_file,omitempty"`
	Environment   map[string]string         `yaml:"environment,omitempty"`
	Volumes       []string                  `yaml:"volumes,omitempty"`
	Networks      []string                  `yaml:"networks,omitempty"`
	Entrypoint    string                    `yaml:"entrypoint,omitempty"`
}

type DockerComposeServiceBuild struct {
	Context    string `yaml:"context,omitempty"`
	Dockerfile string `yaml:"dockerfile,omitempty"`
}

type DockerComposeNetwork struct {
	External bool   `yaml:"external"`
	Driver   string `yaml:"driver,omitempty"`
}
