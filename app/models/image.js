var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore');

var ImageSchema = new Schema({
  name            : {type: String, unique: true, trim: true},
  description     : {type: String, trim: true},
  image_type      : {type: String, trim: true},
  tags            : {type: [String]},
  private         : {type: Boolean, default: true},
  _docker_repo    : {type: String, trim: true},
  _docker_id      : {type: String, required: true},
  _docker_tag     : {type: String, required: true},
  _docker_created :  {type: Number, required: true},
  _docker_vsize   : {type: Number, required: true},
  _owner          : {type: Schema.ObjectId, ref: 'User'}
});

ImageSchema.statics = {
  load: function(id, cb){
    this.findOne({
      _id: id
    }).populate('_owner').exec(cb);
  }
};

mongoose.model('Image', ImageSchema);