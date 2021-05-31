const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Hiba történt a tutorial létrehozása közben"
        });
      });
  };
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Hiba történt a tutorialok lekérése közben"
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Hiba lépett fel a keresés közben" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "A tutorial sikeres frissült"
          });
        } else {
          res.send({
            message: `A tutorial firssítése nem sikerült`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Hiba lépett fel a tutorial frissítése közben"
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sikeres törlés!"
          });
        } else {
          res.send({
            message: `Sikertelen törlés`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Hiba lépett fel a tutorial törlése közben"
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} A tutorialok sikeresen törlődtek!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "A tutorialok törlése közben valamilyen hiba lépett fel."
        });
      });
  };
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "A tutorialok törlése közben valamilyen hiba lépett fel"
        });
      });
  };