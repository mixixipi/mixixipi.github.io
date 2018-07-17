window.onload = function(){(window.onresize = function(){
    var width = document.documentElement.clientWidth - 150;
    var height = document.documentElement.clientHeight - 130;
    if (width >= 0) {
        document.getElementById('main').style.width = width + 'px';
    }
    if (height >= 0) {
        document.getElementById('aside').style.height = height + 'px';
        document.getElementById('main').style.height = height + 'px';
    }
})()};

function nav(j){
    for (var i=0; i<4; i++) {
        document.getElementById('nav'+i).style.backgroundColor = '#3b6ea5';
        document.getElementById('nav'+i).style.color = '#fff';
        document.getElementsByTagName('dl')[i].style.display = 'none';
    }
    document.getElementById('nav'+j).style.backgroundColor = '#fff';
    document.getElementById('nav'+j).style.color = '#3b6ea5';
    document.getElementsByTagName('dl')[j].style.display = 'block';
}