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

      // Determine if highlighting is needed based on test requirements
      const highlight = req.query.highlight === 'true';

      const translation = locale === 'american-to-british' 
        ? (highlight ? translator.toBritishHighlight(text) : translator.toBritish(text))
        : (highlight ? translator.toAmericanHighlight(text) : translator.toAmerican(text));

      res.json({
        text,
        translation: translation === text ? "Everything looks good to me!" : translation
      });
    });
};