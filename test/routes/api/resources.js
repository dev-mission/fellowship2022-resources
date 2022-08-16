const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/resources', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['categories', 'resources', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of Resources', async () => {
      const response = await testSession.get('/api/resources').expect(HttpStatus.OK);
      const res = response.body;
      assert.deepStrictEqual(res.length, 2);
    });
  });
  describe('GET /:id', () => {
    it('returns one Resource by id', async () => {
      const response = await testSession.get('/api/resources/1').expect(HttpStatus.OK);
      const res = response.body;
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
      assert.deepStrictEqual(res.Link, 'This is fixture item url 1');
    });
    it('returns NOT FOUND for an id not in the database', async () => {
      await testSession.get('/api/resources/0').expect(HttpStatus.NOT_FOUND);
    });
  });

  context('authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new Resource', async () => {
        const response = await testSession
          .post('/api/resources')
          .set('Accept', 'application/json')
          .send({
            CategoryId: 1,
            CategoryTitle: 'This is a new Resource CategoryTitle.',
            Title: 'This is a new Resource Title.',
            Organization: 'This is a new Resource Organization.',
            NavPosition: 1,
            ShortDetails: 'This is a new Resource ShortDetails.',
            LongDetails: 'This is a new Resource LongDetails.',
            Eligibility: 'This is a new Resource Eligibility.',
            Hours: 'This is a new Resource Hours.',
            Address: 'This is a new Resource Address.',
            Contact: 'This is a new Resource Contact.',
            MainImg: 'This is a new Resource MainImg.',
            SuppImg: 'This is a new Resource SuppImg.',
            Link: 'This is a new Resource Link.',
          })
          .expect(HttpStatus.CREATED);

        const {
          id,
          CategoryId,
          CategoryTitle,
          Title,
          Organization,
          NavPosition,
          ShortDetails,
          LongDetails,
          Eligibility,
          Hours,
          Address,
          Contact,
          MainImg,
          SuppImg,
          Link,
        } = response.body;
        assert(id);
        assert.deepStrictEqual(CategoryId, 1);
        assert.deepStrictEqual(CategoryTitle, 'This is a new Resource CategoryTitle.');
        assert.deepStrictEqual(Title, 'This is a new Resource Title.');
        assert.deepStrictEqual(Organization, 'This is a new Resource Organization.');
        assert.deepStrictEqual(NavPosition, 1);
        assert.deepStrictEqual(ShortDetails, 'This is a new Resource ShortDetails.');
        assert.deepStrictEqual(LongDetails, 'This is a new Resource LongDetails.');
        assert.deepStrictEqual(Eligibility, 'This is a new Resource Eligibility.');
        assert.deepStrictEqual(Hours, 'This is a new Resource Hours.');
        assert.deepStrictEqual(Address, 'This is a new Resource Address.');
        assert.deepStrictEqual(Contact, 'This is a new Resource Contact.');
        assert.deepStrictEqual(MainImg, 'This is a new Resource MainImg.');
        assert.deepStrictEqual(SuppImg, 'This is a new Resource SuppImg.');
        assert.deepStrictEqual(Link, 'This is a new Resource Link.');

        const res = await models.Resource.findByPk(id);
        assert(res);
        assert.deepStrictEqual(res.CategoryId, 1);
        assert.deepStrictEqual(res.CategoryTitle, 'This is a new Resource CategoryTitle.');
        assert.deepStrictEqual(res.Title, 'This is a new Resource Title.');
        assert.deepStrictEqual(res.Organization, 'This is a new Resource Organization.');
        assert.deepStrictEqual(res.NavPosition, 1);
        assert.deepStrictEqual(res.ShortDetails, 'This is a new Resource ShortDetails.');
        assert.deepStrictEqual(res.LongDetails, 'This is a new Resource LongDetails.');
        assert.deepStrictEqual(res.Eligibility, 'This is a new Resource Eligibility.');
        assert.deepStrictEqual(res.Hours, 'This is a new Resource Hours.');
        assert.deepStrictEqual(res.Address, 'This is a new Resource Address.');
        assert.deepStrictEqual(res.Contact, 'This is a new Resource Contact.');
        assert.deepStrictEqual(res.MainImg, 'This is a new Resource MainImg.');
        assert.deepStrictEqual(res.SuppImg, 'This is a new Resource SuppImg.');
        assert.deepStrictEqual(res.Link, 'This is a new Resource Link.');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Resource', async () => {
        const response = await testSession
          .patch('/api/resources/1')
          .set('Accept', 'application/json')
          .send({
            CategoryId: 1,
            CategoryTitle: 'This is an updated Resource CategoryTitle.',
            Title: 'This is an updated Resource Title.',
            Organization: 'This is an updated Resource Organization.',
            NavPosition: 1,
            ShortDetails: 'This is an updated Resource ShortDetails.',
            LongDetails: 'This is an updated Resource LongDetails.',
            Eligibility: 'This is an updated Resource Eligibility.',
            Hours: 'This is an updated Resource Hours.',
            Address: 'This is an updated Resource Address.',
            Contact: 'This is an updated Resource Contact.',
            MainImg: 'This is an updated Resource MainImg.',
            SuppImg: 'This is an updated Resource SuppImg.',
            Link: 'This is an updated Resource Link.',
          })
          .expect(HttpStatus.OK);

        const {
          id,
          CategoryId,
          CategoryTitle,
          Title,
          Organization,
          NavPosition,
          ShortDetails,
          LongDetails,
          Eligibility,
          Hours,
          Address,
          Contact,
          MainImg,
          SuppImg,
          Link,
        } = response.body;
        assert.deepStrictEqual(CategoryId, 1);
        assert.deepStrictEqual(CategoryTitle, 'This is an updated Resource CategoryTitle.');
        assert.deepStrictEqual(Title, 'This is an updated Resource Title.');
        assert.deepStrictEqual(Organization, 'This is an updated Resource Organization.');
        assert.deepStrictEqual(NavPosition, 1);
        assert.deepStrictEqual(ShortDetails, 'This is an updated Resource ShortDetails.');
        assert.deepStrictEqual(LongDetails, 'This is an updated Resource LongDetails.');
        assert.deepStrictEqual(Eligibility, 'This is an updated Resource Eligibility.');
        assert.deepStrictEqual(Hours, 'This is an updated Resource Hours.');
        assert.deepStrictEqual(Address, 'This is an updated Resource Address.');
        assert.deepStrictEqual(Contact, 'This is an updated Resource Contact.');
        assert.deepStrictEqual(MainImg, 'This is an updated Resource MainImg.');
        assert.deepStrictEqual(SuppImg, 'This is an updated Resource SuppImg.');
        assert.deepStrictEqual(Link, 'This is an updated Resource Link.');

        const res = await models.Resource.findByPk(id);
        assert(res);
        assert.deepStrictEqual(res.CategoryId, 1);
        assert.deepStrictEqual(res.CategoryTitle, 'This is an updated Resource CategoryTitle.');
        assert.deepStrictEqual(res.Title, 'This is an updated Resource Title.');
        assert.deepStrictEqual(res.Organization, 'This is an updated Resource Organization.');
        assert.deepStrictEqual(res.NavPosition, 1);
        assert.deepStrictEqual(res.ShortDetails, 'This is an updated Resource ShortDetails.');
        assert.deepStrictEqual(res.LongDetails, 'This is an updated Resource LongDetails.');
        assert.deepStrictEqual(res.Eligibility, 'This is an updated Resource Eligibility.');
        assert.deepStrictEqual(res.Hours, 'This is an updated Resource Hours.');
        assert.deepStrictEqual(res.Address, 'This is an updated Resource Address.');
        assert.deepStrictEqual(res.Contact, 'This is an updated Resource Contact.');
        assert.deepStrictEqual(res.MainImg, 'This is an updated Resource MainImg.');
        assert.deepStrictEqual(res.SuppImg, 'This is an updated Resource SuppImg.');
        assert.deepStrictEqual(res.Link, 'This is an updated Resource Link.');
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Resource', async () => {
        await testSession.delete('/api/resources/1').expect(HttpStatus.OK);
        const res = await models.Resource.findByPk(1);
        assert.deepStrictEqual(res, null);
      });
    });
  });
});
