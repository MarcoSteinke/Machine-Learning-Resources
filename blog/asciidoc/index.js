const express = require('express')
const app = express()
const port = 3000

const Asciidoctor = require('asciidoctor')

app.use(express.static('styles'));

const asciidoctor = Asciidoctor()

const b4import = '<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">';
const nav = '<nav class=\"navbar navbar-expand navbar-light bg-light\">\
<div class=\"nav navbar-nav\">\
    <a class=\"nav-item nav-link active\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\
    <a class=\"nav-item nav-link\" href=\"#\">Home</a>\
</div>\
</nav>';

var html = asciidoctor.convertFile('.README.adoc', { to_file: false, standalone: true })

function renderADOC(html, res) {
    res.send(nav + html + b4import);
}

app.get('/', (req, res) => renderADOC(html, res));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))