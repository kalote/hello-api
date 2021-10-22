import app from '../app';
import { expect } from 'chai';
import request from 'supertest';
import { Hello } from '../model/hello';

const DOB = '1983-12-30';
const DOB_CHANGED = '1983-12-31';
const DOB_WRONG = '1983-31-12';
const DOB_FUTURE = '2023-12-01';

describe('API (PUT)', () => {
  before(async () => {
    await Hello.deleteMany({}).exec();
  });

  it('/hello/<username> --> save new', async () => {
    // get the count of documents in our collection after insert of new item
    const cntBefore = await Hello.estimatedDocumentCount();
    const resp = await request(app)
      .put('/hello/testusername')
      .send({ dateOfBirth: DOB })
      .set('Accept', 'application/json');
    expect(resp.status).to.equal(204);

    // get the count of documents after and compare to check for new item
    const cntAfter = await Hello.estimatedDocumentCount();
    expect(cntBefore).to.be.lessThan(cntAfter);
  });

  it('/hello/<username> --> update', async () => {
    const exist = await Hello.findOne({ username: 'testusername' }).exec();
    const resp = await request(app)
      .put('/hello/testusername')
      .send({ dateOfBirth: DOB_CHANGED })
      .set('Accept', 'application/json');
    expect(resp.status).to.equal(204);
    const changed = await Hello.findOne({ username: 'testusername' }).exec();
    expect(exist?.dateOfBirth).to.be.equal(DOB);
    expect(changed?.dateOfBirth).to.be.equal(DOB_CHANGED);
  });

  it('/hello/<username> --> 400 if no body', async () => {
    const resp = await request(app).put('/hello/testusername');
    expect(resp.status).to.equal(400);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.include('missing parameter');
  });

  it('/hello/<username> --> 400 if username includes something else than letters', async () => {
    const resp = await request(app)
      .put('/hello/testusername1234')
      .send({ dateOfBirth: DOB })
      .set('Accept', 'application/json');
    expect(resp.status).to.equal(400);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.include('only letters');
  });

  it('/hello/<username> --> 400 if dob is wrong format', async () => {
    const resp = await request(app)
      .put('/hello/testusername')
      .send({ dateOfBirth: DOB_WRONG })
      .set('Accept', 'application/json');
    expect(resp.status).to.equal(400);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.include('not in format');
  });

  it('/hello/<username> --> 400 if dob is >= today', async () => {
    const resp = await request(app)
      .put('/hello/testusername')
      .send({ dateOfBirth: DOB_FUTURE })
      .set('Accept', 'application/json');
    expect(resp.status).to.equal(400);
    expect(resp.body).to.haveOwnProperty('message');
    expect(resp.body.message).to.include('in the future');
  });
});
