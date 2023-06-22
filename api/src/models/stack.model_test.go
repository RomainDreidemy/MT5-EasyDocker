package models

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"testing"
)

func TestStackCreateInput(t *testing.T) {
	t.Run("Name should be required", func(t *testing.T) {
		stack := StackCreateInput{Name: ""}
		helpers.AsserNotValidation(t, stack)
	})
	t.Run("Name should be at least 3 characters", func(t *testing.T) {
		stack := StackCreateInput{Name: "ab"}
		helpers.AsserNotValidation(t, stack)
	})
	t.Run("Stack should be valid when name at least 3 characters", func(t *testing.T) {
		stack := StackCreateInput{Name: "abc"}
		helpers.AssertValidation(t, stack)
	})
}
