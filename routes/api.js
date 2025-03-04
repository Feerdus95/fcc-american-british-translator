const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }
      
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      const translation = locale === 'american-to-british' 
        ? translator.toBritishHighlight(text)   // <-- Use the highlighted version
        : translator.toAmericanHighlight(text); // <-- Use the highlighted version

      res.json({
        text,
        translation: translation === text ? "Everything looks good to me!" : translation
      });
    });
};
