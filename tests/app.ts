import app from '../app';
import { expect } from 'chai';
import request from 'supertest';

describe('API', () => {
  it('should run', async () => {
    const resp = await request(app).get('/');
    expect(resp.status).to.equal(404);
  });

  it('should have a healthcheck', async () => {
    const resp = await request(app).get('/_meta/health');
    expect(resp.status).to.equal(200);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.equal('OK');
  });

  it('should be connected to db', async () => {
    const resp = await request(app).get('/_meta/ready');
    expect(resp.status).to.equal(200);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.equal('DB OK');
  });
});
