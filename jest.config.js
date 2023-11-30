//@type {import('@jest/types').Config.InitialOptions}

module.exports = {
    verbose: true,
    preset: 'jest-playwright-preset',
    transform: {
        '^.+\\.ts$': 'ts-jest'
      },
      testRunner: "jasmine2",
      setupFilesAfterEnv: ["jest-allure/dist/setup"],
     // testMatch: ["<rootDir>/test/**.ts"],   //launch [] of tests
     // bail: true,                            // при ошибке в дескрайб блоке скипает др дескрайбы
     // bail: 1
}