const translate = require('@iamtraction/google-translate');
const { json } = require('../../utils/respone');

module.exports = async (req, res, next) => {
  try {
    const input_text = req.query.text;
    let to_lang = req.query.to;

    if (input_text == null || input_text == '' || input_text == undefined) {
      return res.status(404).json({ message: 'Text query cannot be empty' });
    }

    if (to_lang == null || to_lang == '' || to_lang == undefined) {
      to_lang = 'en';
    }

    let result = await translate(`${input_text}`, { to: to_lang });
    return json(res, {
      from_language: result.from.language.iso,
      to_language: to_lang || 'en',
      result: result.text,
    });
  } catch (error) {
    next(error);
  }
};
