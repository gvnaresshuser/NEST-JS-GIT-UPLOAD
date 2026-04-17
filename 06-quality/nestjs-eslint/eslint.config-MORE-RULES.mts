import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
//import importPlugin from 'eslint-plugin-import';

console.log('ESLint config loaded');

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier,
      //import: importPlugin, 
    },
    rules: {
      'prettier/prettier': 'error',

      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',

      // 🔥 IF-ELSE FORMATTING RULES
      curly: ['error', 'all'],                 // enforce {} for all if/else
      'brace-style': ['error', '1tbs'],        // else on same line
      'no-lonely-if': 'error',                 // avoid nested if inside else
      'nonblock-statement-body-position': ['error', 'beside'], // clean alignment

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      'no-throw-literal': 'error',

      // General
      'consistent-return': 'error',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
]);
