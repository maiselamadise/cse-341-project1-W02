// Run with: npm run seed
// Inserts sample contacts into the "contacts" collection so you have data
// to test your GET routes against.

require('dotenv').config();
const { MongoClient } = require('mongodb');

const contacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    favoriteColor: 'Blue',
    birthday: '1990-01-15'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    favoriteColor: 'Green',
    birthday: '1988-07-22'
  },
  {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    favoriteColor: 'Red',
    birthday: '1995-11-30'
  },
  {
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    favoriteColor: 'Orange',
    birthday: '1992-03-08'
  },
  {
    firstName: 'Marcus',
    lastName: 'Lee',
    email: 'marcus.lee@example.com',
    favoriteColor: 'Yellow',
    birthday: '1997-06-19'
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('contacts').insertMany(contacts);
    console.log(`${result.insertedCount} contacts inserted.`);
    console.log('Inserted IDs:', result.insertedIds);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.close();
  }
}

seed();
