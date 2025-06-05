// game functionality
var timer=30;
var timerid=null;
var player1=prompt('player-1 Name: ')
var player2=prompt('player-2 Name: ')
var gamesound= document.querySelector('.gamesound');
var winsound= document.querySelector('.winsound');
var sound=true;
document.querySelector('.sound').addEventListener('click',function(){
  sound=sound===true?false:true;
    document.querySelector('.sound').innerHTML=(sound===true?'🔊 Sound: ON':'🔊 Sound: OFF')
})
var modeToggle=document.querySelector('.light-mode');
modeToggle.addEventListener('click',function(){
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    modeToggle.src='assets/svg/dark-mode-icon.svg';
  }else{
    modeToggle.src='assets/svg/light-mode-icon.svg';
  }
}
)

var currentplayer_text= document.querySelector('.current-player');
currentplayer_text.innerHTML=player1+"'s turn";
function playertimer(){
  clearInterval(timerid);
  timer=30;
   document.querySelector('.timer').innerHTML='timer:'+timer+'s';
   timerid= setInterval(() => {
    timer--;
    document.querySelector('.timer').innerHTML='timer:'+timer+'s';
    if(timer<=0)
    {
      clearInterval(timerid);
      if(sound)winsound.play();
      currentplayer===0?currentplayer_text.innerHTML=player2+(" wins! 🎉🎉🎊🎊"):currentplayer_text.innerHTML=player1+(" wins! 🎉🎉🎊🎊")
      winnername=currentplayer===0?player1:player2;
      updateleader(winnername);
    }
  },1000);
}
playertimer();

const container=document.querySelector('.grid-container');
function gridmaker(){
for(var i=0;i<36;i++){
    var circle= document.createElement('div');
    circle.classList.add('circle');
    circle.classList.add('circle--'+i);
    circle.setAttribute('data-clicked','false');
    container.appendChild(circle);
  }
}
const coloumn= document.querySelector('.coloumn');
function blockmaker(){
    for(var i=0;i<6;i++){
        var block=document.createElement('div');
        block.classList.add('btn');
        block.classList.add('block');
        block.innerHTML='block'+(i+1);
        block.setAttribute('data-value',i);
        block.style.fontSize=15+'px';
        block.setAttribute('data-clicked','false');
        coloumn.appendChild(block);
    }
}
blockmaker();
gridmaker();
var circlearray = [];
var blockcirclearray=[];
for (var i=0;i<6;i++) {
  circlearray[i]=[]; 
  for (var j=0;j<6;j++) {
    var circle=document.querySelectorAll('.circle')[i*6+j];
    circlearray[i][j]=circle;
  }}

  function rowname(){
    for(var i=0;i<6;i++){
    for(var j=i;j<36;j+=6){
        document.querySelectorAll('.circle')[j].setAttribute('data-infor','block-'+i)
      }
}};
rowname();
for(var i=0;i<6;i++){
  blockcirclearray[i]=[];
  for(var j=0;j<6;j++){
  var circle= document.querySelectorAll('.circle')[i+6*j]
  blockcirclearray[i][j]=circle;
  }
}
var currentplayer=0;
var scores=[0,0];
var gameactive=true
var currentplayer1=1;
let blockcol=-1;
let blockused=false;
// click handler
var winnername;
function circleclickedfunction(e){
      if(!gameactive)return;
    var block=e.target.getAttribute('data-infor');
    const blockarray = Array.from(document.querySelectorAll(`.circle[data-infor='${block}']`));
    for(var i=blockarray.length-1;i>=0;i--){
   if(blockarray[i].getAttribute('data-clicked')==='false'){
     var targetcircle=blockarray[i];
      if(sound) gamesound.play();
    playertimer();
     let index= Array.from(document.querySelectorAll('.circle')).indexOf(targetcircle);
     let rowindex=Math.floor(index/6);
     let colindex=index%6;
     if(currentplayer===0){
        targetcircle.classList.add('red');
        currentplayer_text.innerHTML=player2+"'s turn";
      } else{
        targetcircle.classList.add('yellow');
        currentplayer_text.innerHTML=player1+"'s turn";
      }
      targetcircle.setAttribute('data-clicked', 'true');
      if(checkwin(rowindex,colindex,currentplayer===0?'red':'yellow')){
      clearInterval(timerid);
      gameactive=false;
      if(sound) winsound.play();
      currentplayer===0?currentplayer_text.innerHTML=player1+(" wins! 🎉🎉🎊🎊"):currentplayer_text.innerHTML=player2+(" wins! 🎉🎉🎊🎊")
      winnername=currentplayer===0?player1:player2;
      document.querySelectorAll('.circle').forEach(c => {
      c.style.cursor='default';
  }); setTimeout(() => {
     updateleader(winnername);
  },500);
  return;
    }
    const allclicked = Array.from(document.querySelectorAll('.circle')).every(function(circle){
       return circle.getAttribute('data-clicked')==='true'
    })
     if(allclicked){
    currentplayer_text.innerHTML = "It's a draw! Well played!";
    gameactive = false;
    clearInterval(timerid)
    setTimeout(() => {
    document.querySelector('.leaderboard-popup').style.display = 'block';
    showleaderboard();
    },500);
    return;
  }

      currentplayer1=currentplayer;
      currentplayer=currentplayer===0 ? 1 : 0;
      if(blockcol!==-1){
      blockcirclearray[blockcol].forEach(function(circle){
        circle.style.cursor='pointer';
        circle.style.opacity='1';
        circle.addEventListener('click',circleclickedfunction)
      })
    }
      blockused=false;
      break;
    }
    }
  }

