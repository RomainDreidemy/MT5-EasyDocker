package test_helpers

type TestObject struct {
	Description string

	// Test input
	Route string
	Body  string

	// Expected output
	ExpectedError bool
	ExpectedCode  int
	ExpectedBody  string
}
