const inquirer = require('inquirer');

const {
    readFile,
    writeFile,
} = require('./helpers/fileHandler');
const {
    imdbReq,
} = require('./helpers/apiReq');

let result;

inquirer.prompt([{
            type: 'input',
            name: 'username',
            message: 'Enter your username',
            validate(input) {
                if (input && input.length <= 10) {
                    return true;
                }
                return 'invalid username';
            },
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password',
            validate(input) {
                if (input && input.length <= 10) {
                    return true;
                }
                return 'invalid password';
            },
        },
    ])
    .then(answers => {
        result = answers;
        return readFile('./users.json');
    })
    .then(users => {
        const newUsers = JSON.parse(users).length > 0 ? JSON.parse(users) : [];
        const foundUser = newUsers.filter(user => user.username === result.username);
        if (foundUser.length > 0 && foundUser[0].password === result.password) {
            return;
        } else {
            newUsers.push({
                username: result.username,
                password: result.password
            });
            return writeFile('./users.json', JSON.stringify(newUsers));
        }
    })
    .then(() => {
        return inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Enter your movie,tv show title',
            validate(input) {
                if (input && input.length <= 20) {
                    return true;
                }
                return 'invalid title';
            },
        }]);
    })
    .then(answers => {
        return imdbReq(answers.title);
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });