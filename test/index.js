'use strict';

var fixture = require('easy-fixture'),
  PostgresFixture = require('..'),
  pg = require('pg'),
  Q = require('q'),
  fs = require('fs'),
  path = require('path');

var postgresFixture,
  connectionString = 'pg://postgres:@localhost/travis_ci_test',
  pgClient;

before(function () {
  postgresFixture = new PostgresFixture({
    database: 'travis_ci_test',
    dir: 'test/fixtures',
    out: 'fixtures.sql'
  });

  fixture.use(postgresFixture);
});

describe('easy-postgres-fixture', function () {
  describe('load', function () {

    before(function (done) {
      pgClient = new pg.Client(connectionString);
      return Q.ninvoke(pgClient, 'connect').then(function (res) {
        done();
      }).fail(done).done();
    });

    it('should be able to work without Users and Roles tables', function (done) {
      Q.ninvoke(pgClient, 'query', 'DROP TABLE IF EXISTS "Users"').then(function () {
        Q.ninvoke(pgClient, 'query', 'DROP TABLE IF EXISTS "Roles"').then(function () {
          done();
        }).fail(done).done();
      }).fail(done).done();
    });

    it('should be able to read data from local file and save it into database', function (done) {
      fixture.load().then(function () {
        done();
      }).fail(done).done();
    });

    describe('after', function () {
      it('should be able to read Users records from database after fixtures are loaded', function (done) {
        Q.ninvoke(pgClient, 'query', 'SELECT COUNT(*) FROM "Users";').then(function (res) {
          if (parseInt(res.rows[0].count) === 1) {
            done();
          }
        }).fail(done).done();
      });

      it('should be able to read Roles records from database after fixtures are loaded', function (done) {
        Q.ninvoke(pgClient, 'query', 'SELECT COUNT(*) FROM "Roles";').then(function (res) {
          if (parseInt(res.rows[0].count) === 3) {
            done();
          }
        }).fail(done).done();
      });
    });
  });

  describe('save', function () {
    before(function (done) {
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'fixtures.sql'));

      pgClient = new pg.Client(connectionString);
      return Q.ninvoke(pgClient, 'connect').then(function (res) {
        done();
      }).fail(done).done();
    });

    it('should be able to work without local fixtures file', function (done) {
      var exist = fs.existsSync(path.join(__dirname, 'fixtures', 'fixtures.sql'));

      if (!exist) {
        done();
      } else {
        done('Local file exists!');
      }
    });

    it('should be able to collect data from database and save it into local file', function (done) {
      fixture.save().then(function () {
        var exist = fs.existsSync(path.join(__dirname, 'fixtures', 'fixtures.sql'));

        if (exist) {
          done();
        } else {
          done('File fixtures/fixtures.sql does not exist!');
        }
      }).fail(done).done();
    });

    it('should be able to work without Users and Roles tables', function (done) {
      Q.ninvoke(pgClient, 'query', 'DROP TABLE IF EXISTS "Users"').then(function () {
        Q.ninvoke(pgClient, 'query', 'DROP TABLE IF EXISTS "Roles"').then(function () {
          done();
        }).fail(done).done();
      }).fail(done).done();
    });

    it('should be able to read data from local file and save it into database', function (done) {
      fixture.load().then(function () {
        done();
      }).fail(done).done();
    });

    describe('after', function () {
      it('should be able to read Users records from database after fixtures are loaded', function (done) {
        Q.ninvoke(pgClient, 'query', 'SELECT COUNT(*) FROM "Users";').then(function (res) {
          if (parseInt(res.rows[0].count) === 1) {
            done();
          }
        }).fail(done).done();
      });

      it('should be able to read Roles records from database after fixtures are loaded', function (done) {
        Q.ninvoke(pgClient, 'query', 'SELECT COUNT(*) FROM "Roles";').then(function (res) {
          if (parseInt(res.rows[0].count) === 3) {
            done();
          }
        }).fail(done).done();
      });
    });
  });
});
