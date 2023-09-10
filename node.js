const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // You can change this port as needed
const outputFolder = '/path/to/your/folder/'; // Replace with your desired folder path

app.use(express.json());

app.post('/createTextFile', (req, res) => {
  try {
    const currentTimestamp = Date.now();
    const currentDateTime = new Date(currentTimestamp);
    const filename = `${currentDateTime.toISOString()}.txt`;
    const filePath = path.join(outputFolder, filename);
    const fileContent = currentDateTime.toString();

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating the file' });
      }
      console.log(`File created: ${filePath}`);
      res.status(201).json({ message: `Text file '${filename}' created successfully` });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
