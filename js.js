var Button = document.getElementById("letter")
Button.onclick = function() {
    location.href="letter.html";
}



$(document).ready(function(){
            if (localStorage.getItem("Authorization")){
                $('#menu').append('<a href="" class="text-danger px-3" onclick="logout()">Выйти</a>');
                show();
            } else{
               $('#menu').append('<a class="text-light px-3" data-toggle="collapse" href="#top" role="button" aria-expanded="false" aria-controls="top">Авторизация</a><a class="text-light px-3" href="https://hardlshardls.pythonanywhere.com/users/">Регистрация</a>');

               $('#top').append('<h3 class="text-center mb-2" id="themes">Авторизация</h3><form id="signupform"><div class="form-group col-md-4 mx-auto"><label for="exampleInputEmail1">Username</label><input type="text" class="form-control form-control-sm" placeholder="Enter username" id="username"><label for="exampleInputPassword1">Password</label><input type="password" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="Password"><button class="btn btn-success mt-3" onclick="setInterval(signin)">Войти</button><p class="text-danger" id="errors"></p></div></form>');

               $('#content').append('<p class="p-4 text-center text-danger">Контент доступен только авторизованным пользователям</p>');
            }
        });

        function show(){
             $.ajax({
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    url: "https://hardlshardls.pythonanywhere.com/api/themes/",
                    headers: {
                        'Authorization': localStorage.getItem("Authorization"),
                    },
                    success: function(response){
                        for(num in response){
                            var name = response[num]["name"];
                            var descr = response[num]["description"];
                            var author = response[num]["author"]["username"];
                            var slug = response[num]["author"]["slug"];
                            var img = response[num]["image"];
                            $('#content').append('<h3 class="text-center my-4" id="themes">Themes</h3><div class="px-3 rounded border"><h4 class="text-center my-3">' + name + '</h4><img class="rounded" src="' + img + '" alt="" id="content-image"><p class="mt-3">' + descr + '</p><small><a class="text-light" href="https://hardlshardls.pythonanywhere.com/users/id' + slug + '">' + author + '</a></small></div>');
                        };
                        $('#menu').append('<a href="#themes" class="text-light px-3">Themes</a>');
                    }
                });
        };
        function signin(){
            var username = document.getElementById("username").value
            var password = document.getElementById("exampleInputPassword1").value
            if(username !='' && password !=''){
                $.ajax({
                  url: "https://hardlshardls.pythonanywhere.com/api-token-auth/",
                  type: "POST",
                  data: {'username':username, 'password':password},
                  dataType: 'json',
                  success: function(response){
                      localStorage.setItem("Authorization", "Token " + response["token"]);
                      window.location.reload();
                  },
                  error: function (jqXHR, exception) {
                    var msg = jqXHR.responseText;
                    $('#errors').html(msg);
                  },
                  dataType: 'json'
                });
            }
        };

        function logout(){
            localStorage.removeItem("Authorization")
            window.location.reload();
        }
