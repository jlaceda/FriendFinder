const express = require('express');
const path = require('path');
const router = express.Router();

const htmlPages = ['home', 'survey']

for (let i = 0; i < htmlPages.length; i++) {
	const page = htmlPages[i];
	router.get(`/${page}`, function(req, res) {
		res.sendFile(path.join(__dirname, `../public/${page}.html`));
	});
}

module.exports = router;