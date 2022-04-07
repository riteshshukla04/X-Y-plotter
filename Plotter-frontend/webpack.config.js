var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry : __dirname + '/app/index.js',
    module: {
         rules: [{ 
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            } 
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/dist'
    },
    plugins: [
        HTMLWebpackPluginConfig
    ]
}