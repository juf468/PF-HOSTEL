const { Router } = require("express");
const { getallhotels, createHotel } = require("../Handlers/HotelHandler");
const { CreateUserForEmail } = require("../Handlers/UsersHandler");
const {
  createRoom,
  getallRooms,
  updateRoom,
  deleteRoom,
} = require("../Handlers/RoomsHandler");

const router = Router();

router.get("/hotels", getallhotels);
router.post("/hotel", createHotel);
router.post("/signup", CreateUserForEmail);
router.get("/room", getallRooms);
router.post("/room", createRoom);
router.delete("/room/:id", deleteRoom);
router.put("/room/:id", updateRoom);

module.exports = router;
