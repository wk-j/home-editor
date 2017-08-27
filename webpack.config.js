var CopyWebpackPlugin =  require("copy-webpack-plugin")

module.exports = {
    target: "electron",
    devtool: "source-map",
    entry: 
    {
        main: "./src/main.js",
        render: "./src/render/editor.jsx"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },  
    plugins: [
        new CopyWebpackPlugin([{
            from: "src/index.html",
            to : "index.html"
        }])
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        "ace": true
    }
};