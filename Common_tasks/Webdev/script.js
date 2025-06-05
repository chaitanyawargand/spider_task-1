//code for the game 
let flag=0;
let angle=270;
let speedvalue=0;
let animationid;
let playerscores=[0,0]
let currentplayer=0;
gameactive=true;
function rotation(){
   speedvalue=speed();
    if(flag===0)
    {
        angle+=speedvalue;
        if(angle>=270){
          angle=270;
          flag=1;
        } }
    else{
        angle-=speedvalue;
        if(angle<=90)
        {
          angle=90;
         flag=0;}}
        document.querySelector('.needle').style.transform=`rotate(${angle}deg)`;
       // animation for smooth rotation
          animationid=requestAnimationFrame(rotation);
        }
   rotation();
// speed maintain

function speed(){
  let radians= (Math.PI/180)*angle;
  return ( 1.5+ 0.5*(Math.abs(Math.cos(radians))));
}
// stop button
function stop(){
  cancelAnimationFrame(animationid);
 }
let scoreangle;
let gameround=0;
document.querySelector('.stop').addEventListener('click',function(){
  if(!gameactive) return ;
  stop();
  scoreangle=angle;
  score();
gameround++;
currentplayer= currentplayer===0?1:0;
if(gameround<=2){
      document.querySelector('.hammer').style.display="block" ;
  setTimeout(() => {
  document.querySelector('.hammer').style.display="none"  
  },200);
}
if(gameround>=2){
  gameactive=false;
  winner();
  playerscores=[0,0];
}
else{
  setTimeout(() => {
    document.querySelector('.players').innerHTML="Player 2's Turn";
    restart();
  },500);
}

});
// restart button
function restart(){
  angle=270;
  flag=0;
  cancelAnimationFrame(animationid);
  rotation();
}
document.querySelector('.restart').addEventListener('click',function(){
  restart();
  document.querySelector('.player-1').innerHTML='player-1 score:0'
  document.querySelector('.player-2').innerHTML='player-2 score:0'
    document.querySelector('.players').innerHTML="Player 1's Turn";
    gameround=0;
    gameactive=true;
})
// score and winning
 function score(){
    if(currentplayer===0){
      playerscores[currentplayer]=scores(currentplayer);
    document.querySelector('.player-1').innerHTML='player-1 score:'+ scores(currentplayer);
    }
    if(currentplayer===1){
            playerscores[currentplayer]=scores(currentplayer);
    document.querySelector('.player-2').innerHTML='player-2 score:'+ scores(currentplayer);
    }
 }
 function scores(player){
  if(angle===180)
    score[player]=100;
  else if(angle>=90 && angle<180 )
    score[player]=Math.round((10*(scoreangle-90))/9);
  else if(angle<=270 && angle>180)
    score[player]=Math.round((10*(270-scoreangle))/9);

  return score[player];
}
// winner condition
function winner(){
if(playerscores[0]>playerscores[1])
   document.querySelector('.players').innerHTML='🎊🎊🎉🎉Congratulation, player-1 win match';
else if(playerscores[0]<playerscores[1])
   document.querySelector('.players').innerHTML='🎊🎊🎉🎉Congratulation, player-2 win match';
else if(playerscores[0]===playerscores[1])
  document.querySelector('.players').innerHTML='Tie Match,play again';
}

