let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

const server = 'http://localhost:5000';

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
          res.body.length.should.be.oneOf([10, 11]);
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
            res.body.length.should.be.oneOf([10, 11]);
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
          res.body.length.should.be.oneOf([10, 11]);
          // first record should have last name of 'Blackwell'
          expect(res.body[0].lastName).to.equal('Blackwell');
          done();
        });
    });
  });

  /**
   * Testing sending a record to comma file.
   */
  describe('/POST a single record to comma file', () => {
    it('it should POST a single comma record with color set to Green', (done) => {
      chai.request(server)
        .post('/records')
        .type('json')
        .send({
          file: 'data/comma.txt',
          delimiter: ',',
          record: {
            lastName: 'Fontillas',
            firstName: 'Patrick',
            gender: 'M',
            favoriteColor: 'Blue',
            dateOfBirth: '05/06/1989',
          },
        })
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.favoriteColor).to.equal('Blue');
            done();
        });
    });
  });

  /**
   * Testing sending a record to pipe file.
   */
  describe('/POST a single record to pipe file', () => {
    it('it should POST a single pipe record with color set to Green', (done) => {
      chai.request(server)
        .post('/records')
        .type('json')
        .send({
          file: 'data/pipe.txt',
          delimiter: '|',
          record: {
            lastName: 'Fontillas',
            firstName: 'Patrick',
            gender: 'M',
            favoriteColor: 'Green',
            dateOfBirth: '05/06/1989',
          },
        })
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.favoriteColor).to.equal('Green');
            done();
        });
    });
  });

  /**
   * Testing sending a record to space file.
   */
  describe('/POST a single record to space file', () => {
    it('it should POST a single space record with color set to Orange', (done) => {
      chai.request(server)
        .post('/records')
        .type('json')
        .send({
          file: 'data/space.txt',
          delimiter: ' ',
          record: {
            lastName: 'Fontillas',
            firstName: 'Patrick',
            gender: 'M',
            favoriteColor: 'Orange',
            dateOfBirth: '05/06/1989',
          },
        })
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.favoriteColor).to.equal('Orange');
            done();
        });
    });
  });


});