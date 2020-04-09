const fetch = require('node-fetch');

const apiKey = '5a9ac523';

exports.imdbReq = title => {
    return new Promise((resolve, reject) => {
        fetch(`http://www.omdbapi.com/?apiKey=${apiKey}&t=${title}`)
            .then(res => res.json())
            .then(json => {
                resolve(json);
            })
            .catch(err => {
                reject(err);
            });
    });
};