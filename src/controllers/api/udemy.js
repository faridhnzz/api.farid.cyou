const { getMessages } = require('../../services/telegram');
const { json } = require('../../utils/respone');

module.exports = async (req, res, next) => {
  try {
    let { limit = '10' } = req.query;

    limit = parseInt(limit);

    if (limit > 50) {
      return res.status(400).json({ message: 'Max limit is 50' });
    }

    const messages = await getMessages('courseudemygratis', limit);

    const data = messages.map((d) => {
      const date = new Date(d.date * 1000);
      const m = d.message.split('\n\n');

      return {
        date: date.toLocaleDateString(),
        title: m[0],
        link: m[1].replace('Enroll Now : ', ''),
        category: m[2].slice(1),
      };
    });

    return json(res, data);
  } catch (error) {
    console.log(error);
    next();
  }
};
