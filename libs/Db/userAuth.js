const bcrypt = require('bcrypt');

const {getMongoDbConnection} = require('../../Db/config');
const COLLECTIONS = require('../../Db/DbCollections/collections');
const {saltRounds} = require('../../config/config');

module.exports.findUser = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      const db = await getMongoDbConnection();
      const collection = db.collection(COLLECTIONS.userDetails);
      //console.log(collection,"collection");
      const response = await collection.find({email: data.email}).toArray();
      console.log(response, 'res');
      if (response.length === 0) {
        return resolve({msg: 'User not registered', logged: false});
      } else {
        if (bcrypt.compareSync(data.password, response[0].password)) {
          console.log('password matched!!!!!!!!!');
          return resolve({msg: 'User logging success', logged: true});
        } else {
          return resolve({msg: 'incorrect password', logged: false});
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.insertUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
      const db = await getMongoDbConnection();
      const collection = db.collection(COLLECTIONS.userDetails);
      const response = await collection.insertOne({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        password: hashedPassword,
        email: data.email,
        phone: data.phone,
        city: data.city,
        country: data.country,
        imageUrl: data.imageUrl,
      });
      console.log(response);
      if (response.insertedCount) return resolve(response);
      return reject({msg: 'User not inserted'});
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.updatePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
      const db = await getMongoDbConnection();
      const collection = db.collection(COLLECTIONS.userDetails);
      const response = await collection.findOneAndUpdate(
        {email: data.email},
        {$set: {password: hashedPassword}}
      );
      // console.log(response);
      if (response.ok)
        return resolve({status: true, msg: 'password changed successfully'});
      return reject({status: false, msg: 'something went to wrong'});
    } catch (error) {
      reject(error);
    }
  });
};
