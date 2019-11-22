const config = require('./jest.config');
config.testMatch = [
    "**/tests/**/*.integration.[tj]s?(x)"
];
module.exports = config;