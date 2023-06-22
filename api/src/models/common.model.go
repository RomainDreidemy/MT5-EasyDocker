package models

import "github.com/go-playground/validator/v10"

var validate = validator.New()

type ValidationErrorResponse struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value,omitempty"`
}

func ValidateStruct[T any](payload T) []*ValidationErrorResponse {
	var errors []*ValidationErrorResponse
	err := validate.Struct(payload)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ValidationErrorResponse
			element.Field = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
