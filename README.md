## 💡 Inspiration
- We have been forced to stay at home due to the pandemic, and people are doubtful about going out to consult doctors nowadays.
- People are opting towards online personal health care.
- As a result, we developed a personal care webapp that allows patients to consult doctors from the comfort of their own homes.
- There are over a million deaf and dumb people. There are over 75% of people who are uneducated. 
- So we've devised MedZone as a solution to the problem, so that it is accessible to everyone, regardless of their disabilities, to consult a doctor online.

## 💻 What it does
- Med-Zone has 3 features as of now. 
- Each portion of the Med Zone will have its own room ID, which will be given to patients by the respective doctors that they want to consult with.
- There is a chat room where you can communicate with your doctor.
- There is a video room where you may communicate with your doctor via video call.
- Last but not least, there is a gesture room where mute and uneducated people can communicate with doctors using sign language. 
- It's fine if the doctor doesn't understand sign language; we have machine learning models that can decode sign language into text.

## ⚙️ How we built it
- We made our client-end using React.js.
- We made our server-end using Express.js.
- We then built our client-side in netlify and our server-side in heroku.


## 🧠 Challenges we ran into
- Making an accurate gesture of handpose.
- Encoding handpose gesture to text.
- Creating a secure and private video and chat room for doctors and patients, respectively.

## 📖 What we learned
- Socket in express.js
- Tensorflow.js for detecting handpose.
- Machine Learning for gesture detection.
- Deploying our websites in netlify, heroku.

## 🚀 What's next for Med Zone
- Text-to-Gesture Encoding from Doctor to Client.
- Implementing a chat box in the video section.
- Implementing chat bot.
- Training our ML model to encode and decode many gestures.

## 🏅 Accomplishments that we're proud of
- We're glad to sucessfully complete this project!
- The end goal was met to a satisfactory level, and the outcome would allow everyone to be treated from the comfort of their own home.

## 🔨 How to run
- Click on this link https://medzone.netlify.app/home 
            or
- Fork the repo
- Clone repo to your local storage
- Install require node_modules
- Open server-end in command prompt and execute "npm start" command
- Open client-end in command prompt and execute "npm start" command
