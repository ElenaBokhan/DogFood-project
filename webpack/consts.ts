const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const hash = isProd ? '.[contenthash]' : '';

const filename = (ext, folderName) => `static/${folderName}/[name]${hash}.${ext}`;

module.exports = {isProd, filename};