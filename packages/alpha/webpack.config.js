const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// prettier-ignore
const PATHS = {
    index:   path.resolve('src', 'index.ts'),
    assets:  path.resolve('src', 'assets.ts'),
    dist:    path.resolve('dist'),
};

module.exports = () => {
    return {
        mode: 'development',

        devtool: 'eval-source-map',

        devServer: {
            host: '0.0.0.0',
            liveReload: true,
            hot: false,
            port: 8080,
            devMiddleware: { stats: { all: false, errors: true, colors: true, timings: true, performance: true } },
            client: { logging: 'error', overlay: { errors: true } },
        },

        entry: {
            assets: {
                import: [PATHS.assets],
            },
            app: {
                import: [PATHS.index],
                dependOn: 'assets',
            },
        },

        output: {
            path: PATHS.dist,
            filename: '[name].js',
            clean: true,
        },

        resolve: {
            extensions: ['.ts', '.js', '.jsx', '.tsx'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve('html', 'index.html'),
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'esbuild-loader',
                    exclude: /node_modules/,
                    options: {
                        target: 'esnext',
                    },
                },
                {
                    test: /\.(s[ac]ss|css)$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.((jpeg|jpg|png)|(mp3|ogg|wav)|(woff|woff2)|(gltf|glb))$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[path][name][ext]',
                    },
                },
                {
                    test: /\.((glsl))$/,
                    type: 'asset/source',
                    generator: {
                        filename: '[path][name][ext]',
                    },
                },
            ],
        },
    };
};
