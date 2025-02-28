const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  let translator = new Translator();

  suite('American to British English', () => {
    test('Translate "Mangoes are my favorite fruit." to British English', () => {
      assert.equal(translator.toBritish('Mangoes are my favorite fruit.'), 'Mangoes are my favourite fruit.');
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
      assert.equal(translator.toBritish('I ate yogurt for breakfast.'), 'I ate yoghurt for breakfast.');
    });

    test('Translate "We had a party at my friend\'s condo." to British English', () => {
      assert.equal(translator.toBritish('We had a party at my friend\'s condo.'), 'We had a party at my friend\'s flat.');
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
      assert.equal(translator.toBritish('Can you toss this in the trashcan for me?'), 'Can you toss this in the bin for me?');
    });

    test('Translate "The parking lot was full." to British English', () => {
      assert.equal(translator.toBritish('The parking lot was full.'), 'The car park was full.');
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
      assert.equal(translator.toBritish('Like a high tech Rube Goldberg machine.'), 'Like a high tech Heath Robinson device.');
    });

    test('Translate "To play hooky means to skip class or work." to British English', () => {
      assert.equal(translator.toBritish('To play hooky means to skip class or work.'), 'To bunk off means to skip class or work.');
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
      assert.equal(translator.toBritish('No Mr. Bond, I expect you to die.'), 'No Mr Bond, I expect you to die.');
    });

    test('Translate "Dr. Grosh will see you now." to British English', () => {
      assert.equal(translator.toBritish('Dr. Grosh will see you now.'), 'Dr Grosh will see you now.');
    });

    test('Translate "Lunch is at 12:15 today." to British English', () => {
      assert.equal(translator.toBritish('Lunch is at 12:15 today.'), 'Lunch is at 12.15 today.');
    });
  });

  suite('British to American English', () => {
    test('Translate "We watched the footie match for a while." to American English', () => {
      assert.equal(translator.toAmerican('We watched the footie match for a while.'), 'We watched the soccer match for a while.');
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', () => {
      assert.equal(translator.toAmerican('Paracetamol takes up to an hour to work.'), 'Tylenol takes up to an hour to work.');
    });

    test('Translate "First, caramelise the onions." to American English', () => {
      assert.equal(translator.toAmerican('First, caramelise the onions.'), 'First, caramelize the onions.');
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', () => {
      assert.equal(translator.toAmerican('I spent the bank holiday at the funfair.'), 'I spent the public holiday at the carnival.');
    });

    test('Translate "I had a bicky then went to the chippy." to American English', () => {
      assert.equal(translator.toAmerican('I had a bicky then went to the chippy.'), 'I had a cookie then went to the fish-and-chip shop.');
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', () => {
      assert.equal(translator.toAmerican('I\'ve just got bits and bobs in my bum bag.'), 'I\'ve just got odds and ends in my fanny pack.');
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', () => {
      assert.equal(translator.toAmerican('The car boot sale at Boxted Airfield was called off.'), 'The swap meet at Boxted Airfield was called off.');
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', () => {
      assert.equal(translator.toAmerican('Have you met Mrs Kalyani?'), 'Have you met Mrs. Kalyani?');
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', () => {
      assert.equal(translator.toAmerican('Prof Joyner of King\'s College, London.'), 'Prof. Joyner of King\'s College, London.');
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', () => {
      assert.equal(translator.toAmerican('Tea time is usually around 4 or 4.30.'), 'Tea time is usually around 4 or 4:30.');
    });
  });

  suite('Highlight Translation', () => {
    test('Highlight translation in "Mangoes are my favorite fruit."', () => {
      assert.equal(
        translator.toBritishHighlight('Mangoes are my favorite fruit.'),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });

    test('Highlight translation in "I ate yogurt for breakfast."', () => {
      assert.equal(
        translator.toBritishHighlight('I ate yogurt for breakfast.'),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });

    test('Highlight translation in "We watched the footie match for a while."', () => {
      assert.equal(
        translator.toAmericanHighlight('We watched the footie match for a while.'),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', () => {
      assert.equal(
        translator.toAmericanHighlight('Paracetamol takes up to an hour to work.'),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });
  });
});
