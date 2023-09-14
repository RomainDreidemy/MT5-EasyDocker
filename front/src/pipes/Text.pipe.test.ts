import { expect, test } from 'vitest'
import TextPipe from './Text.pipe'

test('should be possible to capitalize a first letter', async () => {
  const initial: string = 'capitalize'
  const expected: string = 'Capitalize'

  const result = TextPipe.capitalizeFirstLetter(initial)

  expect(result).not.toStrictEqual(initial)
  expect(result).toStrictEqual(expected)
})
