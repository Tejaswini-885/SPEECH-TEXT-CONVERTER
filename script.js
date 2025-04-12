const output = document.getElementById('output');
const micIcon = document.getElementById('mic-icon');
const buttonText = document.getElementById('button-text');
const startBtn = document.getElementById('start-btn');

let isRecording = false;
let finalTranscript = '';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.continuous = true; // Keep listening until manually stopped
recognition.interimResults = true; // Show text as you're speaking

startBtn.addEventListener('click', () => {
    if (!isRecording) {
        recognition.start();
        isRecording = true;
        micIcon.src = "https://cdn-icons-png.flaticon.com/512/61/61444.png";
        buttonText.textContent = "Recording... Click to stop";
        finalTranscript = ''; // Clear previous text
    } else {
        recognition.stop();
        isRecording = false;
        micIcon.src = "download.jpg";
        buttonText.textContent = "Click on the mic to start recording";
    }
});

recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }
    output.textContent = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
    output.textContent = 'Error occurred in recognition: ' + event.error;
    isRecording = false;
    micIcon.src = "https://cdn-icons-png.flaticon.com/512/69/69524.png";
    buttonText.textContent = "Click on the mic to start recording";
};
