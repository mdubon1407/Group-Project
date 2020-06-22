// Sign In
var logIns = []; // holds a login obj of the form {user: username, pass: password}
var notice = document.getElementById('notice');
var message = [" life is a rollercoaster but you are tall enough to ride.",
                " get $**t done today!", 
                " remember to have fun!",
                " when nothing goes right, go left.",
                " let's party!",
                " think outside the box.",
                " if not now, then you will be one year older when you do.", 
                " be who you want to be!", 
                " the best is yet to come.", 
                " good vibes only!", " think BIG!", 
                " suck it up Butter Cup!", 
                " just breathe...", 
                " you got this!", 
                " stop over-thinking, just do it!", 
                " wake up, kick ass, repeat.", 
                " remember, go ninja, go ninja go!!!", 
                " stop wishing and start doing.", 
                " I see a badass mutha who won't take no crap off of nobody!", 
                " what up!?", 
                " you can do it!" ];

var createUser = function() {
    notice.innerHTML = "";
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;

    if (username == '' && password == '') {
        notice.innerHTML = 'Field Empty';
    }
    else {
        window.localStorage.setItem(username,password);
        notice.innerHTML = "User created";
    }
}


var validation = function() {
    notice.innerHTML = "";
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
    var login = window.localStorage.getItem(username);
    document.getElementById('usernameInput').value = "";
    document.getElementById('passwordInput').value = "";

    if (username == '' && password == '') {
        notice.innerHTML = 'Field Empty';
    }
    else {
        if(login == password){
            notice.innerHTML = "Hello " + username + message[Math.floor(Math.random() * message.length)];
        }else{
            notice.innerHTML = "Invalid username or password";
        }
        
    }
}

