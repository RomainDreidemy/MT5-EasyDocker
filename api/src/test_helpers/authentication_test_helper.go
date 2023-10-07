package test_helpers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers"
	"github.com/gofiber/fiber/v2"
	"net/http"
	"strings"
	"testing"
)

func GetAuthTokenForTests(app *fiber.App, t *testing.T) string {

	auth := app.Group("/auth")
	auth.Post("/login", controllers.SignInUser)

	signInBody := `{"email":"test@example.net","password":"TestTest","remember":false}`
	signInReq, errReqUser := http.NewRequest(
		"POST",
		"/auth/login",
		strings.NewReader(signInBody),
	)
	signInReq.Header.Set("Content-Type", "application/json")
	if errReqUser != nil {
		t.Fatal(errReqUser)
	}
	resSignIn, _ := app.Test(signInReq, -1)
	token := resSignIn.Cookies()[0].Value

	return token
}
