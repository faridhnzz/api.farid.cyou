import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';
import * as fetch from '../../../middleware/fetch.js';
import * as redis from '../../../service/redis.js';
import { json, indexJson, errorJson } from '../../../utils/respone.js';

export async function tiktok(req, res) {
  try {
    const getClientIP = req.clientIp;
    const cacheKey = `api_tiktok_id_${getClientIP}`.toUpperCase();
    const cacheValue = await redis.get(cacheKey);

    if (cacheValue) {
      return json(res, cacheValue);
    } else {
      async function getBrowserInstance() {
        const executablePath = await chromium.executablePath;

        if (!executablePath) {
          return puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true,
          });
        }

        const functionReturn = await chromium.puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });

        return functionReturn;
      }

      const browser = await getBrowserInstance();
      const page = await browser.newPage();

      async function getLastVideo(url) {
        await page.goto(url);
        const links = await page.$$eval('.esz6wny0 .e1z53d07:first-child .e1u9v4ua1 a', (link) => link.map((a) => a.href));
        return links[0];
      }

      const TWICEKRLink = await getLastVideo('https://www.tiktok.com/@twice_tiktok_official');
      const TWICEJPLink = await getLastVideo('https://www.tiktok.com/@twice_tiktok_officialjp');

      await browser.close();

      async function getVideo(url) {
        const videoID = url.split('/')[5];
        const link = `https://www.tiktok.com/node/share/video/@twice_tiktok_official/${videoID}`;

        const result = await fetch.get(link);
        const body = result.data;
        return body;
      }

      const TWICEKR = await getVideo(TWICEKRLink);
      const TWICEJP = await getVideo(TWICEJPLink);
      const data = { TWICEKR, TWICEJP };

      redis.set(cacheKey, data);
      return json(res, data);
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
}
