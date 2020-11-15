const express = require('express')
const app = express()
const port = 5000
const { spawn } = require('child_process')
const path = require('path');

// JSON header support
// see https://expressjs.com/en/api.html#express.json
app.use(express.json());

/**
 * Get records sorted by gender (females before males) then
 * by last name ascending.
 * @param {Object} req Request object from Express.
 * @param {Object} res Response object from Express.
 * @return {Object} JSON object to be sent via Express to browser.
 */
app.get('/records/gender', (req, res) => {
  let dataToSend = null;

  const python = spawn('python', [
    path.join(__dirname, 'adapter.py'),
    '--file=data/comma.txt',
    '--delimiter=,',
    '--sort=gender',
  ]);
  python.stdout.on('data', function (data) {
    dataToSend = JSON.parse(data.toString());
  });

  python.on('close', (code) => {
    // send data to browser
    res.send(dataToSend)
  });
})

/**
 * Get records sorted by birth date, ascending.
 * @param {Object} req Request object from Express.
 * @param {Object} res Response object from Express.
 * @return {Object} JSON object to be sent via Express to browser.
 */
app.get('/records/birthdate', (req, res) => {
  let dataToSend = null;

  const python = spawn('python', [
    path.join(__dirname, 'adapter.py'),
    '--file=data/comma.txt',
    '--delimiter=,',
    '--sort=birthdate',
  ]);
  python.stdout.on('data', function (data) {
    dataToSend = JSON.parse(data.toString());
  });

  python.on('close', (code) => {
    // send data to browser
    res.send(dataToSend)
  });
})

/**
 * Get records sorted by last name, descending.
 * @param {Object} req Request object from Express.
 * @param {Object} res Response object from Express.
 * @return {Object} JSON object to be sent via Express to browser.
 */
app.get('/records/name', (req, res) => {
  let dataToSend = null;

  const python = spawn('python', [
    path.join(__dirname, 'adapter.py'),
    '--file=data/comma.txt',
    '--delimiter=,',
    '--sort=lastname',
  ]);
  python.stdout.on('data', function (data) {
    dataToSend = JSON.parse(data.toString());
  });

  python.on('close', (code) => {
    // send data to browser
    res.send(dataToSend)
  });
})

/**
 * Post a record to be saved to specified file.
 * @param {Object} req Request object from Express.
 * @param {Object} res Response object from Express.
 * @return {Object} JSON object to be sent via Express to browser.
 */
app.post('/records', (req, res) => {
  let dataToSend = null;
  const python = spawn('python', [
    path.join(__dirname, 'adapter.py'),
    `--file=${req.body.file}`, // file path
    `--delimiter=${req.body.delimiter}`, // separating value
    `--record=${JSON.stringify(req.body.record)}`, // actual record to save
  ]);
  python.stdout.on('data', function (data) {
    dataToSend = JSON.parse(data.toString());
    // dataToSend = data.toString();
  });

  python.stderr.on('data', function(data) {
    console.error(data.toString());
  });

  python.on('close', (code) => {
    // send data to browser
    dataToSend = JSON.parse(dataToSend)
    res.send(dataToSend)
  });
})

app.listen(port, () => {
  console.log(`Records API listening at http://localhost:${port}`)
})