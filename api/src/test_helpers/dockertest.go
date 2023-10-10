package test_helpers

import (
	"fmt"
	"github.com/RomainDreidemy/MT5-docker-extension/src/initializers"
	"github.com/RomainDreidemy/MT5-docker-extension/src/models"
	"github.com/golang-migrate/migrate/v4"
	migratePostgres "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/ory/dockertest/v3"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"time"
)

func IntegrationTestSetup() (*dockertest.Pool, *dockertest.Resource) {
	// uses a sensible default on windows (tcp/http) and linux/osx (socket)
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("Could not construct pool: %s", err)
	}

	// uses pool to try to connect to Docker
	err = pool.Client.Ping()
	if err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}

	// Pull an image, create a container based on it and set all necessary parameters
	opts := dockertest.RunOptions{
		Repository: "postgres",
		Tag:        "latest",
		Env: []string{
			"POSTGRES_PASSWORD=postgres_test_password",
			"POSTGRES_DB=postgres_test_db",
			"listen_addresses = '*'",
		},
	}

	// Run the Docker container
	resource, err := pool.RunWithOptions(&opts)
	if err != nil {
		log.Fatalf("Could not start resource: %s", err)
	}

	resource.Expire(120) // Tell docker to hard kill the container in 120 seconds

	postgresPort := resource.GetPort("5432/tcp")
	os.Setenv("POSTGRES_PORT", postgresPort)
	databaseUrl := fmt.Sprintf("postgresql://postgres:postgres_test_password@localhost:%s/postgres_test_db?sslmode=disable", postgresPort)

	// exponential backoff-retry, because the application in the container might not be ready to accept connections yet
	pool.MaxWait = 120 * time.Second

	// Exponential retry to connect to database while it is booting
	if err := pool.Retry(func() error {
		initializers.DB, err = gorm.Open(postgres.Open(databaseUrl), &gorm.Config{})
		if err != nil {
			log.Println("Database not ready yet (it is booting up, wait for a few tries)...")
			return err
		}

		db, err := initializers.DB.DB()
		if err != nil {
			return err
		}
		return db.Ping()

		// Tests if database is reachable
	}); err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}

	log.Println("Initialize test database...")
	initializers.DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
	err = initializers.DB.AutoMigrate(
		&models.User{},
		&models.Stack{},
		&models.Service{},
		&models.ServicePort{},
		&models.ServiceEnvVariable{},
		&models.ServiceVolume{},
		&models.Network{},
		&models.ServiceNetworkLink{},
	)
	if err != nil {
		log.Fatal("Migration of models Failed:  \n", err.Error())
	}

	// use gorm Generic database interface *sql.DB because .WithInstance take this type as param
	gormGenericDB, _ := initializers.DB.DB()

	driver, errDriver := migratePostgres.WithInstance(gormGenericDB, &migratePostgres.Config{})
	if errDriver != nil {
		log.Fatalf("could not init driver: %s", err)
	}

	dataMigration, errorMigrateData := migrate.NewWithDatabaseInstance("file://../test_helpers/migrations/", "postgres_test_db", driver)
	if errorMigrateData != nil {
		log.Fatalf("Error running migrations: %s", errorMigrateData)
	}
	err = dataMigration.Up()
	if err != nil {
		log.Fatal(err.Error())
	}

	return pool, resource
}

func IntegrationTestTeardown(pool *dockertest.Pool, resource *dockertest.Resource) {
	if err := pool.Purge(resource); err != nil {
		fmt.Printf("Could not purge resource: %s\n", err)
	}
}
