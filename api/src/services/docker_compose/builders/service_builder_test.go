package builders

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"reflect"
	"testing"
)

func TestDockerComposeServicesBuilder(t *testing.T) {
	type args struct {
		services []models.Service
	}
	tests := []struct {
		name string
		args args
		want map[string]models.DockerComposeService
	}{
		{
			name: "service should have the build part",
			args: args{
				services: []models.Service{
					{
						Name:       "api",
						Context:    "./go",
						Dockerfile: "Dockerfile",
					},
				},
			},
			want: map[string]models.DockerComposeService{
				"api": {
					ContainerName: "api",
					Build: models.DockerComposeServiceBuild{
						Context:    "./go",
						Dockerfile: "Dockerfile",
					},
				},
			},
		},
		{
			name: "service should not have the build part",
			args: args{
				services: []models.Service{
					{
						Name:        "api",
						DockerImage: "go",
						DockerTag:   "1.20",
					},
				},
			},
			want: map[string]models.DockerComposeService{
				"api": {
					ContainerName: "api",
					Image:         "go:1.20",
				},
			},
		},
		{
			name: "tag should be latest if not specified",
			args: args{
				services: []models.Service{
					{
						Name:        "api",
						DockerImage: "go",
					},
				},
			},
			want: map[string]models.DockerComposeService{
				"api": {
					ContainerName: "api",
					Image:         "go:latest",
				},
			},
		},
		{
			name: "should have the entrypoint if specified",
			args: args{
				services: []models.Service{
					{
						Name:        "api",
						DockerImage: "go",
						Entrypoint:  "go build",
					},
				},
			},
			want: map[string]models.DockerComposeService{
				"api": {
					ContainerName: "api",
					Image:         "go:latest",
					Entrypoint:    "go build",
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := DockerComposeServicesBuilder(tt.args.services); !reflect.DeepEqual(got, tt.want) {
				fmt.Printf("got: %v\n", got)
				t.Errorf("DockerComposeServicesBuilder() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestBuildDockerComposeServicePorts(t *testing.T) {
	type args struct {
		servicePorts []models.ServicePort
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "should have the concatenation of public and private port",
			args: args{
				servicePorts: []models.ServicePort{
					{
						Private: 8080,
						Public:  3000,
					},
				},
			},
			want: []string{
				"3000:8080",
			},
		},
		{
			name: "should have only the private port",
			args: args{
				servicePorts: []models.ServicePort{
					{
						Private: 3000,
					},
				},
			},
			want: []string{
				"3000",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildDockerComposeServicePorts(tt.args.servicePorts); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BuildDockerComposeServicePorts() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestBuildDockerComposeServiceVolumes(t *testing.T) {
	type args struct {
		service models.Service
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "should have the concatenation of source and target",
			args: args{
				service: models.Service{
					ServiceVolumes: []models.ServiceVolume{
						{
							LocalPath:     "./api",
							ContainerPath: "/app",
						},
					},
				},
			},
			want: []string{
				"./api:/app",
			},
		},
		{
			name: "should have the concatenation of source and target + with volume links",
			args: args{
				service: models.Service{
					ServiceVolumes: []models.ServiceVolume{
						{
							LocalPath:     "./api",
							ContainerPath: "/app",
						},
					},
					ServiceManagedVolumeLinks: []models.ServiceManagedVolumeLink{
						{
							ContainerPath: "/app",
							ManagedVolume: models.ManagedVolume{
								Name: "api",
							},
						},
					},
				},
			},
			want: []string{
				"./api:/app",
				"api:/app",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildDockerComposeServiceVolumes(tt.args.service); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BuildDockerComposeServiceVolumes() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestBuildDockerComposeServiceEnvironments(t *testing.T) {
	type args struct {
		serviceEnvironments []models.ServiceEnvVariable
	}
	tests := []struct {
		name string
		args args
		want map[string]string
	}{
		{
			name: "should have the concatenation of source and target",
			args: args{
				serviceEnvironments: []models.ServiceEnvVariable{
					{
						Key:   "POSTGRES_USER",
						Value: "postgres",
					},
					{
						Key:   "POSTGRES_PASSWORD",
						Value: "password123",
					},
				},
			},
			want: map[string]string{
				"POSTGRES_USER":     "postgres",
				"POSTGRES_PASSWORD": "password123",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildDockerComposeServiceEnvironments(tt.args.serviceEnvironments); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BuildDockerComposeServiceEnvironments() = %v, want %v", got, tt.want)
			}
		})
	}
}
