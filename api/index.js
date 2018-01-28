import express from 'express';
import {MongoClient, ObjectID} from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;

MongoClient.connect(config.mongodbUri, (err, database) => {
  assert.equal(null, err);
  const db = database.db('test');
  mdb = db;
});

const router = express.Router();

router.get('/contests', (req, res) => {
  let contests = {};
  mdb.collection('contests').find({})
    .project({
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {
      assert.equal(null, err);

      if(!contest){
        res.send({contests});
        return;
      }

      contests[contest._id] = contest;
    })
});

router.get('/names/:namesIds', (req, res) => {
  let names = {}, namesIds = req.params.namesIds.split(',').map(ObjectID);
  if(namesIds.lenght == 0) return {names: {}};
  mdb.collection('names').find({ _id: {$in: namesIds }})
    .each((err, name) => {
      assert.equal(null, err);

      if(!name){
        res.send({names});
        return;
      }

      names[name._id] = name;
    })
});

router.get('/contests/:contestId', (req, res) => {
  mdb.collection('contests')
      .findOne({ _id: ObjectID(req.params.contestId)})
      .then(contest => res.send(contest))
      .catch(console.error);
});

router.post('/names', (req, res) => {
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;
  //validation
  console.log(contestId);
  mdb.collection('names').insertOne({name}).then(result => {
    mdb.collection('contests').findAndModify(
      { _id: contestId },
      [],
      {$push: {nameIds: result.insertedId}},
      {new: true}
    ).then(doc =>{
      console.log(doc);
      res.send({
        updatedContest: doc.value,
        newName: {_id: result.insertedId, name}
      })
    }).catch(error => {
      res.status(404).send("Not Found");
    });
  })
});

export default router;
