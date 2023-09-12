package create_by_file

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"gopkg.in/yaml.v3"
	"log"
)

func GenerateModelWithYaml(content []byte) models.DockerCompose {
	t := models.DockerCompose{}

	err := yaml.Unmarshal(content, &t)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("--- t:\n%v\n\n", t)

	d, err := yaml.Marshal(&t)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	fmt.Printf("--- t dump:\n%s\n\n", string(d)) //file,

	return t
}
