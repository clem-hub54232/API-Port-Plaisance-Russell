// const Catway = require('../models/catway');

// exports.getByEmail = async (req, res, next) => {
//   const id = req.params.id;

//   try {
//     const catway = await Catway.findById(id);

//     if (catway) {
//       return res.status(200).json(catway);
//     }

//     return res.status(404).json('catway_not_found');
//   } catch (error) {
//     console.error('GET CATWAY ERROR:', error);
//     return res.status(500).json({
//       message: 'server_error',
//       error: error.message
//     });
//   }
// };

// exports.add = async (req, res, next) => {
//   const temp = {
//     name: req.body.name,
//     firstname: req.body.firstname,
//     email: req.body.email,
//     password: req.body.password
//   };

//   try {
//     const catway = await Catway.create(temp);
//     return res.status(201).json(catway);
//   } catch (error) {
//     console.error('ADD CATWAY ERROR:', error);
//     return res.status(500).json({
//       message: 'server_error',
//       error: error.message
//     });
//   }
// };