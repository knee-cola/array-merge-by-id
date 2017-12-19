const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcDir = './lib/';
const destDir = path.resolve(__dirname + '/dist/');

module.exports = {
    entry: {
        "index": srcDir+"index.ts",
    },
    output: {
        path: destDir,
        filename: 'index.js',
        library: 'array-merge-by-id',
        libraryTarget: 'umd'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devtool: 'source-map',

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                    "ts-loader"
                ]
            }
        ]
    },
    externals: {
        'lodash': 'lodash'
    },
    plugins: [
        new CleanWebpackPlugin(destDir)
    ]
};