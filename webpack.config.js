let path = require("path");

module.exports = (env) => {
  const isDevelopment = env.isDevelopment == 'true' ? true : false;
  let mode = isDevelopment ? "development" : "production";

  return {
    mode: mode,
    entry: "./src/index.js",
    resolve: {
      alias: {
        Main: path.resolve(__dirname, 'src/controller/'),
        Utility: path.resolve(__dirname, 'src/utils/'),
        Components: path.resolve(__dirname, 'src/components/'),
        User: path.resolve(__dirname, 'src/user/'),
        Public: path.resolve(__dirname, 'public/'),
      }
    },
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
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
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
                  localIdentName: "[path]_:_[name]_-_[local]",
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
