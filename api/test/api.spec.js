import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
  const plantName = 'plant added by test';

  it('Should get a list of plants', done => {
    chai
      .request(app)
      .get('/api/plants')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        done();
      });
  });

  it.only('Should be able to get a plant', done => {
    chai
      .request(app)
      .get('/api/plants/5a525f939c9ffe4fb69ccdc8')
      .send({
        name: plantName
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name');
        done();
      });
  });

  it('Should be able to add a plant', done => {
    chai
      .request(app)
      .post('/api/plants')
      .send({
        name: 'plant added by test'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should be able to update a plant', done => {
    chai
      .request(app)
      .put('/api/plants/5a525f939c9ffe4fb69ccdc8')
      .send({
        name: 'plant added by test - updated 5'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should be able to remove a plant', done => {
    chai
      .request(app)
      .delete('/api/plants/5a5252105680744babe0de67')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
