module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        // "plugin:vue/vue3-essential",
        'plugin:vue/vue3-recommended',
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
    ],
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "vue/script-indent": ["error", 2, {
            "baseIndent": 1,
            "switchCase": 0,
            "ignores": []
        }],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "always",
                "component": "never"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/multi-word-component-names": ["error", {
            ignores: ['index'], // 忽略 view 页面文件夹中的 index 页面和 组件中的index
        }]
    },
    "overrides": [
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]
};
