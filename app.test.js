let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

const server = 'http://localhost:3000';

chai.use(chaiHttp);
describe('Records', () => {
  /**
   * Test the records/gender route
   */
  describe('/GET records by gender descending, then last name ascending', () => {
    it('it should GET all the records', (done) => {
      chai.request(server)
        .get('/records/gender')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(10);
          // first record should have last name of 'Wagstaff'
          expect(res.body[0].lastName).to.equal('Wagstaff');
          done();
        });
    });
  });

  /**
   * Test the records/birthdate route
   */
  describe('/GET records by birthdate, ascending', () => {
      it('it should GET all the records', (done) => {
        chai.request(server)
          .get('/records/birthdate')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(10);
            // first record should have last name of 'Nelson'
            expect(res.body[0].lastName).to.equal('Nelson');
            done();
          });
      });
  });

  /**
   * Test the records/name route
   */
  describe('/GET records by name, descending', () => {
    it('it should GET all the records', (done) => {
      chai.request(server)
        .get('/records/name')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(10);
          // first record should have last name of 'Blackwell'
          expect(res.body[0].lastName).to.equal('Blackwell');
          done();
        });
    });
  });

  describe('/POST a single record', () => {
    it('it should POST a single record which is then returned on success', (done) => {
      chai.request(server)
        .post('/records')
        .type('json')
        .send({
          lastName: 'Fontillas',
          firstName: 'Patrick',
          gender: 'M',
          favoriteColor: 'blue',
          birthDate: '05/06/1989',
        })
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.lastName).to.equal('Fontillas');
            done();
        });
    });
  });
});