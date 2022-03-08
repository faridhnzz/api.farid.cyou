import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';
import needle from 'needle';

export default async function (req, res) {
  try {
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
      const response = await needle('get', link, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
        },
      });
      const body = response.body;
      return body;
    }

    const TWICEKR = await getVideo(TWICEKRLink);
    const TWICEJP = await getVideo(TWICEJPLink);

    res.json({
      TWICEKR,
      TWICEJP,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
}
