export default {
  '*.{js,ts,jsx,tsx}': ['npm run format --', 'npm run lint:fix --'],
  '*.{json,css,md}': 'npm run format --',
}
