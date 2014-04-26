'use strict';

var fixture = require('easy-fixture'),
  MongoFixture = require('..'),
  MongoClient = require('mongodb').MongoClient,
  Q = require('q'),
  fs = require('fs'),
  path = require('path');

describe('easy-fixture', function () {
  var mongoFixture;

  beforeEach(function () {
    mongoFixture = new MongoFixture({
      database: 'test',
      collections: ['products', 'categories'],
      dir: 'test/fixtures',
      override: true
    });

    fixture.use(mongoFixture);
  });

  describe('load', function () {
    it('should load fixtures from file into database', function (done) {
      fixture.load().then(function () {
        done();
      }).fail(done)
        .done();
    });

    it('will make able to read imported products records', function (done) {
      Q.ninvoke(MongoClient, 'connect', 'mongodb://127.0.0.1:27017/test').then(function (db) {
        var products = db.collection('products');

        Q.ninvoke(products.find(), 'toArray').then(function (res) {
          if (res.length === 23) {
            done();
          } else {
            done('Results not returned!');
          }
        });
      }).fail(done)
        .done();
    });

    it('will make able to read imported categories records', function (done) {
      Q.ninvoke(MongoClient, 'connect', 'mongodb://127.0.0.1:27017/test').then(function (db) {
        var categories = db.collection('categories');

        Q.ninvoke(categories.find(), 'toArray').then(function (res) {
          if (res.length === 63) {
            done();
          } else {
            done('Results not returned!');
          }
        });
      }).fail(done)
        .done();
    });
  });

  describe('save', function () {

    before(function () {
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'products.json'));
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'categories.json'));
    });

    it('should be able to work without local fixture data. It should be able to reload data from database', function (done) {
      var existProducts = fs.existsSync(path.join(__dirname, 'fixtures', 'products.json'));
      var existCategories = fs.existsSync(path.join(__dirname, 'fixtures', 'categories.json'));

      if (!existCategories && !existProducts) {
        done();
      } else {
        done('Cannot clean fixture files!');
      }
    });

    it('should collect data from database and save it to local file', function (done) {
      fixture.save().then(function () {
        done();
      }).fail(done)
        .done();
    });

    it('should save collection product to local products.json file', function (done) {
      var exist = fs.existsSync(path.join(__dirname, 'fixtures', 'products.json'));

      if (exist) {
        done();
      } else {
        done('Cannot find products.json file. Is it exported?');
      }
    });

    it('should save collection product to local categories.json file', function (done) {
      var exist = fs.existsSync(path.join(__dirname, 'fixtures', 'categories.json'));

      if (exist) {
        done();
      } else {
        done('Cannot find categories.json file. Is it exported?');
      }
    });
  });
});
