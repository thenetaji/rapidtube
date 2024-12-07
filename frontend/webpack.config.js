import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackConfig = {
  /*mode: "development",
  stats: "verbose",
  devtool: "eval-source-map",*/
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "src", "scripts", "index.js"),
    loading: path.resolve(__dirname, "src", "scripts", "loading.js"),
    result: path.resolve(__dirname, "src", "scripts", "render-result.js"),
  },
  output: {
    filename: "scripts/[name]-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      scriptLoading: "defer",
      inject: true,
      chunks: ["index"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src", "pages"),
          to: path.resolve(__dirname, "dist", "pages"),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 5173,
  },
};

export default webpackConfig;
