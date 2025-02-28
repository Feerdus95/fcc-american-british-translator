const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  toBritish(text) {
    let translation = text;

    // Convert American titles to British first to handle periods
     for (let title in americanToBritishTitles) {
        const regex = new RegExp(`(?<!\\w)${title.replace(/\./g, '\\.')}(?!\\w)`, 'gi');
        translation = translation.replace(regex, (match) => {
        const replacement = americanToBritishTitles[title];
        // If the first letter of the match is uppercase, capitalize the replacement's first letter.
        return match[0] === match[0].toUpperCase()
        ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
        : replacement;
        });
    }

    // Convert American words/phrases to British
    for (let word in americanOnly) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      translation = translation.replace(regex, americanOnly[word]);
    }

    // Convert American spellings to British
    for (let word in americanToBritishSpelling) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      translation = translation.replace(regex, americanToBritishSpelling[word]);
    }

    // Convert time format from 12:15 to 12.15
    translation = translation.replace(/([0-9]{1,2}):([0-9]{2})/g, '$1.$2');

    return translation === text ? text : translation;
  }

  toAmerican(text) {
    let translation = text;

    // Convert British titles to American first
     for (let title in americanToBritishTitles) {
        const britishTitle = americanToBritishTitles[title];
        const regex = new RegExp(`(?<!\\w)${britishTitle}(?!\\w)`, 'gi');
        translation = translation.replace(regex, (match) => {
        // If the first letter of the match is uppercase, capitalize the American title accordingly.
        return match[0] === match[0].toUpperCase()
        ? title.charAt(0).toUpperCase() + title.slice(1)
        : title;
        });
    }

    // Convert British words/phrases to American
    const sortedBritishWords = Object.keys(britishOnly).sort((a, b) => b.length - a.length);
    for (let word of sortedBritishWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      translation = translation.replace(regex, britishOnly[word]);
    }

    // Convert British spellings to American
    for (let word in americanToBritishSpelling) {
      const britishWord = americanToBritishSpelling[word];
      const regex = new RegExp(`\\b${britishWord}\\b`, 'gi');
      translation = translation.replace(regex, word);
    }

    // Convert time format from 12.15 to 12:15
    translation = translation.replace(/([0-9]{1,2})\.([0-9]{2})/g, '$1:$2');

    return translation === text ? text : translation;
  }

  toBritishHighlight(text) {
    let translation = text;
    let changes = [];

    // Track American titles first
    for (let title in americanToBritishTitles) {
      const regex = new RegExp(`(?<!\\w)${title.replace(/\./g, '\\.')}(?!\\w)`, 'g');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: americanToBritishTitles[title] });
      }
    }

    // Track American words/phrases
    for (let word in americanOnly) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: americanOnly[word] });
      }
    }

    // Track American spellings
    for (let word in americanToBritishSpelling) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: americanToBritishSpelling[word] });
      }
    }

    // Track time format changes
    const timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
    let match;
    while ((match = timeRegex.exec(translation)) !== null) {
      changes.push({ from: match[0], to: match[0].replace(':', '.') });
    }

    // Apply all changes with highlighting
    for (let change of changes) {
      const regex = new RegExp(change.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      translation = translation.replace(regex, `<span class="highlight">${change.to}</span>`);
    }

    return translation === text ? text : translation;
  }

  toAmericanHighlight(text) {
    let translation = text;
    let changes = [];

    // Track British titles first
    for (let title in americanToBritishTitles) {
      const britishTitle = americanToBritishTitles[title];
      const regex = new RegExp(`(?<!\\w)${britishTitle}(?!\\w)`, 'g');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: title });
      }
    }

    // Track British words/phrases
    const sortedBritishWords = Object.keys(britishOnly).sort((a, b) => b.length - a.length);
    for (let word of sortedBritishWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: britishOnly[word] });
      }
    }

    // Track British spellings
    for (let word in americanToBritishSpelling) {
      const britishWord = americanToBritishSpelling[word];
      const regex = new RegExp(`\\b${britishWord}\\b`, 'gi');
      let match;
      while ((match = regex.exec(translation)) !== null) {
        changes.push({ from: match[0], to: word });
      }
    }

    // Track time format changes
    const timeRegex = /([0-9]{1,2})\.([0-9]{2})/g;
    let match;
    while ((match = timeRegex.exec(translation)) !== null) {
      changes.push({ from: match[0], to: match[0].replace('.', ':') });
    }

    // Apply all changes with highlighting
    for (let change of changes) {
      const regex = new RegExp(change.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      translation = translation.replace(regex, `<span class="highlight">${change.to}</span>`);
    }

    return translation === text ? text : translation;
  }
}

module.exports = Translator;