document.getElementById('searchForm').onsubmit = function (ev) {
    ev.preventDefault();
    var login = document.getElementById('input');

    var search = 'https://api.github.com/search/users?q='+login.value;

    function status(response) {
        if (response.status >= 200 && response.status < 300) {//проверка статуса ответа
            return Promise.resolve(response)//возвращение промиса
        } else {
            return Promise.reject(new Error(response.statusText))//Вызов ошибки
        }
    }

    function json(response) {
        return response.json()//возврат json объекта
    }

    fetch(search)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('Ответ: ', data.items);
            var users = [];
            for(var i  = 0; i <data.items.length;i++){
                users.push(data.items[i].login);
            }
            var output = "";
            if(users.length>0){
                output = "<ul>";
                if(users.length>5){
                    for(i = 0; i<5; i++){
                        output+="<li>"+users[i]+"</li>";
                    }
                }else {
                    for(i = 0; i<users.length; i++){
                        output+="<li>"+users[i]+"</li>";
                    }
                }
                output+="</ul>";
            }else{
                output = "<span>Вхождений не найдено</span>"
            }
            document.getElementById('output').innerHTML = output;
        })
        .catch(function(error) {
            console.log('Ошибка: ', error);
        });
}