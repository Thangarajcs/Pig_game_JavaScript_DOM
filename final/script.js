

/******************
 * GLOBAL VARIABLES
 */
var activeplayer,roundscore,gameplay,score=[];

//whenever document loaded we are calling this function to make the content to default value
start();
                   /*ROLLING THE DICE*/
document.querySelector('.btn-roll').addEventListener('click',()=>{
if(gameplay){

    //Here we are using the math.random method to genarate the dice values
    var diceroll=Math.floor(Math.random()*6) +1;

    //based on the dice values we are updating the dice image
    document.querySelector('#dice-1').style.display='block';
    document.querySelector('.dice').src='dice-'+diceroll+'.png';
  
    //if the dice value is other than one then current score should be updated
    if(diceroll!=1){
        roundscore+=diceroll;
        document.querySelector('#current-'+activeplayer).textContent=roundscore;
    }

    //if dice value is 1 then control should be passed to the next player
    else{

        //before calling the next player we have to remove the active state of the current player
        document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
        nextplayer();
    }
}
})

/**********
 * HOLD THE CURRENT POINTS TO THE GLOBAL SCORE
 */
document.querySelector('.btn-hold').addEventListener('click',()=>{
    if(gameplay){

        /*when user doesnt want to lose their round score they can hold their value in global score.
        But once if u click hold after updating current player global score control will be passed to the next player?*/
        score[activeplayer]=document.querySelector('#current-'+activeplayer).textContent;
        document.querySelector('#score-'+activeplayer).textContent=score[activeplayer];
    
        /*before passing the control if the current player global score is more than 100 
        then he is winner.Game should stop.Else pass the control to next player*/
          if(score[activeplayer]>=100){
              document.querySelector('#name-'+activeplayer).textContent='winner';
              document.querySelector('#dice-1').style.display='none';
              document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
              document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
              gameplay=false;
          }
          else{
            document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
            nextplayer();
          }
    }
    
})

//implementing the new game functinality
 document.querySelector('.btn-new').addEventListener('click',start);

/**********
 * NEXT PLAYER FUNCTIONALITY
 */

function nextplayer(){

    //checking who is the current player
    activeplayer===0?activeplayer=1:activeplayer=0;
    roundscore=0;

    //current score will be "0" once control passed
    document.querySelector('#current-0').textContent='0';
    document.querySelector('#current-1').textContent='0';

    // adding the active state to the current player
    document.querySelector('.player-'+activeplayer+'-panel').classList.add('active');


}

/********
 * INITIALIZATION FUNCTION
 */
function start(){
    activeplayer=0;
    score[0,0];
    gameplay=true;
    roundscore=0;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}