const path = require("path");

module.exports = (env) => {
  const isDevelopment = env.isDevelopment == 'true' ? true : false;

  return {
    mode: "production",
    entry: "./src/index.js",
    watchOptions: {
      ignored: /node_modules/,
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
                importLoaders: 1,
                modules: {
                  localIdentName: "[path][name]__[local]",
                },
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
  };
};
