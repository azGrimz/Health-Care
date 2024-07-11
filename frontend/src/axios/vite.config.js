import ViteEnvPlugin from 'vite-plugin-env';

export default {
  plugins: [
    ViteEnvPlugin({
      dotenv: true,
      systemvars: true,
    }),
  ],
};