/******************************************************************************************************************************************************/
/**************************************************                 Practise                         **************************************************/
/******************************************************************************************************************************************************/

import { TaskSchema, TaskCategory, TaskDescriptionDisplayType } from "../../database/task";
import {
	getHTMLFile,
	getAppFile,
	getIndexFile,
	getAppCSSFile,
	getIndexCSSFile,
} from "./configuration";

export const getTasks_Practise = (): TaskSchema[] => {
	/**
	 * Catgeory definition
	 */
	const CATEGORY: TaskCategory = "Practise";

	let index = 1;

	return [
		{
			// -- TASK 1 --
			index: index++,
			title: "Practise Task 1",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This is a practise task to integrate all the topics you have learned about.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Counter App</h5> In this task you will create multiple counters where each counter can increment, decrement or reset. The total count of all counters combined should be displayed as well.`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<ul> <li>Create a component & file <b>Counter</b> that displays a count and can increment, decrement or reset it using buttons. The buttons should be labelled "+", "-" and "reset" respectively. </li> <li>Create a component & file <b>CounterList</b> that contains multiple counters and shows the total count of all counters combined. It takes a prop "numOfCounters" that specifies how many counters it should manage. The total count should be displayed in the form: "Total Count: X"</li> <li>Use default import & export for your components.</li> <li>You can use the CSS specified in "index.css" by specifying the desired className.</li></ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Use CTRL + Space to explore suggestions in the code editor if you are looking for a specific property.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: `.counter {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.counter-list {
    width: 200px;
    margin: 20px auto;
    border: 1px solid #ccc;
    padding: 20px;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"

/* You can test your components here */

export default function App() {
    return
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: `.counter {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.counter-list {
    width: 200px;
    margin: 20px auto;
    border: 1px solid #ccc;
    padding: 20px;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"
import CounterList from "./CounterList"

/* You can test your components here */

export default function App() {
    return (
        <CounterList numOfCounters={5} />
    )
}`,
				},
				{
					filename: "Counter.jsx",
					code: `import React from 'react';

const Counter = ({ count, onIncrement, onDecrement, onReset }) => {
    return (
        <div className="counter">
            <button onClick={onDecrement}>-</button>
            <span>{count}</span>
            <button onClick={onIncrement}>+</button>
            <button onClick={onReset}>reset</button>
        </div>
    );
}

export default Counter;`,
				},
				{
					filename: "CounterList.jsx",
					code: `import React, { useState } from 'react';
import Counter from './Counter';

const CounterList = ({ numOfCounters }) => {
    const initialCounts = Array(numOfCounters).fill(0);
    const [counts, setCounts] = useState(initialCounts);

    const handleIncrement = index => {
        const newCounts = [...counts];
        newCounts[index]++;
        setCounts(newCounts);
    }

    const handleDecrement = index => {
        const newCounts = [...counts];
        newCounts[index]--;
        setCounts(newCounts);
    }

    const handleReset = index => {
        const newCounts = [...counts];
        newCounts[index] = 0;
        setCounts(newCounts);
    }

    const totalCount = counts.reduce((acc, count) => acc + count, 0);

    return (
        <div className="counter-list">
            {counts.map((count, index) => (
                <Counter
                    key={index}
                    count={count}
                    onIncrement={() => handleIncrement(index)}
                    onDecrement={() => handleDecrement(index)}
                    onReset={() => handleReset(index)}
                />
            ))}
            <div>Total Count: {totalCount}</div>
        </div>
    );
}

export default CounterList;`,
				},
			],
		},
		{
			// -- TASK 2 --
			index: index++,
			title: "Practise Task 2",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This is a practise task to integrate all the topics you have learned about.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Todo List</h5> In this task you will implement a simple Todo List where users can add, delete, and mark tasks as completed.`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<ul> <li>Create a component & file <b>TodoItem</b> that will represent each individual todo task. It should display the todo task text in a < span >, should have a < button > labeled "Delete" to delete the specific todo and should have a checkbox < input type="checkbox" > to mark the todo as completed. When checked, the todo text should have a strike-through effect (CSS class: ".todo-item.completed span"). </li> <li>Create a component & file <b>TodoList</b> that contains multiple todos. It should have an < input > field with placeholder "Enter todo..." where the user can type a new todo text and a < button > labeled "Add Todo" to add it to the todos.</li> <li>Use default import & export for your components.</li> <li>You can use the CSS specified in "index.css" by specifying the desired className.</li></ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Use CTRL + Space to explore suggestions in the code editor if you are looking for a specific property.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: `.todo-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.todo-item.completed span {
    text-decoration: line-through;
    color: gray;
}

button {
    margin-left: 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"

/* You can test your components here */

export default function App() {
    return
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: `.todo-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.todo-item.completed span {
    text-decoration: line-through;
    color: gray;
}

button {
    margin-left: 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"
import TodoList from './TodoList';

/* You can test your components here */

export default function App() {
    return (
        <TodoList />
    )
}`,
				},
				{
					filename: "TodoItem.jsx",
					code: `import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <div className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
            <input          
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}

export default TodoItem;`,
				},
				{
					filename: "TodoList.jsx",
					code: `import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (inputValue) {
            const newTodo = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const handleDelete = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    const handleToggle = (id) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    }

    return (
        <div className="todo-list">
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter todo..."
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
}

export default TodoList;`,
				},
			],
		},
		{
			// -- TASK 3 --
			index: index++,
			title: "Practise Task 3",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This is a practise task to integrate all the topics you have learned about.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Flashcard Reviewer</h5> In this task you will implement a Flashcard Reviewer system where users can review questions and see their answers by flipping the card. The user should also be able to navigate between cards.`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<ul> <li>Create a component & file <b>Flashcard</b> that will represent each individual flashcard. It should display the question or answer. When clicked, the card should switch, toggling between displaying the question and the answer. </li> <li>Create a component & file <b>FlashcardReviewer</b> that contains multiple flashcards. It takes a prop "cards" representing a list of objects in the form: [{question: "What is the capital of France?", answer: "Paris"}]. It should display two < buttons > labeled "Next" and "Previous" to navigate between the cards. </li> <li>Use default import & export for your components.</li> <li>You can use the CSS specified in "index.css" by specifying the desired className.</li></ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Use CTRL + Space to explore suggestions in the code editor if you are looking for a specific property.`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `This is a good example for when to use the <b>key</b> prop even when not rendering a list. If you solve the task by using a local state (inside the "Flashcard") for the the cards flip status, try implementing the "Flashcard" inside "FlashcardReviewer" with and without a key and examine the results. Using the key prop can be a useful way to reset a components state.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: `.flashcard {
    width: 100%;
    height: 200px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: bisque;
}

.flashcard:hover {
    background-color: rgb(255, 209, 153);
}

.flashcard-reviewer {
    width: 350px;
    margin: 50px auto;
}

    /* navigation-container for navigation buttons */
.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"

/* You can test your components here */

export default function App() {
    return
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: `.flashcard {
    width: 100%;
    height: 200px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: bisque;
}

.flashcard:hover {
    background-color: rgb(255, 209, 153);
}

.flashcard-reviewer {
    width: 350px;
    margin: 50px auto;
}

    /* navigation-container for navigation buttons */
.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"
import FlashcardReviewer from './FlashcardReviewer';

/* You can test your components here */

const cards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the capital of Germany?', answer: 'Berlin' },
    { question: 'What is the capital of Spain?', answer: 'Madrid' },
];

export default function App() {
    return (
        <div>
            <FlashcardReviewer cards={cards} />
        </div>
    );
}`,
				},
				{
					filename: "Flashcard.jsx",
					code: `import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? answer : question}
        </div>
    );
}

export default Flashcard;`,
				},
				{
					filename: "FlashcardReviewer.jsx",
					code: `import React, { useState } from 'react';
import Flashcard from './Flashcard';

const FlashcardReviewer = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div className="flashcard-reviewer">
            <Flashcard key={currentIndex} question={cards[currentIndex].question} answer={cards[currentIndex].answer} />
            <div className="navigation">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default FlashcardReviewer;`,
				},
			],
		},
		{
			// -- TASK 4 --
			index: index++,
			title: "Practise Task 4",
			category: CATEGORY,
			unlocks: [{ category: CATEGORY, index: index }],
			description: [
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `This is a practise task to integrate all the topics you have learned about.`,
				},
				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<h5>Contact Manager</h5> In this task, you will implement a Contact Management system where users can maintain their list of contacts. The system should allow users to add, delete, and search for contacts based on their details.`,
				},

				{
					displayType: TaskDescriptionDisplayType.description,
					text: `<ul> 
                    <li>
                        Create a component & file <b>ContactList</b> that will display all the contacts.
                        Each contact in the list should show the Name, Phone Number, and Email. Additionally, it should display the "Delete" button next to each contact entry.
                    </li> 
                    <li>
                        Create a component & file <b>ContactForm</b> that will allow users to enter details for a new contact: Name (with placeholder="Name"), Phone Number (with placeholder="Phone Number"), and Email (with placeholder="Email").
                        The ContactForm should have an "Add Contact" button to save the contact to the list.
                    </li> 
                    <li>
                        Create a component & file <b>ContactSearchBar</b> that provides an < input > field (with placeholder="Search...") for users to search for contacts.
                        As users type into the search bar, the displayed contacts in the "ContactList" should be filtered to only show contacts that match the search input based on the Name, Phone Number, or Email.
                    </li> 
                    <li>
                        Create a component & file <b>ContactManager</b> that contains the "ContactList", "ContactForm", and "ContactSearchBar" components.
                    </li> 
                    <li>Use default import & export for your components.</li>
                    </ul>`,
				},
				{
					displayType: TaskDescriptionDisplayType.hint,
					text: `Use CTRL + Space to explore suggestions in the code editor if you are looking for a specific property.`,
				},
			],
			defaultFiles: [
				{
					filename: "index.css",
					code: `.counter {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.counter-list {
    width: 200px;
    margin: 20px auto;
    border: 1px solid #ccc;
    padding: 20px;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"

/* You can test your components here */

export default function App() {
    return
}`,
				},
			],
			solutionFiles: [
				{
					filename: "index.css",
					code: `.counter {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.counter-list {
    width: 200px;
    margin: 20px auto;
    border: 1px solid #ccc;
    padding: 20px;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
}`,
				},
				getHTMLFile(),
				getIndexFile(),
				{
					filename: "App.js",
					code: `import React from "react"
import "./index.css"
import ContactManager from './ContactManager';

/* You can test your components here */

export default function App() {
    return <ContactManager />
}`,
				},
				{
					filename: "ContactList.jsx",
					code: `import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul>
            {contacts.map((contact, index) => (
                <li key={contact.email}>
                    {contact.name} | {contact.phoneNumber} | {contact.email}{' '}
                    <button onClick={() => onDeleteContact(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;`,
				},
				{
					filename: "ContactForm.jsx",
					code: `import React, { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
    const [contact, setContact] = useState({
        name: '',
        phoneNumber: '',
        email: '',
    });

    const handleAddContact = () => {
        onAddContact(contact);
        setContact({ name: '', phoneNumber: '', email: '' });
    };

    return (
        <div>
            <input
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                placeholder="Name"
                type="text"
            />
            <input
                value={contact.phoneNumber}
                onChange={(e) =>
                    setContact({ ...contact, phoneNumber: e.target.value })
                }
                placeholder="Phone Number"
                type="tel"
            />
            <input
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="Email"
                type="email"
            />
            <button onClick={handleAddContact}>Add Contact</button>
        </div>
    );
};

export default ContactForm;`,
				},
				{
					filename: "ContactSearchBar.jsx",
					code: `import React from 'react';

const ContactSearchBar = ({ onSetSearch }) => {
    return (
        <input
            placeholder="Search..."
            onChange={(e) => onSetSearch(e.target.value)}
            type="search"
        />
    );
};

export default ContactSearchBar;`,
				},
				{
					filename: "ContactManager.jsx",
					code: `import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactSearchBar from './ContactSearchBar';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.phoneNumber.includes(search) ||
            contact.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    const handleDeleteContact = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    };

    return (
        <div>
            <ContactSearchBar onSetSearch={setSearch} />
            <ContactForm onAddContact={handleAddContact} />
            <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
        </div>
    );
};

export default ContactManager;`,
				},
			],
		},
	];
};
