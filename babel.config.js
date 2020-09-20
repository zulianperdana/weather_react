module.exports = {
    plugins: ['@babel/plugin-transform-react-jsx', 'babel-plugin-styled-components'],
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};
