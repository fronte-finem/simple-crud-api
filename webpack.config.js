import { resolve } from 'path';
import { fileURLToPath } from 'url';

const isProduction = process.env.NODE_ENV === 'production';

const DIST = 'dist';
const PATH_TO_DIST = resolve(fileURLToPath(import.meta.url), '..', DIST);

const config = {
  target: 'node16.13', // Nodejs 16.13.0 LTS
  entry: './src/index.js',
  output: {
    clean: true,
    path: PATH_TO_DIST,
    filename: 'bundle.js',
    module: true,
  },
  experiments: {
    outputModule: true,
  },
};

export default () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
