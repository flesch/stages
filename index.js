const { mediaTypes } = require('accept');

module.exports = (accept = '', pattern = /application\/vnd\..*\.(.*)\+json/) => {
  return mediaTypes(accept).reduce((stages, mediaType) => {
    const [match, stage] = mediaType.match(pattern) || [];
    return match ? [...stages, stage] : stages;
  }, []);
};
