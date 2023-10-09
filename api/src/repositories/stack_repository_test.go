package repositories_test

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/RomainDreidemy/MT5-docker-extension/src/repositories"
	"github.com/RomainDreidemy/MT5-docker-extension/src/test_helpers"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"math/rand"
	"testing"
)

type StackRepoTestSuite struct {
	suite.Suite
}

func (suite *StackRepoTestSuite) TestFindStack() {
	pool, resource := test_helpers.IntegrationTestSetup()
	defer test_helpers.IntegrationTestTeardown(pool, resource)

	// Given
	uuid.SetRand(rand.New(rand.NewSource(1)))
	stackId := "2935b117-880c-4f73-be89-de8fba6b196e"
	userId := uuid.MustParse("14b953e8-30f9-47fc-943b-85d54cbcd54c")
	expectedStackID := uuid.MustParse("2935b117-880c-4f73-be89-de8fba6b196e")
	expectedStack := models.Stack{
		ID:             &expectedStackID,
		Name:           "DockerEasy",
		Description:    "stack of docker easy",
		UserID:         &userId,
		Services:       []models.Service(nil),
		Networks:       []models.Network(nil),
		ManagedVolumes: []models.ManagedVolume(nil),
	}

	// When
	stack, _ := repositories.FindStack(stackId)

	// Then
	assert.Equal(suite.T(), expectedStack, stack, "it find the right stack")
}

func (suite *StackRepoTestSuite) TestFindStackWithAssociations() {
	pool, resource := test_helpers.IntegrationTestSetup()
	defer test_helpers.IntegrationTestTeardown(pool, resource)

	// Given
	uuid.SetRand(rand.New(rand.NewSource(1)))
	stackId := "2935b117-880c-4f73-be89-de8fba6b196e"
	userId := uuid.MustParse("14b953e8-30f9-47fc-943b-85d54cbcd54c")
	expectedStackID := uuid.MustParse("2935b117-880c-4f73-be89-de8fba6b196e")

	expectedStack := models.Stack{
		ID:             &expectedStackID,
		Name:           "DockerEasy",
		Description:    "stack of docker easy",
		UserID:         &userId,
		Services:       []models.Service(nil),
		Networks:       []models.Network{},
		ManagedVolumes: []models.ManagedVolume(nil),
	}

	// When
	stack, _ := repositories.FindStackWithAssociations(stackId)

	// Then
	assert.Equal(suite.T(), expectedStack, stack, "Stack doesn't have the right associations")

}

func (suite *StackRepoTestSuite) TestGetStackByIdForAUser() {
	pool, resource := test_helpers.IntegrationTestSetup()
	defer test_helpers.IntegrationTestTeardown(pool, resource)

	// Given
	uuid.SetRand(rand.New(rand.NewSource(1)))
	stackId := "2935b117-880c-4f73-be89-de8fba6b196e"
	userId := uuid.MustParse("14b953e8-30f9-47fc-943b-85d54cbcd54c")
	expectedStackID := uuid.MustParse("2935b117-880c-4f73-be89-de8fba6b196e")

	expectedStack := models.Stack{
		ID:             &expectedStackID,
		Name:           "DockerEasy",
		Description:    "stack of docker easy",
		UserID:         &userId,
		Services:       []models.Service(nil),
		Networks:       []models.Network(nil),
		ManagedVolumes: []models.ManagedVolume(nil),
	}

	// When
	_, stack := repositories.GetStackByIdForAUser(stackId, userId)

	// Then
	assert.Equal(suite.T(), expectedStack, stack, "Stack doesn't have the right associations")
}

func (suite *StackRepoTestSuite) TestGetStacksForAUser() {
	pool, resource := test_helpers.IntegrationTestSetup()
	defer test_helpers.IntegrationTestTeardown(pool, resource)

	// Given
	uuid.SetRand(rand.New(rand.NewSource(1)))
	userId := uuid.MustParse("14b953e8-30f9-47fc-943b-85d54cbcd54c")
	expectedStackID := uuid.MustParse("2935b117-880c-4f73-be89-de8fba6b196e")

	expectedStack := models.Stack{
		ID:             &expectedStackID,
		Name:           "DockerEasy",
		Description:    "stack of docker easy",
		UserID:         &userId,
		Services:       []models.Service(nil),
		Networks:       []models.Network(nil),
		ManagedVolumes: []models.ManagedVolume(nil),
	}

	expectedStacks := []models.Stack{
		expectedStack,
	}

	// When
	stacks, _ := repositories.GetStacksForAUser(userId)

	// Then
	assert.Equal(suite.T(), expectedStacks, stacks, "Stack doesn't correspond to user")
}

func TestStackRepoTestSuite(t *testing.T) {
	suite.Run(t, new(StackRepoTestSuite))
}
