import app from '../app';
import { expect } from 'chai';
import request from 'supertest';
import { Hello } from '../model/hello';

describe('Hello API', () => {
  describe('server', () => {
    it('should run', async () => {
      const resp = await request(app).get('/');
      expect(resp.status).to.equal(404);
    });

    it('should have a healthcheck', async () => {
      const resp = await request(app).get('/_meta/health');
      expect(resp.status).to.equal(200);
    });
  });

  describe('API', () => {
    before(async () => {
      await Hello.deleteMany({}).exec();
    });

    it('PUT /hello/<username> --> save new', async () => {
      // get the count of documents in our collection after insert of new item
      const cntBefore = await Hello.estimatedDocumentCount();
      const resp = await request(app)
        .put('/hello/testusername')
        .send({ dateOfBirth: '1983-12-30' })
        .set('Accept', 'application/json');
      expect(resp.status).to.equal(204);

      // get the count of documents after and compare to check for new item
      const cntAfter = await Hello.estimatedDocumentCount();
      expect(cntBefore).to.be.lessThan(cntAfter);
    });

    it('PUT /hello/<username> --> update', async () => {
      const exist = await Hello.findOne({ username: 'testusername' }).exec();
      const resp = await request(app)
        .put('/hello/testusername')
        .send({ dateOfBirth: '1983-12-31' })
        .set('Accept', 'application/json');
      expect(resp.status).to.equal(204);
      const changed = await Hello.findOne({ username: 'testusername' }).exec();
      expect(exist?.dateOfBirth).to.be.equal('1983-12-30');
      expect(changed?.dateOfBirth).to.be.equal('1983-12-31');
    });

    it('PUT /hello/<username> --> 400 if no body', async () => {
      const resp = await request(app).put('/hello/testusername');
      expect(resp.status).to.equal(400);
      expect(resp.body).to.haveOwnProperty('message');
      expect(resp.body.message).to.include('missing parameter');
    });

    it('PUT /hello/<username> --> 400 if username includes something else than letters', async () => {
      const resp = await request(app)
        .put('/hello/testusername1234')
        .send({ dateOfBirth: '1983-12-30' })
        .set('Accept', 'application/json');
      expect(resp.status).to.equal(400);
      expect(resp.body).to.haveOwnProperty('message');
      expect(resp.body.message).to.include('only letters');
    });

    it('PUT /hello/<username> --> 400 if dob is wrong format', async () => {
      const resp = await request(app)
        .put('/hello/testusername')
        .send({ dateOfBirth: '1983-30-12' })
        .set('Accept', 'application/json');
      expect(resp.status).to.equal(400);
      expect(resp.body).to.haveOwnProperty('message');
      expect(resp.body.message).to.include('not in format');
    });

    it('PUT /hello/<username> --> 400 if dob is >= today', async () => {
      const resp = await request(app)
        .put('/hello/testusername')
        .send({ dateOfBirth: '2022-01-01' })
        .set('Accept', 'application/json');
      expect(resp.status).to.equal(400);
      expect(resp.body).to.haveOwnProperty('message');
      expect(resp.body.message).to.include('in the future');
    });
  });
});
