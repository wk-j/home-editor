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
            { test: /\.css$/, loader: "style!css" }
        ]
    },  
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        "ace": true
    }
};