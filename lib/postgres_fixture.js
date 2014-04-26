'use strict';

var Base = require('easy-fixture').Base,
  util = require('util');

function PostgresqlFixture(opts) {
  Base.call(this);

}

util.inherits(PostgresqlFixture, Base);


PostgresqlFixture.prototype._load = function () {

};


PostgresqlFixture.prototype._save = function () {

};

module.exports = PostgresqlFixture;
