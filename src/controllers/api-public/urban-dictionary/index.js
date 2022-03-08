import { get } from '../../../middleware/fetch.js';
import { json, indexJson } from '../../../utils/respone.js';

export async function index(req, res, next) {
  return indexJson(res, '/urban/:search');
}

export async function urbanDir(req, res, next) {
  try {
    const { search } = req.params;

    const URL = `https://api.urbandictionary.com/v0/define?term=${search.toLowerCase()}`;
    const { data } = await get(URL);

    return json(res, data);
  } catch (err) {}
}
