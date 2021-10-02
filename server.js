const express = require('express');
const fs = require("fs");

// Create server
const app = express();

// Serve files
app.use(express.static('./public'));

// Listen on port
app.listen(1234, () => {
    console.log("Listening on port 1234");
});



app.get(`/update`, (req,res)=>{
    // /update?callback={}action={}&user={}&task_book={}&section={}&direction={up/down}
    let q = req.query;
    switch(q.action) {
        case "shiftSection": {
            shiftSection(q.direction, Number(q.user), Number(q.task_book), Number(q.section));
            break;
        }
    }
    let data = require('./data.json');
    // console.log(data.users[Number(q.user)]);
    res.send(`${q.callback}('${JSON.stringify(data.users[Number(q.user)].task_books[Number(q.task_book)])}')`);
});


function shiftSection(dir, user_ind, task_book_ind, section_ind) {
    let data = require('./data.json');
    let s = data.users[user_ind].task_books[task_book_ind].sections;

    if (dir=='up' && section_ind > 0) {

        arraySwap(s, section_ind, section_ind-1);
        overwriteData(data);

    } else if (dir=='down' && section_ind < s.length-1) {

        arraySwap(s, section_ind, section_ind+1);
        overwriteData(data);
    }
}

function arraySwap(arr, ind1, ind2) {
    let temp = arr[ind1];
    arr[ind1] = arr[ind2];
    arr[ind2] = temp;
}

function overwriteData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));
}

// data.users[0].task_books[0].sections[0].tasks[0].completed = false;
// fs.writeFileSync('data.json', JSON.stringify(data, null, '\t'));