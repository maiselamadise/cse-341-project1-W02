const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// Fields required on every contact document
const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

// Returns an array of any required fields missing (or empty) on the request body
const getMissingFields = (body) =>
  REQUIRED_FIELDS.filter((field) => body[field] === undefined || body[field] === '');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single contact by id
router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }

    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - create a new contact. All fields are required.
router.post('/', async (req, res) => {
  try {
    const missing = getMissingFields(req.body);
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }

    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const db = getDb();
    const result = await db.collection('contacts').insertOne(newContact);

    if (!result.acknowledged) {
      return res.status(500).json({ error: 'Failed to create contact' });
    }

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update an existing contact by id. All fields are required.
router.put('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }

    const missing = getMissingFields(req.body);
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }

    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const db = getDb();
    const result = await db
      .collection('contacts')
      .replaceOne({ _id: contactId }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remove a contact by id.
router.delete('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact id' });
    }

    const contactId = new ObjectId(req.params.id);
    const db = getDb();
    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
