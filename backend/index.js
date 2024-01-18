const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser'); 
const Questions = require("./Model/questions");
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// Create a new item
app.post('/questions', async (req, res) => {
  try {
    const newExam = new Questions(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items
app.get('/questions', async (req, res) => {
  try {
    const items = await Questions.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific item by ID
app.get('/questions/:id', async (req, res) => {
  try {
    const item = await Questions.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

// Update an item by ID
app.put('/questions/:id', async (req, res) => {
  try {
    const updatedItem = await Questions.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an item by ID
app.delete('/questions/:id', async (req, res) => {
  try {
    const deletedItem = await Questions.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () =>{
    console.log("Backend Is Running", port);
});