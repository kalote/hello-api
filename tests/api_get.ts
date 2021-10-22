import app from '../app';
import { expect } from 'chai';
import request from 'supertest';
import { Hello } from '../model/hello';
import { daysUntil } from '../utils/all';
import moment from 'moment';

const DOB = '1983-12-30';
const TODAY = moment().format('YYYY-MM-DD');
const USER_N = 'testgetn';
const USER_HB = 'testgethb';
const USER_NE = 'nonexistinguser';

describe('API (GET)', () => {
  before(async () => {
    await Hello.deleteMany({}).exec();
    const testGetN = await Hello.build({
      username: USER_N,
      dateOfBirth: DOB,
    }).save();
    const testGetHB = await Hello.build({
      username: USER_HB,
      dateOfBirth: TODAY,
    }).save();
  });

  it('/hello/<username> --> N days', async () => {
    const nbdays = daysUntil(DOB);
    const resp = await request(app).get(`/hello/${USER_N}`);
    expect(resp.status).to.equal(200);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.equal(
      `Hello, ${USER_N}! Your birthday is in ${nbdays} day(s)`
    );
  });

  it('/hello/<username> --> Happy birthday', async () => {
    const resp = await request(app).get(`/hello/${USER_HB}`);
    expect(resp.status).to.equal(200);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.equal(`Hello, ${USER_HB}! Happy birthday!`);
  });

  it('/hello/<username> --> Not find', async () => {
    const resp = await request(app).get(`/hello/${USER_NE}`);
    expect(resp.status).to.equal(404);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.include(`user ${USER_NE} doesn't exists`);
  });
});
