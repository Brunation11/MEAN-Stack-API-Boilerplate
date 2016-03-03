#MEAN Stack API Boilerplate

This is a basic boilerplate for mean stack APIs, check out [MEAN HACKER][1] to see it in action.

##Description

MEAN STACK API is my first attempt at creating an API boilerplate using MongoDB, Express, and Node. It takes the built in Express generator and modifies the directories modularly as apposed to grouping by file type allowing for smoother scalability as the application grows. A configuration directory automatically configures the application based on environment and can be easily updated by modifying one of the environment config files to turn on/off logging, update the database, ext. A custom logger handles CLI output and error handling to facilitate debugging. The API boilerplate includes auth, model, controller, route, and unit testing.

##Technologies and Dependencies Used

* MongoDB
* Express
* Node
* lodash
* mongoose
* bcrypt
* morgan
* body-parser
* colors
* jsonwebtoken
* expressjwt
* mocha
* chai
* supertest
* cors
* method-override

I started this project building on the built in generator command from express and modifying it from a same type grouping to a modular setup. I used morgan, colors, and lodash to build a custom logger that facilitates debugging by color coding error stacks based on hierarchy. The testing suite uses mocha as the testing framework, chai as the assertion library and supertest for route calls. To handle authentication, bcrypt is used for encrypting and verifying passwords. Instead of sessions, the API uses tokens facilitated by jsonwebtoken and expressjwt.

##Notes

* Currently the main config file is set to look for secrets in process.env.JWT but defaults to a hardcoded moc secret if unavailable. Remember to never hardcode secrets, if using this boilerplate make sure to remove that and handle secrets approprietly.
* To start the application run ```npm start```.
* To start the test suite run ```npm test```.


[1]:https://github.com/Brunation11/mean_hacker
