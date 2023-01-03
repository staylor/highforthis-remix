// This file is loaded by server.js, which is not compiled.

exports.uploadUrl = (destination, fileName) => {
  return `https://storage.googleapis.com/wonderboymusic/${destination}/${fileName}`;
};
