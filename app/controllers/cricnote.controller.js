var fs = require('fs');
var path = require('path');
const db = require("../models");
const Newscricnote = db.Cricnote;


exports.createnews = (req, res) => {
  console.log(req.body)
  if (!req.body.title) {
    res.send({ message: "Content can not be empty!" });
    return;
  }
  const newscricnote = new Newscricnote({
    title: req.body.title,
    information: req.body.information,
    newsimg: req.file.filename,
    Category: req.body.Category,
  });
  newscricnote
    .save(newscricnote)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the cricnote news."
      });
    });
}
exports.findAllnews = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Newscricnote.find({})
    .then(data => {
      const newData = data.map((item, index) => {
        item.newsimg = `http://localhost:6688/images/${item.newsimg}`
        return item;
      })
      res.status(200).send(newData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookname."
      });
    });
};
// Find all published cricnote news
exports.findAllcategory = (req, res) => {
  const searchCategory = req.body.Category;

  var condition = searchCategory ? { "Category": { $regex: new RegExp(searchCategory), $options: "i" } } : {};
  Newscricnote.find(condition)
    .then(data => {
      const category = data.filter((item, index) => {
         item.newsimg =`http://localhost:6688/images/${item.newsimg}`
         item.Category =item.Category
         return item;
      })
      res.status(200).send(category)
     
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cricnote news."
      });
    });
  
}


// Find a single cricnote news with an id
exports.findOne = (req, res) => {
  const id = req.body.id;
  Newscricnote.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found cricnote news with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving cricnote news with id=" + id });
    });
};



// // Update a cricnote news by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   console.log(req.body,req)
//   const id = req.body.id;
//   Book.findByIdAndUpdate(id, req, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update cricnote news with id=${id}. Maybe cricnote news was not found!`
//         });
//       } else res.send({ message: "cricnote news was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating cricnote news with id=" + id
//       });
//     });
// };

// Delete a cricnote news with the specified id in the request
exports.delete = (req, res) => {
  const delete1 = req.body.delete1;
  Newscricnote.findByIdAndRemove(delete1, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete cricnote news with id=${id}. Maybe cricnote news was not found!`
        });
      } else {
        res.send({
          message: "book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cricnote news with delete=" + id
      });
    });
};

// Delete all cricnote news from the database.
exports.deleteAll = (req, res) => {
  Newscricnote.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} cricnote news were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cricnote news."
      });
    });
};


