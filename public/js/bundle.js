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

const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate
}

/**
 * Show all events
 */
function showEvents(req, res) {
  // get all events
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }

    // return a view with data
    res.render('pages/events', { events: events });
  });
}

/**
 * Show a single event
 */
function showSingle(req, res) {
  // get a single event
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Event not found!');
    }

    res.render('pages/single', {
      event: event,
      success: req.flash('success')
    });
  });
}

/**
 * Seed the database
 */
function seedEvents(req, res) {
  // create some events
  const events = [
    { name: 'Basketball', description: 'Throwing into a basket.' },
    { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
    { name: 'Weightlifting', description: 'Lifting heavy things up' },
    { name: 'Ping Pong', description: 'Super fast paddles' }
  ];

  // use the Event model to insert/save
  Event.remove({}, () => {
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
}

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('pages/create', {
    errors: req.flash('errors')
  });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/events/create');
  }

  // create a new event
  const event = new Event({
    name: req.body.name,
    description: req.body.description
  });

  // save event
  event.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created event!');

    // redirect to the newly created event
    res.redirect(`/events/${event.slug}`);
  });
}

const port = process.env.PORT || 8081;

module.exports = {
  displayHome: (req, res) => {
   // render look in views folder
   res.render('pages/home');
   //res.send(`express server is running on port ${port}`);
   }
};

const mongoose = require('mongoose'),
  schema = mongoose.Schema;

