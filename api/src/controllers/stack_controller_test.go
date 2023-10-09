package controllers_test

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers"
	middleware "github.com/RomainDreidemy/MT5-docker-extension/src/middlewares"
	"github.com/RomainDreidemy/MT5-docker-extension/src/test_helpers"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"io"
	"net/http"
	"strings"
	"testing"
)

type StackControllerTestSuite struct {
	suite.Suite
}

func (suite *StackControllerTestSuite) TestStackController() {
	pool, resource := test_helpers.IntegrationTestSetup()
	defer test_helpers.IntegrationTestTeardown(pool, resource)

	existingStackId := "2935b117-880c-4f73-be89-de8fba6b196e"

	suite.T().Run("GetStacks", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "it return stacks",
				Route:         "/stacks",
				ExpectedError: false,
				ExpectedCode:  200,
				ExpectedBody:  `[{"id":"2935b117-880c-4f73-be89-de8fba6b196e","name":"DockerEasy","description":"stack of docker easy"}]`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Get("/", controllers.GetStacks)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"GET",
				test.Route,
				nil,
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Equalf(t, test.ExpectedBody, string(body), test.Description)
		}
	})

	suite.T().Run("GetStack", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "when the existingStackId exist it return the stack",
				Route:         "/stacks/" + existingStackId,
				ExpectedError: false,
				ExpectedCode:  200,
				ExpectedBody:  `{"id":"2935b117-880c-4f73-be89-de8fba6b196e","name":"DockerEasy","description":"stack of docker easy"}`,
			},
			{
				Description:   "when the existingStackId doesn't exist stack it returns an error message",
				Route:         "/stacks/" + "7cec5357-74ea-487e-ace1-1f2d6a8ddc4f",
				ExpectedError: false,
				ExpectedCode:  404,
				ExpectedBody:  `{"message":"Stack not found","status":"error"}`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Get("/:id", controllers.GetStack)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"GET",
				test.Route,
				nil,
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Equalf(t, test.ExpectedBody, string(body), test.Description)
		}
	})

	suite.T().Run("CreateStack", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "it creates a stack",
				Route:         "/stacks",
				Body:          `{"name":"Test stack","description":"stack test"}`,
				ExpectedError: false,
				ExpectedCode:  201,
				ExpectedBody:  `"name":"Test stack","description":"stack test"`,
			},
			{
				Description:   "when the body request is invalid it return an error message",
				Route:         "/stacks",
				Body:          `{"description":"stack test"}`,
				ExpectedError: false,
				ExpectedCode:  400,
				ExpectedBody:  `{"errors":[{"field":"StackCreateInput.Name","tag":"required"}],"status":"fail"}`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Post("/", controllers.CreateStack)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"POST",
				test.Route,
				strings.NewReader(test.Body),
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Contains(t, string(body), test.ExpectedBody, test.Description)
		}
	})

	suite.T().Run("UpdateStack", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "when the existingStackId exist it update stack",
				Route:         "/stacks/" + existingStackId,
				Body:          `{"name":"DockerEasy","description":"stack test"}`,
				ExpectedError: false,
				ExpectedCode:  200,
				ExpectedBody:  `{"id":"2935b117-880c-4f73-be89-de8fba6b196e","name":"DockerEasy","description":"stack test"}`,
			},
			{
				Description:   "when the body request is invalid it return an error message",
				Route:         "/stacks/" + existingStackId,
				Body:          `{"description":"stack test"}`,
				ExpectedError: false,
				ExpectedCode:  400,
				ExpectedBody:  `{"errors":[{"field":"StackUpdateInput.StackCreateInput.Name","tag":"required"}],"status":"fail"}`,
			},
			{
				Description:   "when stackId doesn't exist it return an error message",
				Route:         "/stacks/7cec5357-74ea-487e-ace1-1f2d6a8ddc4f",
				Body:          `{"name":"Test stack","description":"stack test"}`,
				ExpectedError: false,
				ExpectedCode:  404,
				ExpectedBody:  `{"status":"error","message":"Stack not found"}`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Put("/:id", controllers.UpdateStack)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"PUT",
				test.Route,
				strings.NewReader(test.Body),
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Equalf(t, test.ExpectedBody, string(body), test.Description)
		}
	})

	suite.T().Run("DuplicateStack", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "when the existingStackId exist it duplicate stack",
				Route:         "/stacks/" + existingStackId + "/duplicate",
				ExpectedError: false,
				ExpectedCode:  201,
				ExpectedBody:  `"name":"Copy of DockerEasy","description":"stack test"`,
			},
			{
				Description:   "when stackId doesn't exist it return an error message",
				Route:         "/stacks/" + "7cec5357-74ea-487e-ace1-1f2d6a8ddc4f" + "/duplicate",
				ExpectedError: false,
				ExpectedCode:  404,
				ExpectedBody:  `{"status":"error","message":"Stack not found"}`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Post("/:id/duplicate", controllers.DuplicateStack)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"POST",
				test.Route,
				strings.NewReader(test.Body),
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Contains(t, string(body), test.ExpectedBody, test.Description)
		}
	})

	suite.T().Run("DeleteStack", func(t *testing.T) {

		tests := []test_helpers.TestObject{
			{
				Description:   "when the existingStackId exist it delete stack",
				Route:         "/stacks/" + existingStackId,
				ExpectedError: false,
				ExpectedCode:  204,
				ExpectedBody:  ``,
			},
			{
				Description:   "when stackId doesn't exist it return an error message",
				Route:         "/stacks/7cec5357-74ea-487e-ace1-1f2d6a8ddc4f",
				ExpectedError: false,
				ExpectedCode:  404,
				ExpectedBody:  `{"status":"error","message":"Stack not found"}`,
			},
		}

		// Given
		app := fiber.New()
		stacks := app.Group("/stacks", middleware.DeserializeUser)
		stacks.Delete("/:id", controllers.DeleteStack)

		token := test_helpers.GetAuthTokenForTests(app, t)

		// Iterate through test single test cases
		for _, test := range tests {
			// Create a new http request with the route
			// When
			// from the test case
			req, errReq := http.NewRequest(
				"DELETE",
				test.Route,
				nil,
			)
			req.Header.Set("Content-Type", "application/json")
			req.Header.Set("Cookie", "token="+token)
			if errReq != nil {
				t.Fatal(errReq)
			}

			// Perform the request plain with the app.
			// The -1 disables request latency.
			res, err := app.Test(req, -1)

			// Then
			// verify that no error occured, that is not expected
			assert.Equalf(t, test.ExpectedError, err != nil, test.Description)

			// As expected errors lead to broken responses, the next
			// test case needs to be processed
			if test.ExpectedError {
				continue
			}

			// Verify if the status code is as expected
			assert.Equalf(t, test.ExpectedCode, res.StatusCode, test.Description)

			// Read the response body
			body, err := io.ReadAll(res.Body)

			// Reading the response body should work everytime, such that
			// the err variable should be nil
			assert.Nilf(t, err, test.Description)

			// Verify, that the reponse body equals the expected body
			assert.Equalf(t, test.ExpectedBody, string(body), test.Description)
		}
	})
}

func TestStackControllerTestSuite(t *testing.T) {
	suite.Run(t, new(StackControllerTestSuite))
}
