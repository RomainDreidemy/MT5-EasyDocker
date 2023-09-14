import { expect, test } from 'vitest'
import WindowApp from './Window.app'
import { type ISize } from '../../interfaces/Window.interface'

test('should be possible to get window size', async () => {
  const result: ISize = WindowApp.dimensions()

  expect(result).toBeDefined()
})
