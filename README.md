# Records
This is a mixture of an JS/Node/Express API server and Python3 functionality to provide access to reading, sorting, and updating data files. Everyone knows how to
access data for CRUD operations via JS, so I wanted to show what it's like to
create a bridge between JS and Python so we can use the best of both worlds.

## Getting Started

First, install JS dependencies:

```bash
npm install
```

There are no Python3 dependences at the moment other than built-in libraries.

Next, run the server:

```bash
npm start
```

Then in a separate console you can run both Python and JS tests:

```bash
npm test
```

Open [http://localhost:5000/records/gender](http://localhost:5000/records/gender) with your browser to see the sort by gender (females before males) then by last name ascending.

Open [http://localhost:5000/records/birthdate](http://localhost:5000/records/gender) with your browser to see the sort by birth date, ascending.

Open [http://localhost:5000/records/name](http://localhost:5000/records/gender) with your browser to see the sort by last name, descending.

POST to [http://localhost:5000/records](http://localhost:5000/records) with file, delimiter, and record data to save the record.

The record should have these attributes:
- lastName
- firstName
- gender
- favoriteColor
- dateOfBirth