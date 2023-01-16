export default {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  
    roots: ["<rootDir>/src"],
  
    testMatch: ["**/src/routes/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[tj]s?(x)"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
};