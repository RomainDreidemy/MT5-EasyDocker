package test_helpers

import (
	"github.com/RomainDreidemy/MT5-docker-extension/src/helpers"
	"testing"
)

func AsserNotValidation(t *testing.T, model interface{}) {
	t.Helper()
	err := helpers.ValidateStruct(model)
	if err == nil {
		t.Errorf("Expected error, got nil")
	}
}

func AssertValidation(t *testing.T, model interface{}) {
	t.Helper()
	err := helpers.ValidateStruct(model)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
}
