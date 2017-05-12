$(document).ready(function(){

	// hide the questions at the start of the game
	$('#trivia').hide();

	// var that will hold the setInterval that runs the countdown
	var intervalID;

	// countdown variable at the start
	var timerStart = 100;

	// time we're counting down to
	var timerEnd = 0;

	var running = false;

	// audio file
	var audio = new Audio('assets/javascript/allstar.mp3');

	var audio2 = new Audio('assets/javascript/imagineallstar.mp3')

	// click start to start the game
	$('#startBTN').on('click', function(){
		// function to display the trivia questions & counter
		
		// make the start button disappear
		$('#startBTN').hide();

		$('#shrek').hide();

		$("#timer").html("<h3>" + timerStart + " seconds left</h3>");

		if (!running) {

			audio2.pause();
			audio2.currentTime = 0;
			
			// set timer
			intervalID = setInterval(countdown, 1000);

			running = true;

			audio.addEventListener('ended', function(){
				// loop after finished
				this.currentTime = 0;
				this.play();
			}, false);

			audio.play();
		}

		// display the trivia
		$('#trivia').show();

	});

	$('#submitBTN').on('click', function(){
	// on button click

		// clear the timer
		clearInterval(intervalID);

		running = false;

		// hide the trivia questions
		$('#trivia').hide();

		$('#startBTN').hide();

		$('#shrek').hide();

		console.log("finished");

		audio.pause();
		audio.currentTime = 0;

		// show the results
		validateResults(userA, correct);

		return false;

	});

	function countdown(){
		// countdown timer 120 sec

		// decrement the time
		timerStart--;

		// display
		$("#timer").html("<h3>" + timerStart + " seconds left</h3>");


		if (timerStart == timerEnd) {
		// game ends when time runs out

			running = false;

			// clear the timer
			clearInterval(intervalID);

			// hide the trivia questions
			$('#trivia').hide();

			audio.pause();
			audio.currentTime = 0;

			// show the results
			validateResults(userA, correct);

		}

	}

	// create variables to store score
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var correctA = ["C","B","C","E","D"];
	var userA = [];

	function validateResults (userA, correct) {
		// function for input validation

		audio2.addEventListener('ended', function(){
			// loop after finished
			this.currentTime = 0;
			this.play();
		}, false);

		audio2.play();

		$('input[type="radio"]:checked').each(function(){
		// grab checked radio values

			//push values in array
			userA.push($(this).val().toString());

		});

		console.log("correct answers: " + correctA);
		console.log("user answers: " + userA);

		for (var i = 0; i < correctA.length; i++) {
	
			if (userA[i] == "" || userA[i] == null) {
				unanswered++;
			}

			console.log("unanswered: " + unanswered);

			if(userA[i] == correctA[i]) {
				correct++;
			} 

			console.log(userA[i] + " " + correctA[i]);
			console.log("correct: " + correct);

			if (userA[i] != correctA[i] && userA[i] != "" && userA[i] != null) {
				incorrect++;
			}
			console.log("incorrect: " + incorrect);

		}

		// update score
		$('div#results').html("<img id='results' src='assets/images/results.png' />" +
							"<h2>Correct: " + correct + "</h2>" + 
							"<h2>Incorrect: " + incorrect + "</h2>" + 
							"<h2>Unanswered: " + unanswered + "</h2>"
							);
	}


});