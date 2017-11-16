'use strict';

require('dotenv').config();

var path     = require('path')
  , express  = require('express')
  , API      = require('json-api')
  , APIError = API.types.Error
  , mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var models = {
  Person: require('./models/person'),
  Phone: require('./models/phone')
}

var adapter = new API.dbAdapters.Mongoose(models);
var registry = new API.ResourceTypeRegistry({
  people: require('./resource-descriptions/people'),
  phones: require('./resource-descriptions/phones')
}, { dbAdapter: adapter });

var Controller = new API.controllers.API(registry);

var Docs = new API.controllers.Documentation(registry, {name: 'Agenda API'});

var app = express();

var Front = new API.httpStrategies.Express(Controller, Docs);
var apiReqHandler = Front.apiRequest.bind(Front);

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
})

app.get("/", Front.docsRequest.bind(Front));
app.route("/:type(people|phones)")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route("/:type(people|phones)/:id")
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route("/:type(people|phones)/:id/relationships/:relationship")
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.use(function(req, res, next) {
  Front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});



models.Person.find({}).exec(function (err, people) {
  if (people.length === 0) {
    console.log('Seeding database sample');

    var faker = require('faker');
    faker.locale = 'pt_BR';

    models.Person.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.past()
    }).then(person => {
      console.log(`Success created person ${person}!!`);
      models.Phone.create({
        prefix: 49,
        number: 333333333,
        person: person
      }).then((phone) => console.log(`Success created phone ${phone}!!`));
    });
  }
});

console.log(`Starting up! Visit ${process.env.HOST}:${process.env.PORT} to see the docs.`);
app.listen(process.env.PORT);
