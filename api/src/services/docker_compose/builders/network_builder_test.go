package builders

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"reflect"
	"testing"
)

func TestBuildDockerComposeNetwork(t *testing.T) {
	type args struct {
		network models.Network
	}
	tests := []struct {
		name string
		args args
		want models.DockerComposeNetwork
	}{
		{
			name: "External should be true if network is external",
			args: args{
				network: models.Network{
					Name:       "test",
					IsExternal: true,
				},
			},
			want: models.DockerComposeNetwork{
				External: true,
			},
		},
		{
			name: "External should be false if network is not external",
			args: args{
				network: models.Network{
					Name:       "test",
					IsExternal: false,
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BuildDockerComposeNetwork(tt.args.network); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BuildDockerComposeNetwork() = %v, want %v", got, tt.want)
			}
		})
	}
}
