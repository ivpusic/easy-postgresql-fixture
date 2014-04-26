easy-postgresql-fixture
==================

Postgresql fixture manager for [easy-fixture](https://github.com/ivpusic/easy-fixture) lib.

### Example

```
var fixture = require('easy-fixture');
var PostgresFixture = require('easy-postgresql-fixture');

var postgresFixtrue = new PostgresFixture({
  database: 'test',
  dir: './fixtures',
  out: 'fixtures.sql'
});

// set manager to use
fixture.use(postgresFixtrue);

// collect data from postgresql database and save it to local file(s)
fixture.save().then(function () {
	console.log('ok');
});

// when we need to load fixture, call this method to read from fixture file,
// and to import wanted data
fixture.load().then(function () {
	console.log('ok')''
});
```

# License
**MIT**
