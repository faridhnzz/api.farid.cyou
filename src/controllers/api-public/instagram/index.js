import * as fetch from '../../../middleware/fetch.js';
import { json, indexJson, errorJson } from '../../../utils/respone.js';

export async function index(req, res, next) {
  return indexJson(res, '/instagram/:username');
}

export async function instagram(req, res, next) {
  try {
    const { username } = req.params;

    const URL = `https://www.instagram.com/${encodeURIComponent(username)}/?__a=1`;
    const { data } = await fetch.get(URL, { Referer: 'https://www.instagram.com/' });

    const value = data.graphql.user;
    const user = {
      id: value.id,
      username: value.username,
      name: value.full_name,
      profile_pic: {
        default: value.profile_pic_url,
        original: value.profile_pic_url_hd,
      },
      bio: value.biography,
      private: value.is_private,
      verified: value.is_verified,
      website: value.external_url,
      followers: value.edge_followed_by.count,
      following: value.edge_follow.count,
      posts: value.edge_owner_to_timeline_media.count,
    };

    return json(res, user);
  } catch (err) {
    console.log(err);
    next();
    return errorJson(res, 'User not found');
  }
}
