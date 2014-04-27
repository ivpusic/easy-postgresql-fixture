'use strict';

var Base = require('easy-fixture').Base,
  util = require('util'),
  exec = require('child_process').exec,
  path = require('path'),
  Q = require('q'),
  fs = require('fs');

function PostgresqlFixture(opts) {
  Base.call(this);

  this.config = {
    db: opts.database || '',
    dir: opts.dir || '',
    out: opts.out || 'out.sql',
    options: opts.options || ''
  };
}

util.inherits(PostgresqlFixture, Base);

function getDropTablesCommand(config) {
  return util.format('#!/usr/bin/env bash\n' +
    'PGDB="%s"\n' +
    'VIEWS=`psql -d $PGDB -t --command "SELECT string_agg(table_name, \', \') FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'VIEW\'"`\n' +
    'BASETBLS=`psql -d $PGDB -t --command "SELECT string_agg(table_name, \', \') FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'"`\n' +
    'arr=$(echo ${BASETBLS} | tr "," "\\n")\n' +
    'for TABLE in $arr\n' +
    'do\n' +
    'TABLE=\\"$TABLE\\"\n' +
    'psql $PGDB --command "DROP TABLE IF EXISTS ${TABLE} CASCADE"\n' +
    'done\n', config.db);
}


PostgresqlFixture.prototype._load = function () {
  var command =
    'psql ' +
    this.config.options +
    ' -d ' +
    this.config.db +
    ' -f ' +
    path.join(this.config.dir, this.config.out);

  return Q.nfcall(fs.writeFile, './drop_pg_dbs.bash', getDropTablesCommand(this.config)).then(function () {
    return Q.nfcall(exec, 'bash ./drop_pg_dbs.bash');
  }).then(function () {
    return Q.nfcall(exec, command);
  }).then(function () {
    return Q.nfcall(fs.unlink, './drop_pg_dbs.bash');
  });
};

PostgresqlFixture.prototype._save = function () {
  var command =
    'pg_dump ' +
    this.config.db +
    ' ' +
    this.config.options +
    ' -f ' +
    path.join(this.config.dir, this.config.out);

  return Q.nfcall(exec, command);
};

module.exports = PostgresqlFixture;
