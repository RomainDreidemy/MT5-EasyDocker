package docker_compose

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
						ContainerName: "api",
						Context:       "./go",
						Dockerfile:    "Dockerfile",
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
						ContainerName: "api",
						DockerImage:   "go",
						DockerTag:     "1.20",
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
						ContainerName: "api",
						DockerImage:   "go",
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
