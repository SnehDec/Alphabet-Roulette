
function turn(){
  increment+=degrees_per_execution; // the wheel rotates from its current
  //position, degrees_per_execution degrees clockwise.
  $(".wheel").css("transform", "rotate("+increment+"deg)");

  if (slow_wheel===true){
    degrees_per_execution-=0.009; // wheel "slows down" by decreasing amount rotated
    //per execution of "turn" function.
  }

}
let increment=0; // the complete amount in degrees that the wheel has turned since
//the initial loading of the page.
var degrees_per_execution = 3; //controls speed of wheel
var slow_wheel=false; // indicates the wheel is either at full speed or
//is stationary, but not slowing down.
var letters = ['N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A',
                'Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O'];
var timer = setInterval(turn, 100000);
clearInterval(timer); // initialize timer

function rotate(){
  timer = setInterval(turn, 10);
  $(document).off(); // do not allow entered letter guess to be updated after
  // wheel starts spinning.
  $(".spin").off("click"); // prevent "spin" button being pressed again and
  //affecting wheel's motion.
}

function stop_rotate(){
  setTimeout(function(){clearInterval(timer); slow_wheel=false;degrees_per_execution=3;
                                                              display_letter();
                                                              compare();
                                                              $(".stop").on("click", stop_rotate);
                                                              $(".spin").on("click", rotate);},
                                                              3500);
  slow_wheel=true; // degrees_per_execution decreases so that wheel slows
  $(".stop").off("click"); // stop cannot be pressed multiple times.
}


$(".spin").click(rotate); // spin button is available to be clicked.
$(".stop").click(stop_rotate); // stop button is available to be clicked.

function display_letter(){
  var number_of_rotations = (increment/(360*1.0)); // 1 rotation = 360 degrees
  //after a whole number of rotations, the wheel will look exactly the same as
  //how it started (before "spin" was pressed).
  var remainder = number_of_rotations-Math.floor(increment/360);
  // get the decimal portion to get the fraction of a rotation that the wheel
  //has gone through.
  var number_of_sections = Math.floor((remainder*360)/(360/26));
  // multiply remainder by 360 to get the number of degrees the wheel has rotated
  //through past its initial state. Each wedge of the wheel takes up 360/26
  //degrees. So the number of wedges gone through is number_of_sections.
  //Math.floor is used as the first 360/26 degrees completes the 0th wedge.
  var current_letter = letters[number_of_sections];
  // correlate wedge number to index of letters array.
  $(".answer").text(current_letter); // display the letter of wedge landed on.
}


function enter_guess(e){
  for(let i=0;i<letters.length;i++){
  if (e.key.toUpperCase() ==letters[i]){
    // if the entered key by user is in the letters array, ie., the wheel
    //can land on it, the guess will be displayed and registered. Otherwise,
    //nothing will happen.
  $(".guess").text(e.key);
}
}
}



function compare(){
  if($(".guess").text().toUpperCase()==$(".answer").text()){
    $(".result").text("Yay! You got it!");
    // checks entered guess against letter landed on by wheel and generates
    //suitable heading.
  }
  else{
    $(".result").text("Oh man, try again?");
  }
  $(document).on("keypress", function(e){enter_guess(e)});
  //as the listener is switched off when wheel starts rotating, it's switched on
  // after result is revealed to allow another guess to be entered by user.
}

$(document).on("keypress", function(e){
  enter_guess(e)
}); // the initial page sensitivity to user entering a guess, when page first
//loads but no spin has been made yet.
