/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  // preset: 'ts-jest',
  // testEnvironment: 'node',  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  
  }
};