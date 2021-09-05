
//set default time
var min = 10;
var sec = 00;

var TIMER_ON = false;

window.addEventListener("keydown", function(event) {

	if(event.code == "Space"){
		start_btn_pressed();
	}
	else if(event.code == "KeyS"){
		switch_page();	
	}
	else if(event.code == "KeyR"){
		rese();	
	}

	//alert(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);

});

window.onload = function() {
	//set timer text to default time
    document.getElementById("timer_text").innerHTML = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
};

function switch_page(){

	var current_url = window.location.href;
	console.log(current_url);
	if(current_url.search("index.html") != -1){
		window.location.href = './0830.html';
	}
	else{
		window.location.href = './index.html';
	}

}


function set_time(set_min, set_sec){

	if(!TIMER_ON){
		min = set_min;
		sec = set_sec;
		refresh();
	}
}

function reset() {
	location.reload();
}


function refresh() {
	//set timer text to "min" and "sec"
	document.getElementById("timer_text").innerHTML = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
}

function start_btn_pressed() {

    if (TIMER_ON) {

        TIMER_ON = false;
        document.getElementById("start_btn").innerHTML = "開始";
    }
	else {
        TIMER_ON = true;
        document.getElementById("start_btn").innerHTML = "暫停";

        var tmp = new Date();
        tmp.setMinutes(tmp.getMinutes() + min);
        tmp.setSeconds(tmp.getSeconds() + sec);
        var countDownDate = tmp.getTime();

        var x = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
			distance += 1000;

            // Time calculations for days, hours, minutes and seconds
            //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="timer_text"
            //document.getElementById("timer_text").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
			document.getElementById("timer_text").innerHTML = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer_text").innerHTML = "時間到";
            }
			// If remaining time is less than 30s, text become yellow
			if (distance < 30000) {
                document.getElementById("timer_text").style["color"] = "yellow";
			}
			else {
                document.getElementById("timer_text").style["color"] = "none";
			}

            if (!TIMER_ON) {
                clearInterval(x);
                min = minutes;
                sec = seconds;
                refresh();
            }

        }, 1000);
    }
}


function set_time_bar_toggle() {

    var x = document.getElementById("set-time-bar");

    if (x.style.display === "none") {
        x.style.display = "inline";
    } else {
        x.style.display = "none";
    }
}

function set_custom_time() {
	if(!TIMER_ON){

		var min_input = document.getElementById("min_input").value;
		var sec_input = document.getElementById("sec_input").value;
		console.log(min_input, sec_input);

		if(min_input == ""){
			min_input=0;
		}
		if(sec_input == ""){
			sec_input=0;
		}

		min = parseInt(min_input);
		sec = parseInt(sec_input);
		refresh();

	}
}

/*
function toolbar_hide() {

    var x = document.getElementById("toolbar");
    var y = document.getElementById("toggle_btn");
    if (x.classList.contains("hide")) {
        x.classList.remove("hide");
        y.innerHTML = "隱藏";
    } else {
        x.classList.add("hide");
        y.innerHTML = "顯示";
    }
}
*/
