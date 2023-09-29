/******************************************************************************************************************************************************/
/**************************************************                 Components                       **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import {
	getHTMLFile,
	getAppFile,
	getIndexFile,
	getAppCSSFile,
	getIndexCSSFile,
} from "./configuration";

export const getTasks_Components = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "Components";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "Intro to React Components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `React components are the building blocks of React applications. Every piece of user interface is expressed using reusable components. For example, if you take a look on this website, you can see a navigation bar at the top, a box with the text you are currently reading, a code editor with some buttons and an area showing the rendered website or the test results. All of these pieces could be implemented as reusable components. These components can be composed of other components and so on, forming a design by composition.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Basically, a React component is just a JavaScript function that returns a JSX element where the function name <b>needs to be capitalized</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Hello() {
	return (
		<h1>Hello!</h1>
	)
}

// or as an arrow function
const Hello = () => {
	return (
		<h1>Hello!</h1>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This component can now be used inside other components:`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function App() {
	return (
		<div>
			<h1>This is my App!</h1>
			<Hello />
			<Hello />
		</div>
	)
}


// what the browser will see in the end:
<div>
	<h1>This is my App!</h1>
	<h1>Hello!</h1>
	<h1>Hello!</h1>
</div>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `As you can see, HTML tags are lowercase and components are capitalized, so React knows when we want to use a component.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `The choice of using arrow functions vs regular functions as React components is completely opinionated.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.


export {Title, Paragraph, App}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				{
					filename: "index.js",
					code: `import React from "react"
import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
	<App />
);`,
				},
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component "Title" that displays "Welcome to React!" in an h1 tag.
function Title() {
	return (
		<h1>Welcome to React!</h1>
	);
}


// 2) Create a React component "Paragraph" that displays "React makes building user interfaces a breeze." in a p tag.
function Paragraph() {
	return (
		<p>React makes building user interfaces a breeze.</p>
	);
}


// 3) Create a React component "App" that uses both the "Title" and "Paragraph" components you just created. Run your code to see the results.
function App() {
	return (
		<div>
			<Title />
			<Paragraph />
		</div>
	);
}


export {Title, Paragraph, App}`,
				},
			],
		},

		{
			// -- TASK 2 --
			index: index++,
			title: "Importing and Exporting",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `As components are supposed to be reusable, nested units of your app and you will create a lot of components as your app grows, it makes sense to split them into different files to keep an overview. The recommended basic structure of a new React app consists of two files: An index file, rendering the root component, and an app file, the actual root component that gets rendered. Every newly created component will then be part of the root component as one of its children or sub-children etc.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `To manage multiple component files, we need to export our component in that specified new file and import it wherever we are going to use it. We can either use "default" or "named" exports and imports.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// default export:
export default function App() {
	return (
		<h1>Hello World</h1>
	)
}

// named export:
export function App() {
	return (
		<h1>Hello World</h1>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// default import:
import App from "./App"
import AnyNameYouWant from "./App" // valid

// named import:
import {App} from "./App"
import {AnyNameYouWant} from "./App" // invalid
import {App as AnyNameYouWant} from "./App" // valid`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `There are a few key aspects for each import and export type:<p> <h5>Default Export</h5> <ul> <li>You can only have one default export per module.</li> <li>When you import a default export, you can name it anything you like.</li> <li>It's useful when a module only exports one thing, like a component in React.</li> </ul> </p>
					<p> <h5>Named Export</h5> <ul> <li>You can have multiple named exports per module.</li> <li>When you import a named export, you have to use the exact name that was used to export it (or use aliasing).</li> <li>Useful when a module exports multiple things.</li> </ul> </p>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `In React, depending on your team, it might be a convention that component files end with ".jsx" instead of ".js". However, React will recognize and process components in files with either extension and is flexible in this regard.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

// 1) Create a React component called "Greeting" in a file named "Greeting.js" or "Greeting.jsx". The component should render an <h2> tag with the text "Hello, React!". Use default export to export the component.
// hint: Don't forget to import React in your components!


// 2) Create two functions "add" and "subtract" in a file named "Utilities.js". Both functions take two parameters and adds or subtracts the two numbers respectively and returns the result. Use named export to export the two functions.


// 3) Import the "Greeting" component into this file and render it in the App component found below.
// hint: all files in this editor are in the same directory, which means "./" as a prefix will find it


// 4) Import the "add" and "subtract" functions into this file and render their results in the App component found below.
// hint: remember to use curly braces for JavaScript functionality


export default function App() {
	return (
		<div>
			{/* render your "Greeting" component here */}

			{/* call your "add" function here, use parameters 4 and 2*/}

			{/* call your "subtract" function here, use parameters 10 and 1*/}
		</div>
	)
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import Greeting from "./Greeting"
import {add, subtract} from "./Utilities"

