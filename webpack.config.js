module.exports = {
    target: "electron",
    entry: 
    {
        main: "./src/main.js",
        render: "./src/render/editor.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },  
    externals: {
        "ace": true
    }
};