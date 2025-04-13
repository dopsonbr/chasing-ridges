/* eslint-disable */
import { spawn, ChildProcess } from 'child_process';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';
let apiProcess: ChildProcess;

async function waitForApi() {
  let retries = 30;
  while (retries > 0) {
    try {
      await axios.get(`${API_URL}/api/products`);
      return true;
    } catch (error) {
      retries--;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('API failed to start');
}

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  // Start the API server
  apiProcess = spawn('node', ['dist/apps/products-api/main.js'], {
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' }
  });

  // Store the process for teardown
  (global as any).__API_PROCESS__ = apiProcess;
  
  // Wait for API to be ready
  await waitForApi();
  console.log('API is ready');
};
