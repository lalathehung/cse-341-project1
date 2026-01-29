const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
   //#swagger.tags=['Users']
   const result = await mongodb.getDatabase().db().collection('users').find();
   const users = await result.toArray();
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(users);
};

const getSingle = async (req, res) => {
   //#swagger.tags=['Users']
   try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
      const users = await result.toArray();

      if (users.length === 0) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
   } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid user ID format. Must be 24-character hex string.' });
   }
};

const createUser = async (req, res) => {
   //#swagger.tags=['Users']
   const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
   };

   if (!user.firstName || !user.lastName || !user.email) {
      return res.status(400).json({ error: 'firstName, lastName, email are required' });
   }

   const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
   if (response.acknowledged) {
      res.status(201).json({ _id: response.insertedId });
   } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
   }
};

const updateUser = async (req, res) => {
   //#swagger.tags=['Users']
   try {
      const userId = new ObjectId(req.params.id);
      const user = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         favoriteColor: req.body.favoriteColor,
         birthday: req.body.birthday
      };

      const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
      if (response.modifiedCount > 0) {
         res.status(204).send();
      } else {
         res.status(500).json(response.error || 'Some error occurred while updating the user.');
      }
   } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid user ID format' });
   }
};

const deleteUser = async (req, res) => {
   //#swagger.tags=['Users']
   try {
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
      if (response.deletedCount > 0) {
         res.status(204).send();
      } else {
         res.status(500).json(response.error || 'Some error occurred while deleting the user.');
      }
   } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid user ID format' });
   }
};

module.exports = {
   getAll,
   getSingle,
   createUser,
   updateUser,
   deleteUser
};