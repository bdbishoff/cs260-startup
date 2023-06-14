function generatePrompt(userInput=false) {
    let eventNumber = Math.floor(Math.random() * 49);
    let randomTopic = [
        "Famous Landmarks",
        "Inventions",
        "World Capitals",
        "Musical Instruments",
        "Olympic Games",
        "Famous Paintings",
        "Classic Novels",
        "Space Exploration",
        "Ancient Civilizations",
        "Movie Trivia",
        "Famous Scientists",
        "Art History",
        "Sports Legends",
        "Natural Wonders",
        "Famous Composers",
        "Historical Events",
        "Celebrities",
        "World Currencies",
        "Plant Species",
        "Broadway Musicals",
        "Geography",
        "Mathematics",
        "Fashion Icons",
        "Food and Drink",
        "National Flags",
        "Literary Characters",
        "World Records",
        "Animal Kingdom",
        "Popular TV Shows",
        "Historical Figures",
        "Technology",
        "Famous Landmarks",
        "Gaming",
        "World Religions",
        "Sports Trivia",
        "Human Anatomy",
        "Political Leaders",
        "Famous Battles",
        "Languages",
        "Music Genres",
        "Art Movements",
        "World Festivals",
        "Cryptocurrency",
        "World Wonders",
        "Famous Monuments",
        "Historical Artifacts",
        "World Explorers",
        "Famous Architects",
        "Renowned Authors",
        "Great Philosophers",
        "Major Religions"
      ];
    
    let topic;
    
    if (userInput) {
      topic = userInput;
    }
    else{
      topic = randomTopic[eventNumber];
    }
    
    return `In a javascript object format, provide me 2 truths and a 
    lie about the following topic: ${topic}.
    Make the lie believable and the truths slightly unbelivable.
     Follow the following format:
    {
      "Topic": "Repeat the topic",
      "truth1": "",
      "truth2": "",
      "lie": "",
      "explanation": "A short sentence of why the lie is false"
    }`;
  }


const config = require('./dbConfig.json');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


async function competitiveGenerate() {
  const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {role: "user", content: generatePrompt()},
  ]
  });
  return JSON.parse(completion.data.choices[0].message.content);
}

async function freePlayGenerate(userInput) {
  const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {role: "user", content: generatePrompt(userInput)},
  ]
  });
  console.log(JSON.parse(completion.data.choices[0].message.content));
  return JSON.parse(completion.data.choices[0].message.content);
}

module.exports = { competitiveGenerate, freePlayGenerate };
