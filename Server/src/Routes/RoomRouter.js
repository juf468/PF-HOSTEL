const { Router } = require("express")

const {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
  } = require("../Handlers/RoomsHandler");


const roomRouter = Router();

roomRouter.get("/", getAllRooms);
roomRouter.posr("/", createRoom);
roomRouter.put("/:id", updateRoom);
roomRouter.delete("/:id", deleteRoom);


module.exports = roomRouter;