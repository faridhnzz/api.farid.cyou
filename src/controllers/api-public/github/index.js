import * as fetch from '../../../middleware/fetch.js';
import * as redis from '../../../service/redis.js';
import { json, indexJson, errorJson } from '../../../utils/respone.js';

export async function index(req, res, next) {
  return indexJson(res, '/github/:username');
}

export async function github(req, res, next) {
  try {
    const { username } = req.params;
    const cacheKey = `api_github_uname_${username}`.toUpperCase();
    const cacheValue = await redis.get(cacheKey);

    if (cacheValue) {
      console.log('From Cache');
      return json(res, cacheValue);
    } else {
      const URL = `https://luminabot.xyz/api/json/github?username=${encodeURIComponent(username)}`;
      const { data } = await fetch.get(URL);

      if (data.error === 'User not found') {
        return errorJson(res, 'User not found');
      }

      const user = {
        account_type: data.account_type,
        url: data.url,
        avatar: data.avatar,
        name: data.name,
        bio: data.bio,
        company: data.company,
        website: data.blog,
        email: data.email,
        twitter: data.twitter,
        location: data.location,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      // Set cache for 3 min
      redis.set(cacheKey, user, 300);
      return json(res, user);
    }
  } catch (err) {
    console.log(err);
  }
}
