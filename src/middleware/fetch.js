import axios from 'axios';
import UserAgent from 'user-agents';

const getUserAgent = new UserAgent({ deviceCategory: 'desktop' });
const id = getUserAgent.data.userAgent;
console.log('User-Agent : ', id);

axios.defaults.headers.common['User-Agent'] = `${id}`;

// Fetch Get
export async function get(url, _headers = {}) {
  try {
    const result = await axios({
      method: 'get',
      url: url,
      headers: _headers,
    });

    const data = result.data;
    const headers = result.headers;
    const status = result.status;

    // console.log(result);
    return { data, headers, status };
  } catch (err) {}
}

// Fetch Post
export async function post(url) {
  try {
    const result = await axios({
      method: 'post',
      url: url,
    });

    const data = result.data;
    const headers = result.headers;
    return { data, headers };
  } catch (err) {}
}
