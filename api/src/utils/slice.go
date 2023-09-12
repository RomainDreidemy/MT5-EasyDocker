package utils

func Any[T interface{}](slice []T, predicate func(T) bool) bool {
	for _, element := range slice {
		if predicate(element) {
			return true
		}
	}

	return false
}
