import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier"; // Добавляем плагин Prettier

export default [
  // Базовые правила ESLint
  js.configs.recommended,

  // Правила для TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd()
      }
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
    }
  },

  // Правила для React
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react: reactPlugin
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  },

  // React Hooks
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  },

  // Next.js правила
  {
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "error"
    }
  },

  // Глобальные переменные
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // Дополнительные правила + Prettier
  {
    plugins: {
      prettier: ["prettier"] // Регистрируем плагин Prettier
    },
    rules: {
      "no-console": "warn",
      "no-undef": "error",
    },
    ...prettierPlugin.configs.recommended
  }
];