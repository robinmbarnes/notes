import superagent from 'superagent';

const makeRequest = (type) => (url, opts) => {
  const finalOpts = opts || {};
  const request = superagent[type](url);
  request.query(finalOpts.params || {});
  request.send(finalOpts.data || {});
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
