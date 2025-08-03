import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unescaped entities errors
      "react/no-unescaped-entities": "off",
      // Allow some any types for now
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused vars for now (will fix incrementally)
      "@typescript-eslint/no-unused-vars": "warn",
      // Treat img element warnings as warnings not errors
      "@next/next/no-img-element": "warn"
    },
    ignorePatterns: ["public/**/*", "node_modules/**/*"]
  }
];

export default eslintConfig;
