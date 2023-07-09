//const { authJwt } = require("../middleware");
const controller = require("../controllers/passenger.controller");

module.exports = function (app) {

    app.post(
        "/api/passenger/createRecord",
        controller.createRecord
    );
   


    //   app.post(
    //     "/api/passenger/saveRecord",
    //     // [authJwt.verifyToken],
    //     controller.saveRecord
    //   );
      app.post(
        "/api/passenger/getAllList",
        controller.getAllList
      );

      app.post(
        "/api/passenger/updateRecord",
        controller.updateRecord
      );
    //   // app.post(
    //   //   "/api/games/getChangedList",
    //   //   [authJwt.verifyToken],
    //   //   controller.getChangedList
    //   // );
      app.post(
        "/api/passenger/deleteRecord",
        controller.deleteRecord
      );
    //   app.post(
    //     "/api/passenger/getSingleRecord",
    //     // [authJwt.verifyToken],
    //     controller.getSingleRecord
    //   );



};