// create a schema
const eventSchema = new schema({
 name : String,
 slug: {
  type: String,
  unique: true
 },
 description : String
});
//middleware
eventSchema.pre('save', function(next) {
 this.slug = slugify(this.name);
 next();
});
// create the model
const eventModel = mongoose.model('Event', eventSchema);
// export the model
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
module.exports = eventModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyIsImNvbnRyb2xsZXJzL2V2ZW50cy5jb250cm9sbGVycy5qcyIsImNvbnRyb2xsZXJzL21haW4uY29udHJvbGxlcnMuanMiLCJtb2RlbHMvZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjcmVhdGUgcm91dGVzXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpLFxuICByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpLFxuICBtYWluQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlcnMvbWFpbi5jb250cm9sbGVycycpO1xuICBldmVudHNDb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVycy9ldmVudHMuY29udHJvbGxlcnMnKTtcblxuLy8gZXhwb3J0IHJvdXRlclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XG5cbi8vIGRlZmluZSByb3V0ZXNcbnJvdXRlci5nZXQoJy8nLCBtYWluQ29udHJvbGxlci5kaXNwbGF5SG9tZSk7XG5yb3V0ZXIuZ2V0KCcvZXZlbnRzJywgZXZlbnRzQ29udHJvbGxlci5zaG93RXZlbnRzKTtcbnJvdXRlci5nZXQoJy9ldmVudHMvY3JlYXRlJywgZXZlbnRzQ29udHJvbGxlci5zaG93Q3JlYXRlKTtcbnJvdXRlci5wb3N0KCcvZXZlbnRzL2NyZWF0ZScsIGV2ZW50c0NvbnRyb2xsZXIucHJvY2Vzc0NyZWF0ZSk7XG5yb3V0ZXIuZ2V0KCcvZXZlbnRzLzpzbHVnJywgZXZlbnRzQ29udHJvbGxlci5zaG93RXZlbnQpO1xucm91dGVyLmdldCgnL2V2ZW50cy86c2VlZCcsIGV2ZW50c0NvbnRyb2xsZXIuc2F2ZUV2ZW50cyk7XG4iLCJjb25zdCBFdmVudCA9IHJlcXVpcmUoJy4uL21vZGVscy9ldmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvd0V2ZW50czogc2hvd0V2ZW50cyxcbiAgc2hvd1NpbmdsZTogc2hvd1NpbmdsZSxcbiAgc2VlZEV2ZW50czogc2VlZEV2ZW50cyxcbiAgc2hvd0NyZWF0ZTogc2hvd0NyZWF0ZSxcbiAgcHJvY2Vzc0NyZWF0ZTogcHJvY2Vzc0NyZWF0ZVxufVxuXG4vKipcbiAqIFNob3cgYWxsIGV2ZW50c1xuICovXG5mdW5jdGlvbiBzaG93RXZlbnRzKHJlcSwgcmVzKSB7XG4gIC8vIGdldCBhbGwgZXZlbnRzXG4gIEV2ZW50LmZpbmQoe30sIChlcnIsIGV2ZW50cykgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDA0KTtcbiAgICAgIHJlcy5zZW5kKCdFdmVudHMgbm90IGZvdW5kIScpO1xuICAgIH1cblxuICAgIC8vIHJldHVybiBhIHZpZXcgd2l0aCBkYXRhXG4gICAgcmVzLnJlbmRlcigncGFnZXMvZXZlbnRzJywgeyBldmVudHM6IGV2ZW50cyB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogU2hvdyBhIHNpbmdsZSBldmVudFxuICovXG5mdW5jdGlvbiBzaG93U2luZ2xlKHJlcSwgcmVzKSB7XG4gIC8vIGdldCBhIHNpbmdsZSBldmVudFxuICBFdmVudC5maW5kT25lKHsgc2x1ZzogcmVxLnBhcmFtcy5zbHVnIH0sIChlcnIsIGV2ZW50KSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmVzLnN0YXR1cyg0MDQpO1xuICAgICAgcmVzLnNlbmQoJ0V2ZW50IG5vdCBmb3VuZCEnKTtcbiAgICB9XG5cbiAgICByZXMucmVuZGVyKCdwYWdlcy9zaW5nbGUnLCB7XG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICBzdWNjZXNzOiByZXEuZmxhc2goJ3N1Y2Nlc3MnKVxuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZWVkIHRoZSBkYXRhYmFzZVxuICovXG5mdW5jdGlvbiBzZWVkRXZlbnRzKHJlcSwgcmVzKSB7XG4gIC8vIGNyZWF0ZSBzb21lIGV2ZW50c1xuICBjb25zdCBldmVudHMgPSBbXG4gICAgeyBuYW1lOiAnQmFza2V0YmFsbCcsIGRlc2NyaXB0aW9uOiAnVGhyb3dpbmcgaW50byBhIGJhc2tldC4nIH0sXG4gICAgeyBuYW1lOiAnU3dpbW1pbmcnLCBkZXNjcmlwdGlvbjogJ01pY2hhZWwgUGhlbHBzIGlzIHRoZSBmYXN0IGZpc2guJyB9LFxuICAgIHsgbmFtZTogJ1dlaWdodGxpZnRpbmcnLCBkZXNjcmlwdGlvbjogJ0xpZnRpbmcgaGVhdnkgdGhpbmdzIHVwJyB9LFxuICAgIHsgbmFtZTogJ1BpbmcgUG9uZycsIGRlc2NyaXB0aW9uOiAnU3VwZXIgZmFzdCBwYWRkbGVzJyB9XG4gIF07XG5cbiAgLy8gdXNlIHRoZSBFdmVudCBtb2RlbCB0byBpbnNlcnQvc2F2ZVxuICBFdmVudC5yZW1vdmUoe30sICgpID0+IHtcbiAgICBmb3IgKGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEV2ZW50KGV2ZW50KTtcbiAgICAgIG5ld0V2ZW50LnNhdmUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNlZWRlZCFcbiAgcmVzLnNlbmQoJ0RhdGFiYXNlIHNlZWRlZCEnKTtcbn1cblxuLyoqXG4gKiBTaG93IHRoZSBjcmVhdGUgZm9ybVxuICovXG5mdW5jdGlvbiBzaG93Q3JlYXRlKHJlcSwgcmVzKSB7XG4gIHJlcy5yZW5kZXIoJ3BhZ2VzL2NyZWF0ZScsIHtcbiAgICBlcnJvcnM6IHJlcS5mbGFzaCgnZXJyb3JzJylcbiAgfSk7XG59XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgY3JlYXRpb24gZm9ybVxuICovXG5mdW5jdGlvbiBwcm9jZXNzQ3JlYXRlKHJlcSwgcmVzKSB7XG4gIC8vIHZhbGlkYXRlIGluZm9ybWF0aW9uXG4gIHJlcS5jaGVja0JvZHkoJ25hbWUnLCAnTmFtZSBpcyByZXF1aXJlZC4nKS5ub3RFbXB0eSgpO1xuICByZXEuY2hlY2tCb2R5KCdkZXNjcmlwdGlvbicsICdEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC4nKS5ub3RFbXB0eSgpO1xuXG4gIC8vIGlmIHRoZXJlIGFyZSBlcnJvcnMsIHJlZGlyZWN0IGFuZCBzYXZlIGVycm9ycyB0byBmbGFzaFxuICBjb25zdCBlcnJvcnMgPSByZXEudmFsaWRhdGlvbkVycm9ycygpO1xuICBpZiAoZXJyb3JzKSB7XG4gICAgcmVxLmZsYXNoKCdlcnJvcnMnLCBlcnJvcnMubWFwKGVyciA9PiBlcnIubXNnKSk7XG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgnL2V2ZW50cy9jcmVhdGUnKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyBldmVudFxuICBjb25zdCBldmVudCA9IG5ldyBFdmVudCh7XG4gICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogcmVxLmJvZHkuZGVzY3JpcHRpb25cbiAgfSk7XG5cbiAgLy8gc2F2ZSBldmVudFxuICBldmVudC5zYXZlKChlcnIpID0+IHtcbiAgICBpZiAoZXJyKVxuICAgICAgdGhyb3cgZXJyO1xuXG4gICAgLy8gc2V0IGEgc3VjY2Vzc2Z1bCBmbGFzaCBtZXNzYWdlXG4gICAgcmVxLmZsYXNoKCdzdWNjZXNzJywgJ1N1Y2Nlc3NmdWx5IGNyZWF0ZWQgZXZlbnQhJyk7XG5cbiAgICAvLyByZWRpcmVjdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBldmVudFxuICAgIHJlcy5yZWRpcmVjdChgL2V2ZW50cy8ke2V2ZW50LnNsdWd9YCk7XG4gIH0pO1xufVxuIiwiY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRpc3BsYXlIb21lOiAocmVxLCByZXMpID0+IHtcbiAgIC8vIHJlbmRlciBsb29rIGluIHZpZXdzIGZvbGRlclxuICAgcmVzLnJlbmRlcigncGFnZXMvaG9tZScpO1xuICAgLy9yZXMuc2VuZChgZXhwcmVzcyBzZXJ2ZXIgaXMgcnVubmluZyBvbiBwb3J0ICR7cG9ydH1gKTtcbiAgIH1cbn07XG4iLCJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyksXG4gIHNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcblxuLy8gY3JlYXRlIGEgc2NoZW1hXG5jb25zdCBldmVudFNjaGVtYSA9IG5ldyBzY2hlbWEoe1xuIG5hbWUgOiBTdHJpbmcsXG4gc2x1Zzoge1xuICB0eXBlOiBTdHJpbmcsXG4gIHVuaXF1ZTogdHJ1ZVxuIH0sXG4gZGVzY3JpcHRpb24gOiBTdHJpbmdcbn0pO1xuLy9taWRkbGV3YXJlXG5ldmVudFNjaGVtYS5wcmUoJ3NhdmUnLCBmdW5jdGlvbihuZXh0KSB7XG4gdGhpcy5zbHVnID0gc2x1Z2lmeSh0aGlzLm5hbWUpO1xuIG5leHQoKTtcbn0pO1xuLy8gY3JlYXRlIHRoZSBtb2RlbFxuY29uc3QgZXZlbnRNb2RlbCA9IG1vbmdvb3NlLm1vZGVsKCdFdmVudCcsIGV2ZW50U2NoZW1hKTtcbi8vIGV4cG9ydCB0aGUgbW9kZWxcbmZ1bmN0aW9uIHNsdWdpZnkodGV4dClcbntcbiAgcmV0dXJuIHRleHQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJy0nKSAgICAgICAgICAgLy8gUmVwbGFjZSBzcGFjZXMgd2l0aCAtXG4gICAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJycpICAgICAgIC8vIFJlbW92ZSBhbGwgbm9uLXdvcmQgY2hhcnNcbiAgICAucmVwbGFjZSgvXFwtXFwtKy9nLCAnLScpICAgICAgICAgLy8gUmVwbGFjZSBtdWx0aXBsZSAtIHdpdGggc2luZ2xlIC1cbiAgICAucmVwbGFjZSgvXi0rLywgJycpICAgICAgICAgICAgIC8vIFRyaW0gLSBmcm9tIHN0YXJ0IG9mIHRleHRcbiAgICAucmVwbGFjZSgvLSskLywgJycpOyAgICAgICAgICAgIC8vIFRyaW0gLSBmcm9tIGVuZCBvZiB0ZXh0XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50TW9kZWw7XG4iXX0=
