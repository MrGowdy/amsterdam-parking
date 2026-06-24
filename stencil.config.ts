import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

const baseUrl =
  process.env.BASE_PATH ||
  process.env.npm_config_BASE_PATH ||
  '/';

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl,
    },
  ],
  plugins: [
    sass()
  ],
};