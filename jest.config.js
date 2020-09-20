// jest.config.js
module.exports = {
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '@services/(.*)': '<rootDir>/src/services/$1',
        '@redux/(.*)': '<rootDir>/src/redux/$1',
        '@utils/(.*)': '<rootDir>/src/utils/$1',
    },
};
