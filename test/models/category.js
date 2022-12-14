const assert = require('assert');
const helper = require('../helper');
const models = require('../../models');

describe('models.Category', () => {
  beforeEach(async () => {
    await helper.loadUploads([
      ['512x512.png', 'IconBackImg1'],
      ['512x512.png', 'NavBackImg1'],
      ['512x512.png', 'IconBackImg2'],
      ['512x512.png', 'NavBackImg2'],
    ]);
    await helper.loadFixtures(['categories']);
  });

  afterEach(async () => {
    await helper.cleanAssets();
  });

  it('creates a new Category record', async () => {
    let cat = models.Category.build({
      Name: 'Fixture item 1',
      IconBackImg: 'This is fixture item 1.',
      NavBackImg: 'This is fixture item 1.',
      Position: 1,
    });
    assert.deepStrictEqual(cat.id, null);
    await cat.save();
    assert(cat.id);
    cat = await models.Category.findByPk(cat.id);
    assert.deepStrictEqual(cat.Name, 'Fixture item 1');
    assert.deepStrictEqual(cat.IconBackImg, 'This is fixture item 1.');
    assert.deepStrictEqual(cat.NavBackImg, 'This is fixture item 1.');
    assert.deepStrictEqual(cat.Position, 1);
  });

  it('returns all the Categories', async () => {
    const results = await models.Category.findAll();
    assert.deepStrictEqual(results.length, 2);
  });
});
