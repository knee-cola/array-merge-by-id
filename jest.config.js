module.exports = {
    "name": "array-merge-by-id",
    "verbose": true,
    "testRegex": "/test/.*\\.spec\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "transform": {
        "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    }
};