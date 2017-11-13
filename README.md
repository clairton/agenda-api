# agenda-api
An API created with my JSON-API with library (http://github.com/ethanresnick/json-api) and based on https://github.com/ethanresnick/json-api-example for a book about Ember.js by Casa do Código.

# Try it out

1. Clone the repo
2. Run `npm install`
3. Ensure MongoDB is running and listening on the default port
4. Run `node src/index.js`
5. Try out the following (for example):
  - `GET http://localhost:3000/` to view the auto-generated documentation
  - `GET http://localhost:3000/people` to view the people collection
  - `POST http://localhost:3000/phones` to add a phone
  - `GET http://localhost:3000/people/{id}` to view a person, after it's been created
