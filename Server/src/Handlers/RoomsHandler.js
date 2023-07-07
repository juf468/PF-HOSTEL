const { Room, Hotel, conn } = require("../db");

const getAllRooms = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const data = await Room.findAll({
      where: {
        hotelId: hotelId,
      },
    });

    if (data.length === 0) {
      throw Error("Not rooms found");
    }

    let rooms_array = [];

    data.forEach((room) => {
      const one_room = {
        id: room.id,
        hotelId: room.hotelId,
        description: room.description,
        pax: room.pax,
        services: room.services,
        price: room.price,
      };
      rooms_array.push(one_room);
    });
    return res.status(200).json(rooms_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createRoom = async (req, res) => {
  const { name, hotelId, description, pax, services, photo, floorNumber, price} =
    req.body;
  try {
    const newRoom = await Room.create({
      name,
      hotelId,
      description,
      pax,
      services,
      photo,
      floorNumber,
      price,
    });

    const hotel = await Hotel.findByPk(hotelId);

    const RoomsIds = hotel.roomsId;

    RoomsIds.push(newRoom.id);

    await Hotel.update(
      { roomsId: RoomsIds },
      {
        where: {
          id: hotelId,
        },
      }
    );

    return res.status(201).send("Room created successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).send("Habitacion no encontrada");
    }

    await room.update(req.body);
    return res.status(200).send("Update successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send("Habitacion no encontada");
    }


    const hotel = await Hotel.findOne({ where: { id: room.hotelId } })
    const newRoomsId = hotel.roomsId.filter((roomId) => roomId !== room.id);

    const poproom = await hotel.update({ roomsId: newRoomsId });
    const destroyroom = await room.destroy();

    await Promise.all([poproom, destroyroom])

    return res.status(200).send("Habitacion eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
