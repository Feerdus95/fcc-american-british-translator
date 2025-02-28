const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

// Function to escape special characters in a string for use in a regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Translator {

  translateAndHighlight(strText, strLocale) {
    let strTranslated = '' + strText;

    if (strLocale === 'american-to-british') {
      // Translate American spelling differences and wrap in highlight span
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + americanToBritishSpelling[key] + '</span>');
      }

      // Translate American titles/honorifics and wrap in highlight span
      let keysTitles = Object.keys(americanToBritishTitles);
      for (let key of keysTitles) {
        let keyRegex = key.endsWith('.') ? key.slice(0, -1) : key;
        let regex = new RegExp('\\b' + escapeRegExp(keyRegex) + '\\.?(?=\\s|$|,)', 'gi');
        strTranslated = strTranslated.replace(regex, function(match) {
          let translation = americanToBritishTitles[key];
          if (match[0] === match[0].toUpperCase()) {
            translation = translation.charAt(0).toUpperCase() + translation.slice(1);
          }
          return '<span class="highlight">' + translation + '</span>';
        });
      }

      // Translate words that exist only in American English and wrap in highlight span
      let keysOnly = Object.keys(americanOnly);
      for (let key of keysOnly) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + americanOnly[key] + '</span>');
      }

      // Format time (e.g., "10:30" becomes "10.30") and wrap in highlight span
      let timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
      strTranslated = strTranslated.replace(timeRegex, '<span class="highlight">$1.$2</span>');

    }

    if (strLocale === 'british-to-american') {
      // First, translate spelling differences (reverse of American-to-British)
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('\\b' + escapeRegExp(americanToBritishSpelling[key]) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + key + '</span>');
      }

      // Then, translate titles/honorifics (allowing an optional dot)
      let keysTitles = Object.keys(americanToBritishTitles);
      for (let key of keysTitles) {
        let keyRegex = key.endsWith('.') ? key.slice(0, -1) : key;
        let regex = new RegExp('\\b' + escapeRegExp(americanToBritishTitles[key]) + '\\.?(?=\\s|$|,)', 'gi');
        strTranslated = strTranslated.replace(regex, function(match) {
          let translation = key;
          if (match[0] === match[0].toUpperCase()) {
            translation = translation.charAt(0).toUpperCase() + translation.slice(1);
          }
          return '<span class="highlight">' + translation + '</span>';
        });
      }

      // Finally, translate words that exist only in British English
      let keysOnly = Object.keys(britishOnly);
      keysOnly.sort((a, b) => b.length - a.length);
      for (let key of keysOnly) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, '<span class="highlight">' + britishOnly[key] + '</span>');
      }

      // Format time (e.g., "10.30" becomes "10:30") and wrap in highlight span
      let timeRegex = /([0-9]{1,2})\.([0-9]{2})/g;
      strTranslated = strTranslated.replace(timeRegex, '<span class="highlight">$1:$2</span>');
    }

    return strTranslated;
  }

  translate(strText, strLocale) {
    let strTranslated = '' + strText;

    if (strLocale === 'american-to-british') {
      // Translate American spelling differences
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, americanToBritishSpelling[key]);
      }

      // Translate American titles/honorifics (allowing an optional dot)
      let keysTitles = Object.keys(americanToBritishTitles);
      for (let key of keysTitles) {
        let keyRegex = key.endsWith('.') ? key.slice(0, -1) : key;
        let regex = new RegExp('\\b' + escapeRegExp(keyRegex) + '\\.?(?=\\s|$|,)', 'gi');
        strTranslated = strTranslated.replace(regex, function(match) {
          let translation = americanToBritishTitles[key];
          if (match[0] === match[0].toUpperCase()) {
            translation = translation.charAt(0).toUpperCase() + translation.slice(1);
          }
          return translation;
        });
      }

      // Translate words that exist only in American English
      let keysOnly = Object.keys(americanOnly);
      for (let key of keysOnly) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, americanOnly[key]);
      }

      // Format time (e.g., "10:30" becomes "10.30")
      let timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
      strTranslated = strTranslated.replace(timeRegex, '$1.$2');
    }

    if (strLocale === 'british-to-american') {
      // First, translate spelling differences
      let keys = Object.keys(americanToBritishSpelling);
      for (let key of keys) {
        let regex = new RegExp('\\b' + escapeRegExp(americanToBritishSpelling[key]) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, key);
      }

      // Then, translate titles/honorifics (allowing an optional dot)
      let keysTitles = Object.keys(americanToBritishTitles);
      for (let key of keysTitles) {
        let keyRegex = key.endsWith('.') ? key.slice(0, -1) : key;
        let regex = new RegExp('\\b' + escapeRegExp(americanToBritishTitles[key]) + '\\.?(?=\\s|$|,)', 'gi');
        strTranslated = strTranslated.replace(regex, function(match) {
          let translation = key;
          if (match[0] === match[0].toUpperCase()) {
            translation = translation.charAt(0).toUpperCase() + translation.slice(1);
          }
          return translation;
        });
      }

      // Finally, translate words that exist only in British English
      let keysOnly = Object.keys(britishOnly);
      keysOnly.sort((a, b) => b.length - a.length);
      for (let key of keysOnly) {
        let regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi');
        strTranslated = strTranslated.replace(regex, britishOnly[key]);
      }

      // Format time (e.g., "10.30" becomes "10:30")
      let timeRegex = /([0-9]{1,2})\.([0-9]{2})/g;
      strTranslated = strTranslated.replace(timeRegex, '$1:$2');
    }

    return strTranslated;
  }

  // Wrapper methods required by the tests
  toBritish(text) {
    return this.translate(text, 'american-to-british');
  }

  toAmerican(text) {
    return this.translate(text, 'british-to-american');
  }

  toBritishHighlight(text) {
    return this.translateAndHighlight(text, 'american-to-british');
  }

  toAmericanHighlight(text) {
    return this.translateAndHighlight(text, 'british-to-american');
  }
}

module.exports = Translator;