// YOUR TASK

// 1) Create a React component called "Greeting" in a file named "Greeting.js" or "Greeting.jsx". The component should render an <h2> tag with the text "Hello, React!". Use default export to export the component.
// hint: Don't forget to import React in your components!


// 2) Create two functions "add" and "subtract" in a file named "Utilities.js". Both functions take two parameters and adds or subtracts the two numbers respectively and returns the result. Use named export to export the two functions.


// 3) Import the "Greeting" component into this file and render it in the App component found below.
// hint: all files in this editor are in the same directory, which means "./" as a prefix will find it


// 4) Import the "add" and "subtract" functions into this file and render their results in the App component found below.
// hint: remember to use curly braces for JavaScript functionality


export default function App() {
	return (
		<div>
			{/* render your component here */}
			<Greeting />
			{/* call your "add" function here, use parameters 4 and 2*/}
			{add(4, 2)}
			{/* call your "subtract" function here, use parameters 10 and 1*/}
			{subtract(10, 1)}
		</div>
	)
}`,
				},
				{
					filename: "Greeting.jsx",
					code: `import React from 'react';

export default function Greeting() {
	return <h2>Hello, React!</h2>;
}`,
				},
				{
					filename: "Utilities.js",
					code: `export function add(a, b) {
	return a + b;
}

export function subtract(a, b) {
	return a - b;
}`,
				},
			],
		},
		{
			// -- TASK 3 --
			index: index++,
			title: "Passing Props to Components",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Just as functions take arguments to produce dynamic outputs, React components can accept inputs too. These inputs are referred to as properties, or more commonly, <b>props</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Props are the mechanism by which data flows down the component tree, enabling a parent component to pass data to its child components. This top-down flow of data ensures that components remain as pure and predictable as possible.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Props are passed through the <b>props</b> object as parameter.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// component with props
function Hello(props) {
	return (
		<h1>Hello {props.name}!</h1>
	)
}

// using the component, passing the name prop
function App() {
	return <Hello name="React" />;
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `There are some key aspects to understand about props:
					<p><ul> <li> <b>Read-only</b>: Props are "read-only", meaning that a component should never modify the props passed to it. Instead, it should always treat them as immutable.</li> <li> <b>Versatility</b>: Props aren't limited to just data. You can also pass functions, allowing child components to communicate back to their parent by invoking those functions.</li> <li> <b>Destructuring</b>: Instead of accessing props through the props object, it is common to destructure them.</li> </ul></p>`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// destructure props
function Hello({ name }) {
	return (
		<h1>Hello {name}!</h1>
	)
}

