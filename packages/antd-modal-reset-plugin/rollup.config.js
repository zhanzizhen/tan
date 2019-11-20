import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "lib/index.js",
      format: "cjs"
    },
    {
      file: "es/index.js",
      format: "esm"
    }
  ],
  plugins: [
    resolve({ extensions: [".ts", ".js", ".jsx", ".tsx"] }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    commonjs()
  ],
  external: ["react"]
};
