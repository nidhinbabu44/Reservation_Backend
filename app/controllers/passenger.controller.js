
const db = require("../models");
// const sysapp = require("angles_common/app");
// const syslog = require("angles_common/app/services/log.services");
const Passenger = db.passenger;
const Op = db.Sequelize.Op;
const { or, INTEGER, where } = require("sequelize");
const Sequelize = require("sequelize");


exports.createRecord = (req, res) => {
  //validate for mandatory fields
  if (!req.body.passenger_id || !req.body.passenger_name) {
    res.status(400).send({
      message: "Failed! mandatory fields are not provided, please check",
    });
  } else {
    if (req.body.id != null) {
      res.status(400).send({
        message:
          "Failed! Id should not be provided for new record, please check",
      });
    } else {
      Passenger.create({
        passenger_id: req.body.passenger_id,
        passenger_name: req.body.passenger_name,
        passenger_age: req.body.passenger_age,
        passenger_address: req.body.passenger_address,
        last_modified_by: req.body.last_modified_by,
        remarks: req.body.remarks,
      })
        .then((passenger) => {

          res.send({
            message: "Record created successfully",
            id: passenger.id,
          });
        })
        .catch((err) => {
          if (!res.headersSent) res.status(500).send({ message: err.message });
        });
    }
  }
};



exports.getAllList = (req, res) => {
  if (!req.body.passenger_id) {
    res.status(200).send({
      message: "Failed! mandatory fields are not provided, please check",
    });
  } else {
    search_value = "";
    if (req.body.search_value) {
      search_value = req.body.search_value;
    }
    Passenger.findAll({
      //logging: console.log,
      where: {
        passenger_id: req.body.passenger_id,
        passenger_name: { [Op.ne]: null },
        [Sequelize.Op.or]: [
          { passenger_name: { [Op.like]: `%${search_value}%` } },
        ],
      },
      order: [['passenger_name', 'ASC']],
    }).then((passenger) => {
      if (passenger) console.log("passenger : " + passenger.length);
      res.status(200).send({
        message: "Success",
        listData: passenger,
      });
    });
  }
};

exports.updateRecord = async (req, res) => {
  if (!req.body.id || !req.body.passenger_name) {
    res.send({
      message: "Mandatory fields are not provided...",
    });
  } else {
    Passenger.findOne({
      where: { id: req.body.id },
    }).then(async (passenger) => {
      if (passenger) {
        passenger.passenger_name = req.body.passenger_name;
        passenger.passenger_age = req.body.passenger_age;
        passenger.passenger_address = req.body.passenger_address;
        
        await passenger
          .save()
          .then((result) => {
            res.send({
              message: "Record saved successfully",
            });
          })
          .catch((error) => {
            res.send({
              message: "Some error occured",
              error_details: error.message,
            });
            return;
          });
      } else {
        res.send({
          message: "Record not found...",
        });
      }
    });
  }
};

exports.deleteRecord = (req, res) => {
  if (!req.body.passenger_id ||  !req.body.id) {
    res.status(400).send({
      message: "Failed! mandatory fields are not provided, please check",
    });
  } else {
    Passenger.findOne({
      logging : console.log,
      where: {
        id: req.body.id,
        passenger_id: req.body.passenger_id,
      },
    }).then((passenger) => {
      if (!passenger) {
        res.status(400).send({
          message: "Failed! Record not found, please check",
        });
      } else {
        Passenger.destroy({ where: { id: req.body.id, passenger_id: req.body.passeneger_id } });
        // syslog.updateLog(
        //   req.body.org_id,
        //   req.body.last_modified_by,
        //   "Games deleted : " + games.game_name,
        //   "games",
        //   req.body.id
        // );
        res.status(400).send({
          message: "Success! record deleted",
        });
      }
    });
  }
};