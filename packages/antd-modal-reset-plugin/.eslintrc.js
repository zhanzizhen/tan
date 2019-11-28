const eslintrc = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  parser: 'babel-eslint',
  plugins: ['react'],
};

module.exports = eslintrc;
