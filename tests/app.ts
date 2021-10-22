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
    it('PUT /hello/<username> --> save if new', async () => {
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
    it('PUT /hello/<username> --> update if exist', async () => {});
    it('PUT /hello/<username> --> 400 if no body', async () => {});
    it('PUT /hello/<username> --> 400 if username includes something else than letters', async () => {});
    it('PUT /hello/<username> --> 400 if dob is wrong format', async () => {});
    it('PUT /hello/<username> --> 400 if dob is >= today', async () => {});
  });
});
