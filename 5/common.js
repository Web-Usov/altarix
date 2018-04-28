fetch('https://api.github.com/search/users?q=vlukyanoff')
    .then(function (response) {
        return response.json()
    })
    .then(function (users) {
    console.log(users);
});