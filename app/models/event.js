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
