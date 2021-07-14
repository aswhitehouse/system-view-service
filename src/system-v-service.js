const express = require('express')
const fs = require('fs');
const app = express();
const port = 3005;
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    fs.readFile('resources/log.txt', 'utf-8', (err, data) => {
        if(err) throw err;
        let reg = /\n/;
        let rawValues = data.split('x-corr-id:');
        let values = {};
        for(let i = 1; i < rawValues.length; i++) {
            values['id'+i] = rawValues[i].replace(reg, '');
        }
        res.send(JSON.stringify(values));
    })
})

app.listen(port, () => {
  console.log(`System View app listening at http://localhost:${port}`)
});