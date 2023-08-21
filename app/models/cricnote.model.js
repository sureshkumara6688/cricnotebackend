
const { type } = require("os");
const { stringify } = require("querystring");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      information: {
        type: String,
        required: true
      },
   
      newsimg: {
        type: String,
        required: true
      },
     
      Category: {
        type: String,
        required: true
      }
    });
  const Cricnotenews = mongoose.model("Cricnote", schema);
  return Cricnotenews;
};
