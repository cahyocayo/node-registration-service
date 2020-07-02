const bodyParser = require('body-parser')
let fwspConfig = require('fwsp-config');
const express = require('express')
const ServerResponse = require('fwsp-server-response');
const stringfy = require('jsesc');

const routes = require('./routes/login-v1-routes')
const db = require('./components/database/db')
const cors = require('cors')

const app = express();
const PORT = 8080 || process.env.PORT;
let config = {}

// bodyparser setup
function init() {

  config = require('./config/config.json')

  fwspConfig.init(config).then(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    
    let serverResponse = new ServerResponse();
    serverResponse.enableCORS(true);
    express.response.sendError = function(result) {
      serverResponse.sendServerError(this, {result});
    };
    express.response.sendOk = function(result) {
      serverResponse.sendOk(this, {result});
    };
    express.response.sendCreated = function(result) {
      serverResponse.sendCreated(this, {result});
    };
    express.response.sendInvalidRequest = function(result) {
      serverResponse.sendInvalidRequest(this, {result});
    };
    express.response.sendInvalidUserCredentials = function(result) {
      serverResponse.sendInvalidUserCredentials(this, {result});
    };
  })

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  routes(app);

  // serving static files
  app.use(express.static('public'));
  console.log(config.environment)

  app.get('/', (req, res) =>
      res.send(stringfy({event : `Startup`, message: `Service is running on port ${PORT}`}))
  );

  app.listen(PORT, () => 
      console.log(stringfy({event : `Startup`, message: `Service is running on port ${PORT}`}))
  );
}

module.exports = {
  init
}