// with a default value as fallback
function Hello({ name = "React" }) {
	return (
		<h1>Hello {name}!</h1>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/passing-props-to-a-component#" target=”_blank”>more info</a>`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),

				{
					filename: "App.js",
					code: `import React from "react"
import UserProfile from "./UserProfile"
import Greetings from "./Greetings"
import Button from "./Button"
import Car from "./Car"

// YOUR TASK

// 1) Create a component & file named "UserProfile" that accepts a prop "username" and displays it in an <h2> tag.


// 2) Create a component & file named "Greetings" that accepts a prop "username". If the "username" prop isn't provided, it should default to "Stranger". The component should display the message: "Hello, [username]!".


// 3) Create a component & file named "Button" that accepts a prop "onClick" (a function) and a prop "label" (a string). It renders a HTML button element that displays the label and invokes the onClick function when clicked.


// 4) Create a component & file named "Car" that accepts a prop "car". The "car" prop should be an object with properties "brand", "hp", and "mileage". Display these details in a structured manner.


// 5) Finally, render all your components in the "App" component below. Choose any structure you like. Take the following properties as inputs:

export default function App() {

    {/*UserProfile & Greetings*/}
    const username = "Hans"

    {/*Button*/ }
    const onClick = () => {
        alert("Hello!")
    }
    const label = "Hello!"

    {/*Car*/ }
    const car = {
        brand: "Porsche",
        hp: 500,
        mileage: 80000
    }

    {/*render your components*/ }
    return 
    
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import UserProfile from "./UserProfile"
import Greetings from "./Greetings"
import Button from "./Button"
import Car from "./Car"

// YOUR TASK

// 1) Create a component & file named "UserProfile" that accepts a prop "username" and displays it in an <h2> tag.


// 2) Create a component & file named "Greetings" that accepts a prop "username". If the "username" prop isn't provided, it should default to "Stranger". The component should display the message: "Hello, [username]!".


// 3) Create a component & file named "Button" that accepts a prop "onClick" (a function) and a prop "label" (a string). It renders a HTML button element that displays the label and invokes the onClick function when clicked.


// 4) Create a component & file named "Car" that accepts a prop "car". The "car" prop should be an object with properties "brand", "hp", and "mileage". Display these details in a structured manner.


// 5) Finally, render all your components in the "App" component below. Choose any structure you like. Take the following properties as inputs:

export default function App() {

	{/*UserProfile & Greetings*/}
	const username = "Hans"

	{/*Button*/ }
	const onClick = () => {
		alert("Hello!")
	}
	const label = "Hello!"

	{/*Car*/ }
	const car = {
		brand: "Porsche",
		hp: 500,
		mileage: 80000
	}

	{/*render your components*/ }
	return (
        <div>
            <UserProfile username={username} />
            <Greetings username={username} />
            <Button label={label} onClick={onClick} />
            <Car car={car} />
        </div>
    );
	
}`,
				},
				{
					filename: "UserProfile.jsx",
					code: `import React from 'react';

function UserProfile({ username }) {
	return <h2>{username}</h2>;
}

export default UserProfile;`,
				},
				{
					filename: "Greetings.jsx",
					code: `import React from 'react';

function Greetings({ username = "Stranger" }) {
	return <p>Hello, {username}!</p>;
}

export default Greetings;`,
				},
				{
					filename: "Button.jsx",
					code: `import React from 'react';

function Button({ onClick, label }) {
	return <button onClick={onClick}>{label}</button>;
}

export default Button;`,
				},
				{
					filename: "Car.jsx",
					code: `import React from 'react';

function Car({ car }) {
	return (
		<div>
			<h3>Brand: {car.brand}</h3>
			<p>HP: {car.hp}</p>
			<p>Mileage: {car.mileage}</p>
		</div>
	);
}

export default Car;`,
				},
			],
		},
		{
			// -- TASK 4 --
			index: index++,
			title: "Conditional Rendering",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Sometimes, we want to display different things based on certain conditions. Assuming we are building a user profile showing the user's email, but only if the user allowed us to. This is where conditional rendering comes into play.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function UserProfile({ user }) {
	if (user.allowsEmail) {
		return (
			<div>
				<h1> {user.name} </h1>
				<h3> {user.email} </h3>
			</div>
		)
	} else {
		return (
			<div>
				<h1> {user.name} </h1>
			</div>
		)
	}
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `A more compact structure can be achieved using the ternary operator (? :) or short circuiting (&& ||).`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// ternary operator
function UserProfile({ user }) {
	return (
		<div>
			<h1> {user.name} </h1>
			{user.allowsEmail ? <h3> {user.email} </h3> : null} 
		</div>
	)
}

// short circuiting with &&
function UserProfile({ user }) {
	return (
		<div>
			<h1> {user.name} </h1>
			{user.allowsEmail && <h3> {user.email} </h3>} 
		</div>
	)
}

// short circuiting with ||
// sometimes you want to show a default value
function UserProfile({ user }) {
	return (
		<div>
			<h1> {user.name || "Stranger"} </h1>
		</div>
	)
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/conditional-rendering" target=”_blank”>more info</a>`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: `.premium-profile {
	border: 5px solid gold;
	padding: 20px;
	width: 250px;
	position: relative;
	text-align: center;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s;
}

.premium-profile:hover {
	transform: scale(1.05);
}

.premium-badge {
	position: absolute;
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: gold;
	color: rgb(0, 0, 0);
	padding: 5px 10px;
	border-radius: 5px;
	font-weight: bold;
}

.profile-image {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	margin: 20px auto;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

/* example user object for this task  */
const exampleUser = { subscription: "premium", isOnline: true, username: "Hans", isAdmin: true }

/* In this task, you are building a user dashboard */

// 1) Create a component & file named "UserDashboard" that accepts the prop "user" and import it in this file using default import & export. Render the component inside the "App" component below using the "exampleUser".
// The "UserDashboard" should display the type of subscription a user has.If he has no subscripton it should display "No subscription".


// 2) Expand the dashboard to display if a user is "online" or "offline" using the "isOnline" property.


// 3) Expand the dashboard to show the username if available. Display "Welcome, [username]!". If not available, display "Welcome, guest!".


// 4) Expand the dashboard to display a button labeled "Admin Controls" if the user is an admin. Otherwise, don't display the button.


// 5) You are given the "Premium" component in the file "Premium.jsx". Render the component inside the dashboard if the subscription equals "premium".


export default function App() {
	return
}`,
				},
				{
					filename: "Premium.jsx",
					code: `import React from "react"

export default function Premium() {
	return (
		<div className="premium-profile">
			<div className="premium-badge">PREMIUM</div>
		</div>
	)
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: `.premium-profile {
	border: 5px solid gold;
	padding: 20px;
	width: 250px;
	position: relative;
	text-align: center;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s;
}

.premium-profile:hover {
	transform: scale(1.05);
}

.premium-badge {
	position: absolute;
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: gold;
	color: rgb(0, 0, 0);
	padding: 5px 10px;
	border-radius: 5px;
	font-weight: bold;
}

.profile-image {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	object-fit: cover;
	margin: 20px auto;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import UserDashboard from "./UserDashboard"

// YOUR TASK

/* example user object for this task  */
const exampleUser = { subscription: "premium", isOnline: true, username: "Hans", isAdmin: true }

/* In this task, you are building a user dashboard */

// 1) Create a component & file named "UserDashboard" that accepts the prop "user" and import it in this file using default import & export. Render the component inside the "App" component below using the "exampleUser".
// The "UserDashboard" should display the type of subscription a user has.If he has no subscripton it should display "No subscription".


// 2) Expand the dashboard to display if a user is "online" or "offline" using the "isOnline" property.


// 3) Expand the dashboard to show the username if available. Display "Welcome, [username]!". If not available, display "Welcome, guest!".


// 4) Expand the dashboard to display a button labeled "Admin Controls" if the user is an admin. Otherwise, don't display the button.


// 5) You are given the "Premium" component in the file "Premium.jsx". Render the component inside the dashboard if the subscription equals "premium".


export default function App() {
	return <UserDashboard user={exampleUser} />;
}`,
				},
				{
					filename: "Premium.jsx",
					code: `import React from "react"

export default function Premium() {
	return (
		<div className="premium-profile">
			<div className="premium-badge">PREMIUM</div>
		</div>
	)
}`,
				},
				{
					filename: "UserDashboard.jsx",
					code: `import React from 'react';
import Premium from "./Premium"

export default function UserDashboard({ user }) {
	return (
		<div>
			<p>Subscription: {user.subscription || "No subscription"}</p>
			<p>Status: {user.isOnline ? "Online" : "Offline"}</p>
			<p>Welcome, {user.username || "guest"}!</p>
			{user.isAdmin && <button>Admin Controls</button>}
			{user.subscription === "premium" && <Premium />}
		</div>
	);
}`,
				},
			],
		},
		{
			// -- TASK 5 --
			index: index++,
			title: "Rendering Lists",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `One of the most common scenarios that you will encounter is the need to display a list of items, for example a list of blog posts, a gallery of images or a collection of user profiles. To enable dynamic list rendering or manipulation we can use the JavaScript array functions like <b>map()</b>, <b>filter()</b> or <b>sort()</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Checkout the JavaScript Basics - Array Functions tasks if you need to refresh your memories.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

const names = ["Alice", "Bob", "Eve"];

// render the names in a list using map()
function GreetingsList() {
	return (
		<ul>
			{names.map((name, index) => <li key={index}>Hello, {name}!</li>)}
		</ul>
	);
}`,

					/*

// filter a list first, then render it
const users = [
	{ id: 1, name: "Alice", isActive: true },
	{ id: 2, name: "Bob", isActive: false },
	{ id: 3, name: "Charlie", isActive: true }
];
  
function ActiveUsersList() {
	return (
		<ul>
			{users.filter(user => user.isActive).map(user => <li key={user.id}>{user.name}</li>)}
		</ul>
	);
}


//  find and render details about a specific user
function FindUser({ userId }) {
	const user = users.find(u => u.id === userId);
	return (
		<div>
			{user ? \`Found user: \${user.name}\` : 'User not found'}
		</div>
	);
}


// sort and render the user names alphabetically
function SortedUsersList() {
	return (
		<ul>
			{users.sort((a, b) => a.name.localeCompare(b.name)).map(user => <li key={user.id}>{user.name}</li>)}
		</ul>
	);
}

// compute and render the total age of users
const usersWithAge = [
	{ id: 1, name: "Alice", age: 25 },
	{ id: 2, name: "Bob", age: 30 },
	{ id: 3, name: "Charlie", age: 35 }
];
  
function TotalAge() {
	const total = usersWithAge.reduce((sum, user) => sum + user.age, 0);
	return (
		<div>
			Total age of users: {total}
		</div>
	);
}
*/
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `You probably noticed that rendered list elements have a <b>key</b> prop. Keys tell React which array item each component belongs to so it can identify which items have changed, are added or removed, so Keys have to be <b>unique</b>. This is essential for correct and efficient rendering.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `When not specifying a key, React will use the list index as default. Using the index as a key can lead to bugs that are difficult to find.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Using the index as a key is generally discouraged because it can lead to unnecessary renders or strange bugs. However, it is fine to use the index as a key when using a static list that will not change.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/rendering-lists#" target=”_blank”>more info</a>`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

/* For simplicity, you can write all code into this file and don't need to do any imports or exports  */

/* example object for this task, assume that the id is unique */
const exampleUser = { id: 1, name: "Hans", isActive: true, age: 25 }

// 1) Create a component "UserIds" that accepts a prop "users" (a list of user objects) and renders an HTML list (<ul> & <li>) of all id's.


// 2) Create a component "UsersAboveThirty" that accepts a prop "users" (a list of user objects) and renders an HTML list (<ul> & <li>) of all names of users above the age of 30.


// 3) Create a component "YoungestUser" that accepts a prop "users" (a list of user objects) and display the name of the youngest user.


// 4) Create a component "SortedActiveUsers" that accepts a prop "users" (a list of user objects) and renders a list of active user names sorted alphabetically.


// 5) Create a component "UserCounts" that accepts a prop "users" (a list of user objects) and display the count of active and inactive users in the form: "active users: [number]" and "inactive users: [number]".


/* you can test your outputs here */
export default function App() {

	const userList = [
        { id: 1, name: "Hans", isActive: false, age: 30 },
        { id: 2, name: "Peter", isActive: true, age: 29 },
        { id: 3, name: "Lars", isActive: false, age: 26 },
        { id: 4, name: "John", isActive: false, age: 55 },
        { id: 5, name: "Anna", isActive: true, age: 88 },
    ]

	return
}

export { UserIds, UsersAboveThirty, YoungestUser, SortedActiveUsers, UserCounts }`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: "",
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"

// YOUR TASK

/* For simplicity, you can write all code into this file and don't need to do any imports or exports  */

/* example object for this task, assume that the id is unique */
const exampleUser = { id: 1, name: "Hans", isActive: true, age: 25 }

// 1) Create a component "UserIds" that accepts a prop "users" (a list of user objects) and renders an HTML list (<ul> & <li>) of all id's.
function UserIds({ users }) {
	return (
		<ul>
			{users.map(user => <li key={user.id}>{user.id}</li>)}
		</ul>
	);
}

// 2) Create a component "UsersAboveThirty" that accepts a prop "users" (a list of user objects) and renders an HTML list (<ul> & <li>) of all names of users above the age of 30.
function UsersAboveThirty({ users }) {
	return (
		<ul>
			{users.filter(user => user.age > 30).map(user => <li key={user.id}>{user.name}</li>)}
		</ul>
	);
}

// 3) Create a component "YoungestUser" that accepts a prop "users" (a list of user objects) and display the name of the youngest user.
function YoungestUser({ users }) {
	const youngest = users.reduce((prev, current) =>
		(prev.age < current.age) ? prev : current
	);
	return <span>{youngest.name}</span>;
}


// 4) Create a component "SortedActiveUsers" that accepts a prop "users" (a list of user objects) and renders a list of active user names sorted alphabetically.
function SortedActiveUsers({ users }) {
	return (
		<ul>
			{users.filter(user => user.isActive).sort((a, b) => a.name.localeCompare(b.name)).map(user => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}


// 5) Create a component "UserCounts" that accepts a prop "users" (a list of user objects) and display the count of active and inactive users in the form: "active users: [number]" and "inactive users: [number]".
function UserCounts({ users }) {
	const activeCount = users.filter(user => user.isActive).length;
	const inactiveCount = users.length - activeCount;

	return (
		<div>
			<p>active users: {activeCount}</p>
			<p>inactive users: {inactiveCount}</p>
		</div>
	);
}

/* you can test your outputs here */
export default function App() {

	const userList = [
		{ id: 1, name: "Hans", isActive: false, age: 30 },
		{ id: 2, name: "Peter", isActive: true, age: 29 },
		{ id: 3, name: "Lars", isActive: false, age: 26 },
		{ id: 4, name: "John", isActive: false, age: 55 },
		{ id: 5, name: "Anna", isActive: true, age: 88 },
	]

	return (
		<div>
			<UserIds users={userList} />
			<UsersAboveThirty users={userList} />
			<YoungestUser users={userList} />
			<SortedActiveUsers users={userList} />
			<UserCounts users={userList} />
		</div>
	)
}

export { UserIds, UsersAboveThirty, YoungestUser, SortedActiveUsers, UserCounts }`,
				},
			],
		},
	];
};
