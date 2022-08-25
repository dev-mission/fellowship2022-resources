const assert = require('assert');
const helper = require('../helper');
const models = require('../../models');

describe('models.Resource', () => {
  beforeEach(async () => {
    await helper.loadUploads([
      ['512x512.png', 'IconBackImg1'],
      ['512x512.png', 'NavBackImg1'],
      ['512x512.png', 'IconBackImg2'],
      ['512x512.png', 'NavBackImg2'],
    ]);
    await helper.loadFixtures(['categories', 'resources']);
  });

  afterEach(async () => {
    await helper.cleanAssets();
  });

  it('creates a new Resource record', async () => {
    let res = models.Resource.build({
      CategoryId: 1,
      CategoryTitle: 'This is fixture item 1.',
      Title: 'This is fixture item 1.',
      Organization: 'This is fixture item 1.',
      NavPosition: 1,
      ShortDetails: 'This is fixture item 1.',
      LongDetails: 'This is fixture item 1.',
      Eligibility: 'This is fixture item 1.',
      Hours: 'This is fixture item 1.',
      Address: 'This is fixture item 1.',
      Contact: 'This is fixture item 1.',
      MainImg: 'This is fixture item image 1.',
      SuppImg: 'This is fixture item image 1.',
      Link: 'This is fixture item url 1.',
    });
    assert.deepStrictEqual(res.id, null);
    await res.save();
    assert(res.id);
    res = await models.Resource.findByPk(res.id);
    assert.deepStrictEqual(res.CategoryId, 1);
    assert.deepStrictEqual(res.CategoryTitle, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Title, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Organization, 'This is fixture item 1.');
    assert.deepStrictEqual(res.NavPosition, 1);
    assert.deepStrictEqual(res.ShortDetails, 'This is fixture item 1.');
    assert.deepStrictEqual(res.LongDetails, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Eligibility, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Hours, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Address, 'This is fixture item 1.');
    assert.deepStrictEqual(res.Contact, 'This is fixture item 1.');
    assert.deepStrictEqual(res.MainImg, 'This is fixture item image 1.');
    assert.deepStrictEqual(res.SuppImg, 'This is fixture item image 1.');
    assert.deepStrictEqual(res.Link, 'This is fixture item url 1.');
  });

  it('returns all the Resources', async () => {
    const results = await models.Resource.findAll();
    assert.deepStrictEqual(results.length, 2);
  });
});
