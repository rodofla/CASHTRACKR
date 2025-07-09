const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  forceExit: true,
  detectOpenHandles: true,
  openHandlesTimeout: 20 * 1000, // 20 seconds
  testTimeout: 20 * 1000, // 15 seconds
};
