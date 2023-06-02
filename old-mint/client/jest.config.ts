/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  // because is-absolute-url uses non-pure js syntax, need to override nextJest config
  // to transform that particular module (see https://github.com/vercel/next.js/issues/35634 )
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!is-absolute-url)';
  return nextJestConfig;
}

export default jestConfig;
