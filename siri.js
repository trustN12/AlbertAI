$(document).ready(function () {
    // Siri configuration
    var siriWave = new SiriWave({
        container: document.getElementById("siri-container"),
        width: 400,
        height: 77,
        style: "ios9",
        amplitude: "1",
        speed: "0.30",
        autostart: false
    });

    var isSiriWaveVisible = false; // Track visibility state

    document.getElementById("MicBtn").addEventListener("click", function () {
        if (isSiriWaveVisible) {
            console.log("Hiding Siri wave");
            var siriContainer = document.getElementById("siri-container");
            siriContainer.classList.add("hidden");
            siriWave.stop();
        } else {
            console.log("Showing Siri wave");
            var siriContainer = document.getElementById("siri-container");
            siriContainer.classList.remove("hidden");
            siriWave.start();
        }
        isSiriWaveVisible = !isSiriWaveVisible; // Toggle the state
    });
});
