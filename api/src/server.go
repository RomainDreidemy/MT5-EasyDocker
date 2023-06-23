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
	"github.com/spf13/viper"
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
	frontUrl := viper.GetString("FRONT_URL")
	frontPort := viper.GetString("FRONT_PORT")

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     frontUrl + ", http://localhost, http://localhost:" + frontPort,
		AllowHeaders:     "Origin, Content-Type, Accept, X-Requested-With",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))
	app.Mount("/", micro)

	micro.Route("/auth", func(router fiber.Router) {
		router.Post("/register", controllers.SignUpUser)
		router.Post("/login", controllers.SignInUser)
	})

	users := micro.Group("/users", middleware.DeserializeUser)
	users.Get("/me", controllers.GetMe)

	stacks := micro.Group("/stacks", middleware.DeserializeUser)
	stacks.Get("/", controllers.GetStacks)
	stacks.Get("/:id", controllers.GetStack)
	stacks.Post("/", controllers.CreateStack)
	stacks.Put("/:id", controllers.UpdateStack)
	stacks.Delete("/:id", controllers.DeleteStack)

	stacks.Post("/:stackId/services", controllers.CreateService)
	stacks.Get("/:stackId/services", controllers.GetServices)

	service := micro.Group("/services", middleware.DeserializeUser)
	service.Get("/:id", controllers.GetService)
	service.Put("/:id", controllers.UpdateService)
	service.Delete("/:id", controllers.DeleteService)

	app.Get("/swagger/*", swagger.HandlerDefault)

	log.Fatal(app.Listen(":3000"))
}
