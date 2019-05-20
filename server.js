const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.type('text/plain');
	res.send('JML FriendFinder');
})

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
});

