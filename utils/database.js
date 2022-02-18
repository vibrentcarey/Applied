const { connectToDatabase } = require('../lib/mongodb');

export async function getHabits(req, res) {
  const user = req.query.user && req.query.user
  try {
    // connect to the database
    const { db } = await connectToDatabase();
    // fetch the habits
    const habits = await db
      .collection('habits')
      .find({ user: user })
      .toArray();
    // return the habits
    return res.json({
      message: JSON.parse(JSON.stringify(habits)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export async function addHabit(req, res) {
  try {
    // connect to the database
    const { db } = await connectToDatabase();
    // add the post
    await db.collection('habits').insertOne(req.body);
    // return a message
    return res.json({
      message: 'Habit added successfully',
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export async function deleteHabit(req, res) {
  const { title, user } = req.body;
  try {
    // Connecting to the database
    const { db } = await connectToDatabase();
    // deleting the habit
    await db.collection('habits').deleteOne({
      user,
      title
    });
    // returning a message
    return res.json({
      message: 'Habit deleted successfully',
      success: true,
    });
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export async function updateHabit(req, res) {
  const { title, user, reason, resource } = req.body;
  try {
    // connect to the database
    const { db } = await connectToDatabase();
    // update the length of streak 
    if (!reason && !resource) {
      await db.collection('habits').updateOne(
        { title },
        { $set: { length: 0 } }
      );
    }
    // add a new reason to the reasons array
    if (req.body.reason) {
      await db.collection('habits').updateOne(
        { title, user },
        { $push: { reason } }
      )
    }
    // add a new resource to the resource array
    if (req.body.resource) {
      await db.collection('habits').updateOne(
        { title, user },
        { $push: { resources: { title: resource.title, resourceLink: resource.resourceLink } } }
      )
    }
    // return a message
    return res.json({
      message: 'Habit updated successfully',
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}