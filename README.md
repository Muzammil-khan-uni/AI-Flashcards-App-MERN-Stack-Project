# AI Flashcards App


The traditional method of creating flashcards, while effective for active recall and spaced repetition, can be a time-consuming and laborious process. In an age where information is abundant and time is a premium, a more efficient way to generate these study tools is highly desirable. This project, the AI-Powered Flashcard Generation Application, addresses this need by integrating cutting-edge artificial intelligence to automate and streamline the creation of flashcards.
The core objective of this application is to provide users with a seamless experience for transforming blocks of text into structured, reviewable flashcards. By harnessing the capabilities of Google's Gemini API the system can intelligently parse input material and generate relevant question-and-answer pairs, significantly reducing the manual effort typically involved.
Key functionalities and components of the application include:
1.	User Authentication and Management:
o	Secure user registration with username, email, and hashed passwords (using bcryptjs).
o	User login functionality with session management (express-session and connect-mongo) to maintain user state across requests.
o	A dedicated logout feature to securely end user sessions.
2.	AI-Powered Flashcard Generation:
o	Users can input any text (e.g., notes, articles, book excerpts) into a designated area on the dashboard.
o	The backend communicates with the Gemini API, sending the text and a prompt to generate five flashcards in a "Q: &lt;question> A: &lt;answer>" format.
o	Generated flashcards are then saved to the user's account in the MongoDB database.
3.	Flashcard Management and Features:
o	Each flashcard is stored with a userId, question, answer, nextReview date (initialized to the creation date), a difficulty level (defaulting to 'medium' or user-selected during generation), and a boolean favorite status.
o	Users can toggle the favorite status of any flashcard, allowing for quick filtering and focused study sessions.
o	The dashboard allows users to switch between viewing all their flashcards and only their favorited ones.
o	Flashcards are visually distinguished by color based on their difficulty level (easy, medium, hard) for quick identification.
4.	Interactive Dashboard:
o	A central hub for users to generate new flashcards, view existing ones, and track their learning progress.
o	A bar chart visually represents the distribution of flashcards across different difficulty levels, offering insights into study material.
o	A dark mode toggle is available for enhanced user comfort and preference.
5.	Technological Stack:
o	Backend: Node.js with the Express.js framework.
o	Database: MongoDB with Mongoose ODM for data modeling and interaction.
o	Frontend: React.js for building a responsive and interactive user interface, styled with Bootstrap.
o	AI Integration: @google/generative-ai SDK for interacting with the Gemini API.
o	Routing and State Management (Frontend): react-router-dom for navigation and component state for UI updates.
o	API Communication: fetch API for asynchronous requests between the frontend and backend, with CORS configured for local development.
This application serves as a practical demonstration of how AI can be integrated into educational tools to create personalized and efficient learning experiences. It aims to empower users by transforming passive text consumption into an active and engaging study method.


Sign Up:

![image alt](https://github.com/Muzammil-khan-uni/AI-Flashcards-App/blob/main/Screenshot/signup.png?raw=true)
 

Login:

 ![image alt](https://github.com/Muzammil-khan-uni/AI-Flashcards-App/blob/main/Screenshot/Login.png)

Dashboard:

 ![image alt]()
 
![image alt]()




Write any topic or word or paragraph & Select the difficulty level

 ![image alt]()

Then click on Generate Flashcards Button

 ![image alt]()

Then see Flashcard Progress

 ![image alt]()


& Scroll down to see Flashcards

 
![image alt]()


If you Like or want to save any Flashcards click on heart 

 ![image alt]()

Then see these Flashcards in Favorite Whenever you want

![image alt]()
 
You see different difficulty level Flashcards in different colors like Easy in Green, Medium in Yellow, and Hard in Red color

![image alt]() 
 

Dark mode

 ![image alt]()
 ![image alt]()

