import { listen as server, PORT } from '../app';
import { expect } from 'chai';

describe('Hello API', () => {
  after((done) => {
    server.close(done);
  });

  it('should start the app on port 3000', () => {
    expect(PORT).to.equal(3000);
  });

  describe('Save username / dob', () => {});
});
