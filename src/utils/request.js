import superagent from 'superagent';
import * as object from 'utils/object';

const makeRequest = (type) => (url, opts) => {
  const finalOpts = opts || {};
  const request = superagent[type](url);
  if (!object.isEmpty(finalOpts.params)) {
    request.query(finalOpts.params);
  }
  if (!object.isEmpty(finalOpts.data)) {
    request.send(finalOpts.data);
  }
  return new Promise((resolve, reject) => {
    request.end((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  get: makeRequest('get'),
  post: makeRequest('post'),
  put: makeRequest('put'),
  delete: makeRequest('delete')
};
