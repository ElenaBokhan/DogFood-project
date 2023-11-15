import {defineConfig} from 'cypress';

if (!process.env.APP_URL) throw new Error('Should set API_URL env ');

export default defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        supportFile: false,
        baseUrl: process.env.APP_URL,
    },
});
