const userName = document.querySelector('#userName');
const btn = document.querySelector('#btn-login');

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let nick = userName.value;

    if(nick == ""){
        alert('Morate da unesete vase korisnicko ime');
    }else{
        window.localStorage.setItem('user', userName.value);
        location.href = "./index.html"; 
    }
})


// login animation

$('#login-button').click(function(){
    $('#login-button').fadeOut("slow",function(){
      $("#container").fadeIn();
      TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
      TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
    });
  });
  
  $(".close-btn").click(function(){
    TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
    $("#container, #forgotten-container").fadeOut(800, function(){
      $("#login-button").fadeIn(800);
    });
  });