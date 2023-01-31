const Favorite = require('../Models/favorite');
const User = require("../Models/user")
const Trip = require("../Models/trip");
const catchAsyncErrors = require('../utils/catchAsyncErrors');

// exports.addToFav = async(req, res) => {
//     try {
//       const favorite = new Favorite({ itemId: req.params.itemId });
//       await favorite.save();
//       res.status(201).send(favorite);
//     } catch (error) {
//       res.status(400).send({ error: error.message });
//     }
//   };

exports.saveFavourtieTrip = (req, res) => {
  const { packageId } = req.body;
  // Create a new Trip document in the database
  const trip = new Favorite({ packageId });
  trip
    .save()
    .then((trip) => {
      res.json(trip);
    })
    .catch((error) => {
      console.error("Error saving trip:", error);
      res.status(500).json({ error });
    });
};


  // exports.remToFav = async (req, res) => {
  //   try {
  //     const userId = req.user._id;
  //     const itemId = req.params.itemId;
  //     const user = await User.findById(userId);
  //     user.favorites.pull(itemId);
  //     await user.save();
  //     res.status(200).json({ message: 'Item removed from favorites.' });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

  exports.createTrip = catchAsyncErrors(async(req,res)=>{
    const {
      name,
      description,
    } = req.body;
  
    const trip = await new Trip({
      name,
      description,
      createdBy: req.user._id,
    });
  
    trip.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      if (data) {
        return res.status(201).json({
          trip,
        });
      }
    });
  });

  exports.getAllTrips = async (req, res) => {
    const trips = await Trip.find();
    res.status(200).json({
      success: true,
      trips,
    });
  };
  
  exports.getTrip = async(req,res)=>{
    const id = req.params.id
    const trip = await Trip.findById({_id : id})
    res.status(200).json({
      success:true,
      trip
    })
  }