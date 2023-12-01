const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

function speak(text){
   const text_speak = new SpeechSynthesisUtterance(text);
   text_speak.rate = 1;
   text_speak.volume = 1;
   text_speak.pitch = 1;

   window.speechSynthesis.speak(text_speak);
}

function wish(){
    var day = new Date();
    var hour = day.getHours();
    if(hour >= 0 && hour < 12){
        speak("Good Morning Boss...")
    }

    else if(hour >= 12 && hour < 17){
        speak("Good Afternoon Boss...")
    }

    else{
        speak("Good Evening Boss...")
    }
}

window.addEventListener('load', ()=>{
    speak("Initializing JARVIS...");
    wish();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) =>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening..."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello') || message.includes('hi')){
        speak("Hello Sir, How May I Help You?");
    }

    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }

    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    }

    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('why is')){
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`,"_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }

    else if(message.includes('wikipedia')){
        const wikipediaQuery = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(wikipediaQuery)}`, "_blank");
        const finalText = `Here is what I found on Wikipedia regarding "${wikipediaQuery}"`;
        speak(finalText);
    }

    else if(message.includes('time')){
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"});
        speak(time);
    }

    else if(message.includes('date')){
        const time = new Date().toLocaleString(undefined, {month: "long", day: "numeric"});
        speak(time);
    }

    else if(message.includes('calculator')){
        windows.open('Calculator:///')
        speak("Opening Calculator...");
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ","+")}`,"_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);
    }
}