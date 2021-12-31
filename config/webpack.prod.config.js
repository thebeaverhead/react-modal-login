const path = require("path");
const webpack = require("webpack");
const paths = require("./paths");

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: "production",
    entry: "./src/react-modal-login.js",
    output: {
      path: paths.appBuild,
      filename: "react-modal-login.js",
      libraryTarget: "commonjs2",
      publicPath: paths.publicUrlOrPath,
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides'
            ),
            presets: [
              '@babel/env',
              '@babel/preset-react',
              [

                require.resolve('babel-preset-react-app'),
                {
                  runtime: 'automatic',
                },
              ],
            ],


            compact: false//isEnvProduction,
          },
        },
      ],
    },
    plugins: [

      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      }),
    ],
    externals: {
      react: "commonjs react",
    },
  };
};
