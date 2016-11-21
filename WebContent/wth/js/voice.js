var voices = [];
		
	function playVoiceMessages(msg){
			var u1 = new SpeechSynthesisUtterance(msg);
			  u1.lang = 'haw-US';
			  u1.pitch = 1;
			  u1.rate = 0.9;
			  u1.voice = voices[8];
			  u1.voiceURI = 'native';
			  u1.volume = 1;
			  speechSynthesis.speak(u1);
			  
			  u1.onend=function (event)
			  {
			  	startRecognizing();
			  }
			  
	};
		
	var recognizing = false;
	var ignore_onend;	
 	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	
	recognition.onstart = function() {
	  recognizing = true;
    };
  
  	recognition.onerror = function(event) {
  		alert(event.error);
		if (event.error == 'no-speech') {
		  ignore_onend = true;
		}
		if (event.error == 'audio-capture') {
			ignore_onend = true;
		}
		if (event.error == 'not-allowed') {
		}
	  };
	  
  	recognition.onend = function() {
		recognizing = false;
	  };
  
  recognition.onresult = function(event) {
    var interim_transcript = '';
    var final_transcript='';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        
        findAction(event.results[i][0].transcript);
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
  };
	
	function startRecognizing()
	{
		
		var interval = setInterval(function(){ checkForRecognization() }, 2000);
		
		function checkForRecognization()
		{
			if(!recognizing)
			{
				clearInterval(interval);
				recognition.start();	
			}
		}
		
	}