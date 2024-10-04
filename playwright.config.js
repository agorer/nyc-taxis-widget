import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'test/e2e',
  use: {
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:8080',
  },
})