document.querySelectorAll('.circle').forEach(function(circle){
    circle.addEventListener('click',circleclickedfunction);
})
document.querySelector('.reset').addEventListener('click',function(){
 document.querySelectorAll('.circle').forEach(function(circle){
     if(circle.getAttribute('data-clicked')==='true'){
        circle.classList.remove('red', 'yellow')
        circle.setAttribute('data-clicked','false');
     }
      document.querySelector('.current-player').innerHTML = player1 + "'s turn";
      document.querySelector('.leaderboard-popup').style.display = 'none';

  currentplayer=0
   timer=30;
   playertimer();
   gameactive=true;
    if(blockcol!==-1){
      blockcirclearray[blockcol].forEach(function(circle){
        circle.style.cursor='pointer';
        circle.style.opacity='1';
        circle.addEventListener('click',circleclickedfunction)
      })
    }
      blockused=false;
 })
});
// block functionality 
document.querySelectorAll('.block').forEach(function(block){
block.addEventListener('click',function(){
if(!blockused && currentplayer!==currentplayer1){
  const col= Number(block.getAttribute('data-value'));
  const availablity=blockcirclearray[col].some(function(c){
     return c.getAttribute('data-clicked')==='false';
  })
  const availableblock= blockcirclearray.some(function(colarray,index){
    if(index===col) return false;
    return colarray.some(c=>c.getAttribute('data-clicked')==='false');
  })
  if(availablity && availableblock){
    blockcirclearray[col].forEach(function(circle){
      circle.style.cursor='not-allowed';
      circle.style.opacity='0.5';
      circle.removeEventListener('click',circleclickedfunction)
    });
    blockcol=col;
    blockused=true;
  }
}
})
})
// winning 
function checkwin(row,col,color){
  const directions = [[1,0],[0,1],[1,1],[1,-1]];
  for(let[dx,dy] of directions){
     var count=1;
     for(var i=1;i<4;i++){
      let r=row+dx*i;
      let c=col+dy*i;
      if(r<0||r>=6|| c<0|| c>=6)
        break;
      if(!circlearray[r][c].classList.contains(color))break;
      count++;}
    
    for(var j=1;j<4;j++){
      let r=row-dx*j;
      let c=col-dy*j;
      if(r<0||r>=6|| c<0|| c>=6)
        break;
      if(!circlearray[r][c].classList.contains(color))break;
      count++;
    }
    if(count>=4) return true;
  }
  return false;
};
function updateleader(winnername){
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const player = leaderboard.find(p => p.name === winnername);
  if(player) player.score += 1;
  else leaderboard.push({name: winnername, score: 1});

  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  document.querySelector('.leaderboard-popup').style.display='block'
   showleaderboard();
}

function showleaderboard(){
    let leaderboard= JSON.parse(localStorage.getItem('leaderboard')) || [];
    const list= document.querySelector('.leaderboard-list');
    if(!list) return;
    list.innerHTML='';
    leaderboard.slice(0,5).forEach(function(player){
      const li= document.createElement('li');
      li.textContent=player.name+': '+player.score;
      list.appendChild(li);
    })
}
document.querySelector('.close-leaderboard').addEventListener('click', function() {
  document.querySelector('.leaderboard-popup').style.display = 'none';
});
// leaderboard button 
document.querySelector('.leaderboard-btn').addEventListener('click',function(){
  document.querySelector('.leaderboard-popup').style.display='block';
  showleaderboard();
})
