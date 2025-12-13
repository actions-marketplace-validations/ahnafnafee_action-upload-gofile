const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["dist/"],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.commonjs,
                ...globals.es6,
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },
        },
        rules: {
            "no-unused-vars": [
                "warn",
                { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
            ],
        },
    },
];
