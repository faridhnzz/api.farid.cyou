import * as fetch from '../../../middleware/fetch.js';
import * as redis from '../../../service/redis.js';
import { json, indexJson, errorJson } from '../../../utils/respone.js';

export async function index(req, res, next) {
  return indexJson(res, 'NONE');
}

export async function vlive(req, res, next) {
  try {
    const URL =
      'https://www.vlive.tv/globalv-web/vam-web/post/v1.0/board-3484/videoPosts?appId=8c6cc7b45d2568fb668be6e05b6e5a3b&fields=board%7BboardId,title,excludedCountries%7D,contentType,createdAt,officialVideo,postId,thumbnail,url&sortType=LATEST&limit=1&gcc=ID&locale=en_US';
    const { data } = await fetch.get(URL, { referer: 'https://www.vlive.tv/channel/EDBF/board/3484' });

    const e = data.data;
    let postId, officialVideo;
    data.map((e) => {
      postId = e.postId;
      officialVideo = e.officialVideo;
    });
    console.log(postId, officialVideo);

    // return json(res, data.data);
  } catch (err) {
    console.log(err);
    next();
  }
}
