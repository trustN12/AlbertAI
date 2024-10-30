let btn = document.querySelector("#MicBtn");
let content = document.querySelector("#chatbox");
let siri = document.querySelector("#siri-container");

// Function to speak a given text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.8;  // Set speaking rate
    text_speak.pitch = 0.8;  // Set pitch
    text_speak.volume = 1;   // Set volume
    text_speak.lang = "en-US"; // Set language
    window.speechSynthesis.speak(text_speak); // Speak the text
}

// Function to greet the user
function wishMe() {
    speak(`Hello there, I am Albert AI. How can I help you?`);
    
}

// Event listener for when the window loads
window.addEventListener('load', function() {
    wishMe(); // Greet the user
});

// Initialize speech recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Event listener for when speech recognition results are available
recognition.onresult = (event) => {
    let currIndex = event.resultIndex; // Get current index of result
    let transcript = event.results[currIndex][0].transcript; // Get the spoken text
    content.innerText = transcript; // Display the text in chatbox
    takeCommand(transcript.toLowerCase()); // Process the command
};

// Event listener for the button click to start recognition
btn.addEventListener("click", () => {
    recognition.start(); // Start speech recognition
});

// Variable to keep track of game state
let gameInProgress = false;

// Function to process the spoken command
function takeCommand(msg) {
    
    // Greeting commands
    if (msg.includes("hello") || msg.includes("hey") || msg.includes("hi")) {
        speak("Hello there, I am Albert AI. How can I help you?");
    }
    else if (msg.includes("i wish you can fuck yourself")) {
        speak("shut the fuck up, i am not here to fuck myself,kindly consult a doctor and tell that you are a crazy person! asshole");
    }
    else if (msg.includes("i love you albert")) {
        speak("i love you too Nabarun");
    }
    else if (msg.includes("please sing a song for me")) {
        speak("la lalala lal la wo hu ruru la lalala lal lala lalala lal la la lalala lal la la lalala lal lala lalala lal la laa, pardon me, this is the worst song ever, i can't sing like a human!");
    }

    // Identity query
    else if (msg.includes("who are you")) {
        speak(`I am Albert AI, your dedicated virtual assistant, thoughtfully designed by my developer, Nabarun Biswas. With Nabarun's expertise, I am here to streamline your daily tasks and enhance your productivity. Whether you have questions, need support, or just want to explore new ideas, I am ready to assist you. How can I make your day better today?`);
    }
    // Commands to open websites
    else if (msg.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://youtube.com", "_blank");
    }
    else if (msg.includes("open google")) {
        speak("Opening Google.");
        window.open("https://google.com", "_blank");
    }
    else if (msg.includes("open facebook")) {
        speak("Opening Facebook.");
        window.open("https://facebook.com", "_blank");
    }
    else if (msg.includes("open calculator")) {
        speak("Opening calculator.");
        window.open('https://www.calculatorsoup.com/calculators/math/basic.php', "_blank");
    }
    
    // Time and date commands
    else if (msg.includes("what time is it") || msg.includes("current time")) {
        const now = new Date();
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeString = now.toLocaleString('en-US', options);
        speak(`The current time is ${timeString}.`);
    }
    else if (msg.includes("what date is it") || msg.includes("current date")) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        speak(`Today's date is ${dateString}.`);
    }
    // Search command
    else if (msg.includes("search")) {
        const searchQuery = msg.replace("search", "").trim();
        if (searchQuery) {
            speak(`Searching for ${searchQuery} on Google.`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
        } else {
            speak("What do you want to search for?");
        }
    }
    // Music playing command
    else if (msg.includes("play some music on youtube")) {
        const musicQuery = msg.replace("play some music on youtube", "").trim();
        if (musicQuery) {
            speak(`Playing ${musicQuery} on YouTube.`);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(musicQuery)}`, "_blank");
        } else {
            speak("Playing some music on YouTube.");
            window.open("https://www.youtube.com/watch?v=p5sOL3wiWHo&autoplay=1", "_blank");
        }
    }
    // Joke command
    else if (msg.includes("can you tell me a joke")) {
        const jokes = [
            "why not? Why don't scientists trust atoms? Because they make up everything!",
            "why not? Why did the bicycle fall over? Because it was two-tired!",
            "why not? What do you call fake spaghetti? An impasta!",
            "why not? Why don't skeletons fight each other? They don't have the guts!",
            "why not? What did one wall say to the other wall? I'll meet you at the corner!"
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    }
    // Trivia command
    else if (msg.includes("tell me a trivia")) {
        const trivia = [
            "Bananas are berries, but strawberries are not.",
            "Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.",
            "A group of flamingos is called a flamboyance.",
            "Octopuses have three hearts.",
            "There are more stars in the universe than grains of sand on all the Earth's beaches."
        ];
        const fact = trivia[Math.floor(Math.random() * trivia.length)];
        speak(fact);
    }
    // Story command
    else if (msg.includes("tell me a story")) {
        const story = "Once upon a time in a small village, there lived a wise old owl who could answer any question. People traveled from far and wide to seek his advice. One day, a curious little mouse approached him and asked, 'What is the secret to happiness?' The owl replied, 'The secret to happiness is to find joy in the little things.'";
        speak(story);
    }
    // Reminder command
    else if (msg.includes("remind me to")) {
        const timeMatch = msg.match(/in (\d+) (minute|minutes|hour|hours)/);
        const reminder = msg.replace("remind me to ", "").replace(/in \d+ (minute|minutes|hour|hours)/, "").trim();
    
        if (timeMatch && reminder) {
            const timeValue = parseInt(timeMatch[1], 10); // Extract time value
            const timeUnit = timeMatch[2]; // Extract time unit
            let timeInMilliseconds;
    
            // Convert time to milliseconds
            if (timeUnit.startsWith('minute')) {
                timeInMilliseconds = timeValue * 60 * 1000;
            } else if (timeUnit.startsWith('hour')) {
                timeInMilliseconds = timeValue * 60 * 60 * 1000;
            }
    
            speak(`Reminder set for "${reminder}" in ${timeValue} ${timeUnit}.`);
    
            // Set timeout for the reminder
            setTimeout(() => {
                speak(`Reminder: ${reminder}`);
            }, timeInMilliseconds);
        } else {
            speak("Please specify both the reminder and the time.");
        }
    }
    // Quote command
    else if (msg.includes("give me a quote") || msg.includes("tell me a quote")) {
        const quotes = [
            "Believe you can and you are halfway there.",
            "The only way to do great work is to love what you do.",
            "Success is not the key to happiness. Happiness is the key to success.",
            "Your time is limited, don't waste it living someone else's life.",
            "The best revenge is massive success."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        speak(quote);
    }
    // Calculation command
    else if (msg.includes("calculate")) {
        const calculation = msg.replace("calculate", "").trim();
        try {
            const result = eval(calculation); // Caution: eval can be dangerous; validate input in production code
            speak(`The result of ${calculation} is ${result}.`);
        } catch (error) {
            speak("I'm sorry, I couldn't calculate that. Please check your math.");
        }
    }
    // Recipe suggestion command
    else if (msg.includes("suggest me a recipe")) {
        const dish = msg.replace("suggest me a recipe for", "").trim().toLowerCase();

        const recipes = {
            "pasta": {
                ingredients: [
                    "200g pasta",
                    "2 tbsp olive oil",
                    "2 cloves garlic, minced",
                    "1 can diced tomatoes",
                    "Salt and pepper to taste",
                    "Fresh basil"
                ],
                instructions: [
                    "Boil the pasta according to package instructions.",
                    "In a skillet, heat olive oil over medium heat. Sauté the minced garlic until fragrant.",
                    "Add diced tomatoes, season with salt and pepper, and simmer for 10 minutes.",
                    "Combine the pasta with the sauce and top with fresh basil before serving."
                ]
            },
            "chocolate cake": {
                ingredients: [
                    "1 cup flour",
                    "1 cup sugar",
                    "1/2 cup cocoa powder",
                    "1/2 cup butter",
                    "2 eggs",
                    "1 tsp baking powder",
                    "1/2 cup milk"
                ],
                instructions: [
                    "Preheat the oven to 350°F (175°C).",
                    "Mix all ingredients in a bowl until smooth.",
                    "Pour into a greased cake pan and bake for 30-35 minutes.",
                    "Let cool before serving. Enjoy your cake!"
                ]
            },
            "dinner": {
                ingredients: [
                    "300g chicken breast, sliced",
                    "2 cups mixed vegetables (like bell peppers and broccoli)",
                    "2 tbsp soy sauce",
                    "1 tbsp ginger, minced",
                    "2 tbsp oil for frying"
                ],
                instructions: [
                    "Heat oil in a pan over medium-high heat.",
                    "Add the chicken and stir-fry until cooked through.",
                    "Add vegetables and soy sauce, cooking until tender.",
                    "Serve hot over rice or noodles."
                ]
            }
        };

        const recipe = recipes[dish];

        // Check if the recipe exists
        if (recipe) {
            speak(`Here's a delicious recipe for ${dish.charAt(0).toUpperCase() + dish.slice(1)}:\n` +
                  `**Ingredients:** ${recipe.ingredients.join(", ")}.\n` +
                  `**Instructions:** ${recipe.instructions.join(" ")}`);
        } else {
            speak("I'm sorry, I don't have a recipe for that dish. How about trying pasta, chocolate cake, or chicken stir-fry?");
        }
    }
    // Book recommendation command
    else if (msg.includes("can you recommend me a book")) {
        const genre = msg.replace("can you recommend me a book in", "").trim();
        const recommendations = {
            "fiction": "You might enjoy 'The Great Gatsby' by F. Scott Fitzgerald.",
            "non-fiction": "How about 'Sapiens: A Brief History of Humankind' by Yuval Noah Harari?",
            "fantasy": "Check out 'The Hobbit' by J.R.R. Tolkien.",
            "mystery": "You could read 'Gone Girl' by Gillian Flynn.",
        };

        const recommendation = recommendations[genre.toLowerCase()];
        // Provide the recommendation if available
        if (recommendation) {
            speak(recommendation);
        } else {
            speak("I don't have a recommendation for that genre. Try fiction, non-fiction, fantasy, or mystery.");
        }
    }
    // Game command to start Rock, Paper, Scissors
    else if (msg.includes("let's play a game")) {
        speak("Great! Let's play Rock, Paper, Scissors. Please choose rock, paper, or scissors.");
        gameInProgress = true; // Set game state to in progress
    } else if (gameInProgress) { // If a game is in progress
        const options = ["rock", "paper", "scissors"];
        const userChoice = msg.trim().toLowerCase();

        // Validate user's choice
        if (options.includes(userChoice)) {
            const computerChoice = options[Math.floor(Math.random() * options.length)]; // Random choice for computer
            speak(`You chose ${userChoice}. I chose ${computerChoice}.`);

            // Determine the outcome of the game
            if (userChoice === computerChoice) {
                speak(`It's a tie! We both chose ${userChoice}. Let's go again. Please pick rock, paper, or scissors.`);
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                speak(`You win! ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} crushes ${computerChoice}. Fantastic choice! Want to play again?`);
            } else {
                speak(`I win! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${userChoice}. Better luck next time! Ready for another round?`);
            }
            
            // Reset the game state if it's not a tie
            if (userChoice !== computerChoice) {
                gameInProgress = false;
            }
        } else {
            speak("Please choose rock, paper, or scissors to play."); // Prompt for valid choice
        }
    } else if (msg.includes("yes") && !gameInProgress) {
        // Restart the game if the user says yes
        speak("Great! Let's play Rock, Paper, Scissors. Please choose rock, paper, or scissors.");
        gameInProgress = true; // Set game state to in progress
    } else if (msg.includes("no") && !gameInProgress) {
        speak("Thanks for playing! Let me know if you want to play again later."); // End the game
    }
    // Weather inquiry command
    else if (msg.includes("what is the weather") || msg.includes("weather in")) {
        const location = msg.replace("what is the weather in", "").replace("weather in", "").trim();
        
        if (location) {
            getWeather(location); // Get the weather for the specified location
        } else {
            speak("Please tell me a location to check the weather."); // Prompt for location
        }
    }
    else {
        // Fallback for unrecognized commands
        let mainText = "This is what I discovered online about..." + msg.replace("albert","") || msg.replace("algo bot","")
        speak(mainText); // Speak the fallback text
        window.open(`https://www.google.com/search?q=${msg.replace("albert","")}`, "_blank"); // Search for the command
    }
}

// Function to get the weather for a given location
function getWeather(location) {
    const apiKey = "af9482b39e76860e1a2b25d34920431e"; // Replace with your OpenWeatherMap API key
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    fetch(geocodeUrl)
        .then(response => {
            if (!response.ok) { // Check if the response is okay
                throw new Error("Weather not found.");
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            const temperature = data.main.temp; // Extract temperature
            const weatherDescription = data.weather[0].description; // Extract weather description
            speak(`The current temperature in ${location} is ${temperature} degrees Celsius with ${weatherDescription}.`);
        })
        .catch(error => {
            console.error(error); // Log the error to the console
            speak("I'm sorry, I couldn't fetch the weather information. Please try again later."); // Handle error
        });
}
