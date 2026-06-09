/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Limpa os mocks automaticamente entre um teste e outro
  clearMocks: true,
  // Diz ao Jest que os arquivos estão dentro de src
  roots: ['<rootDir>/src'],
  // Diz ao Jest para procurar arquivos que terminem com .spec.ts ou .test.ts
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};