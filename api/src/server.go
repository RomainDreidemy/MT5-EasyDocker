package main

import (
	_ "github.com/RomainDreidemy/MT5-docker-extension/docs"
	"github.com/RomainDreidemy/MT5-docker-extension/src/controllers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	middleware "github.com/RomainDreidemy/MT5-docker-extension/src/middlewares"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"log"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	initializers.ConnectDB(&config)
}

// @title EasyDocker API
// @BasePath /
func main() {
	app := fiber.New()
	micro := fiber.New()

	app.Mount("/", micro)
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	micro.Route("/auth", func(router fiber.Router) {
		router.Post("/register", controllers.SignUpUser)
		router.Post("/login", controllers.SignInUser)
	})

	users := micro.Group("/users", middleware.DeserializeUser)
	users.Get("/me", controllers.GetMe)

	stacks := micro.Group("/stacks", middleware.DeserializeUser)
	stacks.Get("/", controllers.GetStacks)
	stacks.Post("/", controllers.CreateStack)
	stacks.Put("/:id", controllers.UpdateStack)

	app.Get("/swagger/*", swagger.HandlerDefault)

	log.Fatal(app.Listen(":3000"))
}
