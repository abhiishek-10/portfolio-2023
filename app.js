// Imports
const express = require('express');
const app = express();
const port = 3000;


// Static Files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/assets', express.static(__dirname + 'public/assets'));
app.use('/js', express.static(__dirname + 'public/js'));


// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


app.get('', (req, res) => {
    res.render('index')
})

app.get('/work', (req, res) => {
    res.render('work')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})





// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));