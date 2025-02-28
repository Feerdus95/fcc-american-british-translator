'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // Check for missing fields
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Check for empty text
      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      // Check for valid locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Perform translation
      let translation;
      if (locale === 'american-to-british') {
        translation = translator.toBritish(text);
      } else {
        translation = translator.toAmerican(text);
      }

      // Return result
      return res.json({
        text,
        translation: translation === text ? 'Everything looks good to me!' : translation
      });
    });
};
