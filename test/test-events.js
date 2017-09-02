process.env.NODE_ENV = 'test';
const mongoose = require('mongoose'),
  event = require('../app/models/event'),
  server = require('../server'),
  chai = require('chai'),
  should = require('chai').should(),
  expect = require('chai').expect(),
  chaiHttp = require('chai-http');

  chai.use(chaiHttp);

  describe('/GET EVENTS', () => {
    beforeEach((done) => {
    //  event.remove({},(error) => {
    //    done();
    //  });
     console.log('before each called ');
     done();
    });
    /*
   * Test the /GET route
   */
    describe('/', () => {
     it('it should test the server running ', (done) => {
       chai.request(server)
       .get('/')
       .end((err, res) => {
          res.should.have.status(200);
          done();
       });
      });
    });
   /*
  * Test the /GET route
  */
   describe('/GET Events', () => {
    it('it should get all events', (done) => {
      chai.request(server)
      .get('/events')
      .end((err, res) => {
         res.should.have.status(200);
         done();
      });
     });
   });

   describe('/POST event', () => {
    it('it should  POST a event', (done) => {
      var event = {
       name: "Weightlifting",
       description: "Lifting heavy things up"
      }
      chai.request(server)
          .post('/events/create')
          .send(event)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            done();
          });
    });
   });
  });
