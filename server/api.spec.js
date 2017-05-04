var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var nock = require('nock');
var moment = require('moment');

chai.use(chaiHttp);

process.env.API_KEY = 'api_key';

var server = require('./server');

describe('/api', function() {

  it('should pass', function() {
    expect(true).to.be.ok;
  });

  describe('/find-group', function() {
    it('should response with empty array for no results', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/find/groups?photo-host=public&page=20&sign=true&key=' + process.env.API_KEY + '&text=' + groupName)
        .delayBody(1000)
        .reply(200, []);

      chai.request(server)
          .get('/api/find-group/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(0);
            done();
          });
    });

    it('should successfully parse meetup response', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/find/groups?photo-host=public&page=20&sign=true&key=' + process.env.API_KEY + '&text=' + groupName)
        .delayBody(1000)
        .reply(200, [
          {
            'id': 1,
            'name': groupName,
            'urlname': groupName,
            'city': 'Bar',
            'group_photo': {
              'highres_link': 'link1',
              'photo_link': 'link2'
            }
          }
        ]);

      chai.request(server)
          .get('/api/find-group/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.eql(
              {
                'id': 1,
                'name': groupName,
                'urlname': groupName,
                'city': 'Bar',
                'photo': {
                  'highres_link': 'link1',
                  'photo_link': 'link2'
                }
              }
            );
            done();
          });
    });

    it('should fail when unable to parse meetup response', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/find/groups?photo-host=public&page=20&sign=true&key=' + process.env.API_KEY + '&text=' + groupName)
        .delayBody(1000)
        .reply(200, {'error': 'message'});

      chai.request(server)
          .get('/api/find-group/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(0);
            done();
          });
    });

    it('should not fail when there is no group image', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/find/groups?photo-host=public&page=20&sign=true&key=' + process.env.API_KEY + '&text=' + groupName)
        .delayBody(1000)
        .reply(200, [
          {
            'id': 1,
            'name': groupName,
            'urlname': groupName,
            'city': 'Bar'
          }
        ]);

      chai.request(server)
          .get('/api/find-group/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.eql(
              {
                'id': 1,
                'name': groupName,
                'urlname': groupName,
                'city': 'Bar',
                'photo': {}
              }
            );
            done();
          });
    });
  });

  describe('/group-events', function() {
    it('should response with empty array for no results', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/' + groupName + '/events?desc=true&status=upcoming%2Cpast&photo-host=public&page=5&sign=true&key=' + process.env.API_KEY)
        .delayBody(1000)
        .reply(200, []);

      chai.request(server)
          .get('/api/group-events/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(0);
            done();
          });
    });

    it('should successfully parse meetup response', function(done) {

      var groupName = 'foo';

      nock('https://api.meetup.com')
        .get('/' + groupName + '/events?desc=true&status=upcoming%2Cpast&photo-host=public&page=5&sign=true&key=' + process.env.API_KEY)
        .delayBody(1000)
        .reply(200, [
          {
            'id': 1,
            'name': groupName,
            'time': 1492788600000
          }
        ]);

      chai.request(server)
          .get('/api/group-events/' + groupName)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.eql(
              {
                'id': 1,
                'name': groupName,
                'date': moment(1492788600000).format('DD-MM-YYYY HH:mm')
              }
            );
            done();
          });
    });
  });

  describe('/event-rsvps', function() {
    it('should response with empty array for no results', function(done) {

      var groupName = 'foo';
      var groupId = '1234';

      nock('https://api.meetup.com')
        .get('/' + groupName + '/events/' + groupId + '/rsvps?&sign=true&photo-host=public&response=yes&key=' + process.env.API_KEY)
        .delayBody(1000)
        .reply(200, []);

      chai.request(server)
          .get('/api/event-rsvps/' + groupName + '/' + groupId)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(0);
            done();
          });
    });

    it('should successfully parse meetup response', function(done) {

      var groupName = 'foo';
      var groupId = '1234';

      nock('https://api.meetup.com')
        .get('/' + groupName + '/events/' + groupId + '/rsvps?&sign=true&photo-host=public&response=yes&key=' + process.env.API_KEY)
        .delayBody(1000)
        .reply(200, [
          {
            'member': {
              'id': 1,
              'name': 'John Doe',
              'photo': {
                'highres_link': 'photo1',
                'photo_link': 'photo2'
              }
            }
          }
        ]);

      chai.request(server)
          .get('/api/event-rsvps/' + groupName + '/' + groupId)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.eql(
              {
                'id': 1,
                'name': 'John Doe',
                'photo': {
                  'highres_link': 'photo1',
                  'photo_link': 'photo2'
                }
              }
            );
            done();
          });
    });
  });

});