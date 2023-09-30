/******************************************************************************************************************************************************/
/**************************************************                 Interactivity                    **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import {
	getHTMLFile,
	getAppFile,
	getIndexFile,
	getAppCSSFile,
	getIndexCSSFile,
} from "./configuration";

export const getTasks_Interactivity = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "Interactivity";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "Event Handling",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `So far, we have learned how to build components and describe the user interface. We haven't really learned much about how to include user interactions.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `In React, you can attach event handlers to your JSX. These event handlers are custom functions that get activated in response to interactions such as clicks, hovers, form input focuses, and the like.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// event handler
function handleClick() {
    alert("clicked!")
}

// passing event handler as prop
const button = <button onClick={handleClick}>Click me!</button>

// inline event handler
const button = (
    <button
        onClick={function handleClick() {
            alert("clicked!");
        }}
    >
        Click me!
    </button>
)

// inline event handler arrow function
const button = <button onClick={() => alert("clicked!")}>Click me!</button>

// Be careful to pass a function, and not to call it!
// this is invalid:
const button = <button onClick={handleClick()}>Click me!</button>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `<h5>Naming Conventions</h5> <ul> <li>Event handler functions start with <b>handle</b> (e.g. handleClick)</li> <li>Event handler props start with <b>on</b> (e.g. onClick)</li> </ul> `,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/responding-to-events" target=”_blank”>more info</a>`,
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

// 1) Create a component "ClickAlertButton" that accepts a prop "alertText" and shows an alert displaying the "alertText" when clicked on.


// 2) Create a component "HoverAlertButton" that accepts a prop "alertText" and shows an alert displaying the "alertText" when hovered (mouse overed) on.


// 3) Create a component "AlertButtons" that accepts a prop "alertText" and implements both buttons from 1) and 2).


export default function App() {
    return <AlertButtons />
}

export { ClickAlertButton, HoverAlertButton, AlertButtons }`,
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

// 1) Create a component "ClickAlertButton" that accepts a prop "alertText" and shows an alert displaying the "alertText" when clicked on.
function ClickAlertButton({ alertText }) {
    return <button onClick={() => alert(alertText)}>Click me</button>;
}

// 2) Create a component "HoverAlertButton" that accepts a prop "alertText" and shows an alert displaying the "alertText" when hovered (mouse overed) on.
function HoverAlertButton({ alertText }) {
    return <button onMouseOver={() => alert(alertText)}>Hover over me</button>;
}

// 3) Create a component "AlertButtons" that accepts a prop "alertText" and implements both buttons from 1) and 2).
function AlertButtons({ alertText }) {
    return (
        <div>
            <ClickAlertButton alertText={alertText} />
            <HoverAlertButton alertText={alertText} />
        </div>
    );
}

export default function App() {
    return <AlertButtons alertText="Hello from AlertButtons!" />
}

export { ClickAlertButton, HoverAlertButton, AlertButtons }`,
				},
			],
		},

		{
			// -- TASK 2 --
			index: index++,
			title: "State (1/2)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Up to this point, we've learned about React components, props, and event handling. We've seen how React can respond to user interactions using event handlers and how it can dynamically display data with JSX. However, we don't really know how to change the user interface like pressing a button to increase its displayed count by one.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Using simple local variables and updating them with a button click like:`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `function Button() {
    let count = 1

    function handleClick() {
        count = count + 1;
    }

    return (
        <button onClick={handleClick}> {count} </button>
    )
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `will <b>not</b> work because <b>local variables don't persist between renders</b> and <b>changes to a local variable don't trigger a render</b>. So we need a way to store data between renders and React needs to know when to render again. Here's where the concept of <b>state</b> comes into play.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Rendering = React calling your component function`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `A component's state can be seen as its memory or current status. To use the state in our components we call <b>useState()</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// import useState
import { useState } from 'react';

// call useState inside a component
const [count, setCount] = useState(0)`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `useState() returns an array with exactly two values: the state variable (e.g. count) and the setter for the state variable (e.g. setCount). The parameter for useState is the default value for its state variable. We use array destructuring to access both values.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:
import { useState } from 'react';

// button with a counter that increases when clicked on
function Button() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <button> {count} </button>
    )
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Calling setCount will trigger a render of the component and React will not use the initial value of 0 again because it "remembers" the count value.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `The state is completely private and local to its component. Rendering the same component twice means that every component has its own state. However, every component can pass its state value or setter to a child component.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `<h5>State vs Props</h5>If a React component was a machine, props would be like the machine's settings — predetermined and fixed unless changed by an external factor, while state would be more like the machine's readings or outputs, which can vary and change based on various factors.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/state-a-components-memory" target=”_blank”>more info on state</a>`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/render-and-commit" target=”_blank”>more info on render</a>`,
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

// 1) Create a component "ToggleButton" that renders a <button>. The button should initially display the text "OFF". When the button is clicked, the text should change to "ON". When clicked again, it should go back to "OFF", and so on.
function ToggleButton() {

}


// 2) Create a component "Counter". It should display a number and three <buttons> labeled "Increase", "Decrease" and "Reset". When "Increase" is clicked, the number should go up by one. When "Decrease" is clicked, the number should go down by one. When "Reset" is clicked, the counter should reset to 0.
function Counter() {

}


// 3) Create a component "InputMirror". It should render an <input> field and a <p> element. Whatever is typed into the input field should be mirrored (displayed) in the paragraph element below it.
function InputMirror() {

}


// 4) Create a component "ColorField" that renders a <fieldset> with "150px" in height and width and a background color "green". Also create a component "ColorFields" that renders two "ColorField" components and one <button> labeled "Switch Colors". When the button is clicked, the background color of the two ColorField components should change to "red". When clicked again, it should change back to "green", and so on.
function ColorField() {

}

function ColorFields() {

}



/* You can test your implementations here */
/* You can render some components multiple times to see that they all have their own state */
export default function App() {
        
}

