var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postProjectAndDo(project, callback) {
    Axios.post('/api/project', project)
        .then(function (response) {
            callback(response.data);
        });
}

function postNewProjectAndDo(name, password, successCallback, errorCallback) {
    Axios.post('/api/project/new', {name, password})
        .then(
            function onSuccess(response) {
                successCallback(response.data);
            }, function onError(response) {
                errorCallback(response.status);
            }
        );
}

function postProjectPairingAndDo(projectId, successCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairing')
        .then(function (response) {
            successCallback(response.data);
        })
}

function getRecommendedPairingAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/recommend')
        .then(function (response) {
            successCallback(response.data);
        });
}

function postLoginAndRedirect(name, password, errorCallback) {
    Axios.post('/login', {name: name, password: password})
        .then(
            function onSuccess(response) {
                window.location.href = response.data;
            },
            function onError(response) {
                errorCallback(response.status);
            }
        );
}

module.exports = {
    postProjectAndDo,
    postNewProjectAndDo,
    postProjectPairingAndDo,
    getRecommendedPairingAndDo,
    postLoginAndRedirect
};
