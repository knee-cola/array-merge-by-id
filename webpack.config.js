const path = require('path');

const srcDir = './lib/';
const destDir = 'dist';

module.exports = {
    entry: {
        "index": srcDir+"index.ts",
    },
    output: {
        path: path.resolve(__dirname + '/' + destDir),
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
    }
};