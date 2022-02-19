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
  let { id, job, company, platform, otherPlatform, link, status, user, date } = req.body
  platform = platform === 'other' ? otherPlatform : platform
  const newJob = {
    id,
    job,
    company,
    platform,
    link,
    status,
    user,
    date
  }
  try {
    // connect to the database
    const { db } = await connectToDatabase();
    // add the post
    await db.collection('habits').insertOne(newJob);
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

  const { id, user } = req.body;
  try {
    // Connecting to the database
    const { db } = await connectToDatabase();
    // deleting the habit
    await db.collection('habits').deleteOne({
      user,
      id
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
  const { id, user, status } = req.body;
  console.log(status)
  try {
    // connect to the database
    const { db } = await connectToDatabase();
    // update the length of streak 
    await db.collection('habits').updateOne(
      { id, user },
      { $set: { status: status } }
    );
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