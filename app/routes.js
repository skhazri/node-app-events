// create routes
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controllers');
  eventsController = require('./controllers/events.controllers');

// export router
module.exports = router;

// define routes
router.get('/', mainController.displayHome);
router.get('/events', eventsController.showEvents);
router.get('/events/create', eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);
router.get('/events/:slug', eventsController.showEvent);
router.get('/events/:seed', eventsController.saveEvents);
