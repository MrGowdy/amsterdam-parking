import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

const isProd = process.env.NODE_ENV === 'production';

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: isProd ? '/amsterdam-parking/' : '/',
    },
  ],
  plugins: [
    sass()
  ],
};