export { ToggleButton, Counter, InputMirror, ColorField, ColorFields}`,
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
import { useState } from "react"

// YOUR TASK

/* For simplicity, you can write all code into this file and don't need to do any imports or exports  */

// 1) Create a component "ToggleButton" that renders a <button>. The button should initially display the text "OFF". When the button is clicked, the text should change to "ON". When clicked again, it should go back to "OFF", and so on.
function ToggleButton() {
    const [isOn, setIsOn] = useState(false);

    return (
        <button onClick={() => setIsOn(!isOn)}>
            {isOn ? "ON" : "OFF"}
        </button>
    );
}


// 2) Create a component "Counter". It should display a number and three <buttons> labeled "Increase", "Decrease" and "Reset". When "Increase" is clicked, the number should go up by one. When "Decrease" is clicked, the number should go down by one. When "Reset" is clicked, the counter should reset to 0.
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}


// 3) Create a component "InputMirror". It should render an <input> field and a <p> element. Whatever is typed into the input field should be mirrored (displayed) in the paragraph element below it.
function InputMirror() {
    const [text, setText] = useState("");

    return (
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <p>{text}</p>
        </div>
    );
}


// 4) Create a component "ColorField" that renders a <fieldset> with "150px" in height and width and a background color "green". Also create a component "ColorFields" that renders two "ColorField" components and one <button> labeled "Switch Colors". When the button is clicked, the background color of the two ColorField components should change to "red". When clicked again, it should change back to "green", and so on.
function ColorField({ color }) {
    return <fieldset style={{ height: "150px", width: "150px", backgroundColor: color }}></fieldset>;
}

function ColorFields() {
    const [color, setColor] = useState("green");

    return (
        <div>
            <ColorField color={color} />
            <ColorField color={color} />
            <button onClick={() => setColor(color === "green" ? "red" : "green")}>
                Switch Colors
            </button>
        </div>
    );
}



/* You can test your implementations here */
/* You can render some components multiple times to see that they all have their own state */
export default function App() {
    return (
        <div>
            <ToggleButton />
            <Counter />
            <InputMirror />
            <ColorFields />
        </div>
    );
}


export { ToggleButton, Counter, InputMirror, ColorField, ColorFields}`,
				},
			],
		},

		{
			// -- TASK 3 --
			index: index++,
			title: "State (2/2)",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `We learned that <b>state</b> is the components "memory" or current status. We need to understand that it doesn't behave like a regular JavaScript variable. Instead, think of it as a photograph, a snapshot of a value at a specific moment. When you update this value, you aren't instantly changing it but requesting a fresh snapshot (or re-render).`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Instead of directly changing your user interface upon an action (like a button click), React waits for the state to be updated and then repaints the interface. Let's say you click a volume-up button on a remote. Instead of the TV volume increasing immediately, the remote sends a request (state change), and then the TV responds by increasing the volume (UI update).`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `When React renders your component, it's like taking a new photo of your UI based on the current state. This includes the present values, event handlers, and props.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <>
			<h1>{count}</h1>
			<button
				onClick={() => {
					setCount(count + 1);
					setCount(count + 1);
					setCount(count + 1);
				}}
			>
				+3
			</button>
		</>
    )
}`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Looking at the above example, even if you attempt to increment the count three times, the displayed value only increases by 1. Why? Because all three increments are based on the same snapshot where count was 0.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Any event handler you define uses the state values as they were during that render. This ensures consistency, even if the state changes while the event is processing. Let's say you're sending a message with a delay, and you change the recipient before the message sends. With React's model, the original recipient remains unchanged for that specific action`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Instead of processing each state update immediately, React waits until all the event handlers have run, then processes the state updates together. This is similar to a waiter in a restaurant who waits for you to finish your entire order before heading to the kitchen. This is called <b>batching</b>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/state-as-a-snapshot" target=”_blank”>more info</a>`,
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
					code: `import { useState } from "react";
import React from "react";

// YOUR TASK

// 1) Take a look at the "TrickyCounter" component below. What will the value of "count" be after clicking on the increment button?

// declare your guess here
const expectedResult1 = ""

function TrickyCounter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count + 1);
        setCount(count + 2);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

// 2) Take a look at the "EvenMoreTrickyCounter" component below. What will the value of "count" be after clicking on the increment button?

// declare your guess here
const expectedResult2 = ""

function EvenMoreTrickyCounter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count + 2);
        setCount(count + 1);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

// 3) Take a look at the "DelayedNameUpdate" component below. What will the alert show after clicking on the change button?

// declare your guess here
const expectedResult3 = ""

function DelayedNameUpdate() {
    const [name, setName] = useState("Alice");

    function handleNameChange() {
        setName("Bob");
        setTimeout(() => {
            alert(name);
        }, 2000);
    }

    return (
        <>
            <h1>Hello, {name}!</h1>
            <button onClick={handleNameChange}>Change</button>
        </>
    );
}


/* You can test the components here, try to make a guess before checking the results */

export default function App() {
    return 
}

export { expectedResult1, expectedResult2, expectedResult3}`,
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
					code: `import { useState } from "react";
import React from "react";

// YOUR TASK

// 1) Take a look at the "TrickyCounter" component below. What will the value of "count" be after clicking on the increment button?

// declare your guess here
const expectedResult1 = "2"

function TrickyCounter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count + 1);
        setCount(count + 2);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

// 2) Take a look at the "EvenMoreTrickyCounter" component below. What will the value of "count" be after clicking on the increment button?

// declare your guess here
const expectedResult2 = "1"

function EvenMoreTrickyCounter() {
    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(count + 2);
        setCount(count + 1);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

// 3) Take a look at the "DelayedNameUpdate" component below. What will the alert show after clicking on the change button?

// declare your guess here
const expectedResult3 = "Alice"

function DelayedNameUpdate() {
    const [name, setName] = useState("Alice");

    function handleNameChange() {
        setName("Bob");
        setTimeout(() => {
            alert(name);
        }, 2000);
    }

    return (
        <>
            <h1>Hello, {name}!</h1>
            <button onClick={handleNameChange}>Change</button>
        </>
    );
}


/* You can test the components here, try to make a guess before checking the results */

export default function App() {
    return (
        <div>
            <TrickyCounter />
            <EvenMoreTrickyCounter />
            <DelayedNameUpdate />
        </div>
    )
}

export { expectedResult1, expectedResult2, expectedResult3}`,
				},
			],
		},

		{
			// -- TASK 4 --
			index: index++,
			title: "State: Working with Objects",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `You might often find the need to store and update objects within your component's state. Imagine working with a users profile: you could create a state value for every part of the profile but sometimes it might make more sense to store it as an object.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `First, we need to understand that state is treated as <b>immutable</b>, which means we should not mutate object properties directly.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `In Javascript, primitives like numbers, booleans and strings are immutable. Assigning a value to a primitive directly doesn't change the underlying value but instead assigns a new one. That's why directly assigning state values doesn't work.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// Initializing state with an object
const [profile, setProfile] = useState({ name: "Alice", clicks: 0 });

// Wrong way: Direct mutation
profile.name = "John";

// Right way: Create a new object and set it
setProfile({ name: "John", clicks: 0 });`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `Without using the state setting function, React doesn't trigger a render and while mutating state values directly can work in some cases, it can lead to bugs and is not recommended.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `If you wish to keep existing properties of an object while updating just a few, the spread syntax (...) is helpful. It provides a way to copy properties from one object to another so you don't have to write out the full object again.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

const [profile, setProfile] = useState({ firstName: "Alice", lastName: "Johnson" clicks: 0 });

// Update just the firstName and keep the rest
setProfile({ ...profile, firstName: "John" });`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `When working with nested objects, we need to apply the spread syntax on every level to ensure immutability.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

const [profile, setProfile] = useState(
    user: {
        firstName: "Alice",
        lastName: "Johnson"
    },
    clicks: 0
);

// Update the firstname 
setProfile({
    ...profile,
    user: {
        ...profile.user,
        firstname: "John"
    }
});`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Working with deeply nested objects can be tedious. That's why there are libraries like <a href="https://immerjs.github.io/immer/" target=”_blank”>Immer</a>.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/updating-objects-in-state" target=”_blank”>more info</a>`,
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
					code: `import { useState } from "react";
import React from "react";

// YOUR TASK


// 1) You are given a component "BookComponent1". Fill in the handleClick function so it updates the pages to 450.

function BookComponent1() {
    const [book, setBook] = useState({ title: "Harry Potter", author: "J.K. Rowling", pages: 400 });

    const handleClick = () => {
        // Your code here
    };

    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            <button onClick={handleClick}>Update Pages</button>
        </div>
    );
}


// 2) You are given a component "BookComponent2". Fill in the handleClick function to add a "genre" property with value "Fantasy".

function BookComponent2() {
    const [book, setBook] = useState({ title: "Harry Potter", author: "J.K. Rowling", pages: 400 });

    const handleClick = () => {
        // Your code here
    };

    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            {book.genre && <p>Genre: {book.genre}</p>}
            <button onClick={handleClick}>Add Genre</button>
        </div>
    );
}


// 3) You are given a component "SchoolComponent". Fill in the handleClick function to update the principal's firstName to "Alice".

function SchoolComponent() {
    const [school, setSchool] = useState({
        name: "Albert Einstein Elementary School",
        principal: {
            firstName: "John",
            lastName: "Johnson"
        }
    });

    const handleClick = () => {
        // Your code here
    };

    return (
        <div>
            <h3>{school.name}</h3>
            <p>Principal: {school.principal.firstName} {school.principal.lastName}</p>
            <button onClick={handleClick}>Update Principal</button>
        </div>
    );
}


// 4) You are given a component "ProductComponent". Fill in the handleClick function to to toggle the product's availability.

function ProductComponent() {
    const [product, setProduct] = useState({ name: "Laptop", brand: "TechCo", available: true });

    const handleClick = () => {
        // Your code here
    };

    return (
        <div>
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Status: {product.available ? "Available" : "Out of Stock"}</p>
            <button onClick={handleClick}>Toggle Availability</button>
        </div>
    );
}


/* You can test your components here */

export default function App() {
    return 
}

export { BookComponent1, BookComponent2, SchoolComponent, ProductComponent }`,
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
					code: `import { useState } from "react";
import React from "react";

// YOUR TASK


// 1) You are given a component "BookComponent1". Fill in the handleClick function so it updates the pages to 450.

function BookComponent1() {
    const [book, setBook] = useState({ title: "Harry Potter", author: "J.K. Rowling", pages: 400 });

    const handleClick = () => {
        // Your code here
        setBook({ ...book, pages: 450 });
    };

    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            <button onClick={handleClick}>Update Pages</button>
        </div>
    );
}


// 2) You are given a component "BookComponent2". Fill in the handleClick function to add a "genre" property with value "Fantasy".

function BookComponent2() {
    const [book, setBook] = useState({ title: "Harry Potter", author: "J.K. Rowling", pages: 400 });

    const handleClick = () => {
        // Your code here
        setBook({ ...book, genre: "Fantasy" });
    };

    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Pages: {book.pages}</p>
            {book.genre && <p>Genre: {book.genre}</p>}
            <button onClick={handleClick}>Add Genre</button>
        </div>
    );
}


// 3) You are given a component "SchoolComponent". Fill in the handleClick function to update the principal's firstName to "Alice".

function SchoolComponent() {
    const [school, setSchool] = useState({
        name: "Albert Einstein Elementary School",
        principal: {
            firstName: "John",
            lastName: "Johnson"
        }
    });

    const handleClick = () => {
        // Your code here
        setSchool({
            ...school,
            principal: {
                ...school.principal,
                firstName: "Alice"
            }
        });
    };

    return (
        <div>
            <h3>{school.name}</h3>
            <p>Principal: {school.principal.firstName} {school.principal.lastName}</p>
            <button onClick={handleClick}>Update Principal</button>
        </div>
    );
}


// 4) You are given a component "ProductComponent". Fill in the handleClick function to to toggle the product's availability.

function ProductComponent() {
    const [product, setProduct] = useState({ name: "Laptop", brand: "TechCo", available: true });

    const handleClick = () => {
        // Your code here
        setProduct({ ...product, available: !product.available });
    };

    return (
        <div>
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Status: {product.available ? "Available" : "Out of Stock"}</p>
            <button onClick={handleClick}>Toggle Availability</button>
        </div>
    );
}


/* You can test your components here */

export default function App() {
    return (
        <div>
            <BookComponent1 />
            <BookComponent2 />
            <SchoolComponent />
            <ProductComponent />
        </div>
    )
}

export { BookComponent1, BookComponent2, SchoolComponent, ProductComponent }`,
				},
			],
		},

		{
			// -- TASK 1 --
			index: index++,
			title: "Event Handling",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `So far, we have learned how to build components and describe the user interface. We haven't really learned much about how to include user interactions.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `In React, you can attach event handlers to your JSX. These event handlers are custom functions that get activated in response to interactions such as clicks, hovers, form input focuses, and the like.`,
				},
				{
					displayType: TaskDescriptionDisplayType.code,
					text: `// example:

// event handler
function handleClick() {
    alert("clicked!")
}

// passing event handler as prop
const button = <button onClick={handleClick}>Click me!</button>

// inline event handler
const button = (
    <button
        onClick={function handleClick() {
            alert("clicked!");
        }}
    >
        Click me!
    </button>
)

// inline event handler arrow function
const button = <button onClick={() => alert("clicked!")}>Click me!</button>

// Be careful to pass a function, and not to call it!
// this is invalid:
const button = <button onClick={handleClick()}>Click me!</button>
`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `<h5>Naming Conventions</h5> <ul> <li>Event handler functions start with <b>handle</b> (e.g. handleClick)</li> <li>Event handler props start with <b>on</b> (e.g. onClick)</li> </ul> `,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<a href="https://react.dev/learn/responding-to-events" target=”_blank”>more info</a>`,
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
					code: ``,
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
					code: ``,
				},
			],
		},
	];
};
