// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
// дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'newfile'), (err => {
    if (err) {
        console.log(err)
    }
}))

fs.writeFileSync(path.join(__dirname, 'newfile', 'file.txt'), 'Hello OKTEN', (err => {
    if (err) {
        console.log(err)
        throw err;
    }
}));

fs.readFile(path.join(__dirname, 'newfile', 'file.txt'), (err, data) => {
    if (err) {
        console.log(err)
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'newfile', 'file2.txt'), data.toString(), (err => {
        if (err) {
            console.log(err)
            throw err;
        }

    }));
});

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
// старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.mkdir(path.join(__dirname, 'newfile2'), (err => {
    if (err) {
        console.log(err)
    }
}))

fs.writeFileSync(path.join(__dirname, 'newfile2', 'file2.txt'), 'Hello OKTEN WEB', (err => {
    if (err) {
        console.log(err)
        throw err;
    }
}));

fs.readFile(path.join(__dirname, 'newfile2', 'file2.txt'), (err, data) => {
    if (err) {
        console.log(err)
        throw err;
    }

    fs.mkdir(path.join(__dirname, 'newfile2', 'innerfile2'), (err => {
        if (err) {
            console.log(err)
        }
    }))
    fs.writeFile(path.join(__dirname, 'newfile2', 'innerfile2', 'innerfile2.txt'), data.toString(), (err => {
        if (err) {
            console.log(err)
            throw err;
        }
        fs.unlink(path.join(__dirname, 'newfile2', 'file2.txt'), (err => {
            if (err) {
                console.log(err)
            }
        }))
    }));
});

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти,
//     якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

//const fs = require("fs");
//const path = require("path");

fs.mkdir(path.join(__dirname, 'file3'), (err) => {
    if (err) {
        console.log(err);
    }

    fs.mkdir(path.join(__dirname, 'file3', 'file33'), (err) => {
        if (err) {
            console.log(err);
        }
    })

    fs.writeFile(path.join(__dirname, 'file3', 'file3.txt'), 'Hello OKTEN', (err) => {
        if (err) {
            console.log(err);
        }

        checkDate('file3.txt')
    })

})

const checkDate = (itemName) => {
    fs.stat(path.join(__dirname, 'file3', itemName.toString()), (err, stat) => {
        if(err){
            console.log(err);
        }
        if(stat.isFile()){
            fs.truncate(path.join(__dirname, 'file3', itemName.toString()), (err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
        if(!stat.isFile()){
            fs.rename(path.join(__dirname, 'file3', itemName.toString()), path.join(__dirname, 'file3', `_new${itemName.toString()}`), (err) => {
                if(err){
                    console.log(err);
                }
            })
        }
    })
}

checkDate('file3');