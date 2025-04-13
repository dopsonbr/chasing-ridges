/* eslint-disable */
module.exports = async function() {
  // Stop the API server
  console.log('\nTearing down...\n');
  const apiProcess = (global as any).__API_PROCESS__;
  if (apiProcess) {
    apiProcess.kill();
  }
};
