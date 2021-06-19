import { TIMEOUT, TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce33'
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
