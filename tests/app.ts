import app from '../app';
import { expect } from 'chai';
import request from 'supertest';

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
});
