const fs = require('fs');
const path = require('path');

let pathmale = path.join(__dirname, '1800');
let pathfemale = path.join(__dirname, '2000');

function change(path18, path20) {
    fs.readdir(path18, (err2, files) => {
        if (err2) {
            console.log(err2);
        } else {
            files.forEach(data => {
                fs.readFile(path.join(path18, data), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    const objectJson = JSON.parse(data.toString());
                    if (objectJson.gender === 'male') {
                        fs.rename(path18, path20, err1 => {
                            if (err1) {
                                console.log(err1)
                            }
                        })
                    }
                })
            })
        }
    })
}

change(pathmale, pathfemale)

change(pathfemale, pathmale)
