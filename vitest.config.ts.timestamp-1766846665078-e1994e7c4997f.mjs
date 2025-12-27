// vitest.config.ts
import { defineConfig } from "file:///D:/Codebox/__NPM__/StrKit/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/**/*.test.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    },
    typecheck: {
      tsconfig: "./tsconfig.test.json"
    }
  },
  esbuild: {
    target: "es2020"
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXENvZGVib3hcXFxcX19OUE1fX1xcXFxTdHJLaXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENvZGVib3hcXFxcX19OUE1fX1xcXFxTdHJLaXRcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ29kZWJveC9fX05QTV9fL1N0cktpdC92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnbm9kZScsXG4gICAgaW5jbHVkZTogWyd0ZXN0cy8qKi8qLnRlc3QudHMnXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCddLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cyddLFxuICAgICAgZXhjbHVkZTogWydzcmMvKiovKi5kLnRzJywgJ3NyYy8qKi8qLnRlc3QudHMnXSxcbiAgICAgIHRocmVzaG9sZHM6IHtcbiAgICAgICAgbGluZXM6IDEwMCxcbiAgICAgICAgZnVuY3Rpb25zOiAxMDAsXG4gICAgICAgIGJyYW5jaGVzOiAxMDAsXG4gICAgICAgIHN0YXRlbWVudHM6IDEwMCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0eXBlY2hlY2s6IHtcbiAgICAgIHRzY29uZmlnOiAnLi90c2NvbmZpZy50ZXN0Lmpzb24nLFxuICAgIH0sXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlRLFNBQVMsb0JBQW9CO0FBRXRTLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxJQUM5QixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxNQUNqQyxTQUFTLENBQUMsYUFBYTtBQUFBLE1BQ3ZCLFNBQVMsQ0FBQyxpQkFBaUIsa0JBQWtCO0FBQUEsTUFDN0MsWUFBWTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBLFFBQ1YsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
