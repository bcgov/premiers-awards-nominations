import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to 'PA_APPS_' to load all PA web app env.
  const env = loadEnv(mode, process.cwd(), 'PA_APPS_');
  console.log(env)
  return {
    envPrefix: 'PA_APPS_',
    plugins: [vue()],
    base: env.PA_APPS_ADMIN_BASE,
    define: `{"PA_APPS_API_URL": "${env.PA_APPS_API_URL}"}`,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});