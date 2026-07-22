"use strict";
// Assignment 15
Object.defineProperty(exports, "__esModule", { value: true });
// 1
// TypeScript OOP Assignment – Class Diagram
// Part A - System: Simple Notes Management System (7 Marks)
// 1. Base Class – User (1 Mark)
//    Create a class called User. The class should contain the following properties:
//       • Id (number)
//       • name (String)
//       • email(String)
//       • Password (String)
//       • Phone (String)
//       • age (Number ) (Must be between 18 and 60)
//    Requirements:
//        Use appropriate access modifiers (public, private, protected).
//        Create a method called displayInfo() that prints the user's information.
class User {
    id;
    name;
    email;
    password;
    phone;
    // Aggregation relationship: User has many NoteBooks
    notebooks = [];
    _age;
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        // Calling setter directly to enforce validation (18-60) during object instantiation
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error('Age must be between 18 and 60');
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`User: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
    // Add a notebook to the user's collection (Aggregation relationship)
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    getNotebook() {
        return [...this.notebooks];
    }
}
//2. Inheritance – Admin User(1 Mark)
//    Create a class called Admin that extends the User class.
//    Requirements:
//        The Admin class should include a method that allows the admin to manage notes.
//        Apply the concept of inheritance.
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes() {
        console.log(`Admin ${this.name} Managing notes...`);
    }
}
// 3. Class - Note (1 Mark)
//    Create a class called Note
//       • Id (number)
//       • tittle(String)
//       • content(String)
//       • userId(reference to User)
//    Requirements:
//        Create a method called preview() that returns a short preview of the note content.
class Note {
    id;
    title;
    content;
    author;
    userId;
    constructor(id, title, content, author, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = userId;
        // this.preview();
    }
    preview(limit = 20) {
        if (this.content.length <= limit)
            return this.content;
        return `${this.content.substring(0, limit)}...`;
    }
}
// 4. Composition– NoteBook and Notes (1 Mark)
//    Create a class called NoteBook
//    Requirements:  The NoteBook class should contain a collection of Notes objects .
//       Implement methods such as : addNote() , removeNote()
//       The relationship between Notebook and Note must represent Composition .
class NoteBook {
    notes = [];
    addNote(id, title, content, author) {
        const newNote = new Note(id, title, content, author, author.id);
        this.notes.push(newNote);
        return newNote;
    }
    removeNote(noteId) {
        const initLength = this.notes.length;
        this.notes = this.notes.filter((note) => note.id !== noteId);
        return this.notes.length < initLength;
    }
    getNotes() {
        return [...this.notes];
    }
    getUserNotes(user) {
        return this.notes.filter((note) => note.userId === user.id);
    }
}
// 2 -----------------------------------------------------------------------------
// 5. Aggregation – User and Notebook (1 Mark)
//    Create a relationship between:
//        User
//        NoteBook
//    Requirements:
//        A user can own multiple notebooks.
//        This relationship should represent Aggregation.
//
const user1 = new User(1, 'Ali', 'ali@gmail.con', 'password123', '01112223334', 23);
const user2 = new User(2, 'ody', 'ody@gmail.con', 'password123', '01112223335', 18);
const user3 = new User(3, 'aya', 'aya@gmail.con', 'password123', '01112223336', 28);
const notebookUser1 = new NoteBook();
const notebookUser2 = new NoteBook();
const notebookUser3 = new NoteBook();
notebookUser1.addNote(100, 'Note 1', 'Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1', user1);
notebookUser1.addNote(300, 'Note 3', 'Content 3 Content 3 Content 3 Content 3 Content 3 Content 3 Content 3 Content 3 Content 3', user1);
notebookUser2.addNote(200, 'Note 2', 'Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2 Content 2', user2);
console.log('user1', notebookUser1.getUserNotes(user1));
console.log('user2', notebookUser2.getUserNotes(user2));
console.log('user3', notebookUser3.getUserNotes(user3));
// 6.Association – Note and User(1 Mark)
//    Create a relationship between:
//        User
//        Note
//    Requirements:
//        Each Note must have an author (the user who created it).
//        This relationship should represent Association.
user1.addNotebook(notebookUser1);
user2.addNotebook(notebookUser2);
user3.addNotebook(notebookUser3);
const notebook4 = new NoteBook();
notebook4.addNote(400, 'Note 4', 'Content 4 Content 4 Content 4 Content 4 Content 4 Content 4 Content 4 Content 4 Content 4', user3);
const user4 = new User(4, 'user4', 'user4@gmail.com', 'password123', '01112223337', 38);
console.log('user4', notebook4.getUserNotes(user4));
user4.addNotebook(notebook4);
// 7. Generics– Data Storage(1 Mark)
//       Create a Generic Class called :
//        Storage
//       Requirements:
//        The class should be able to store any type of data . Example operations may include :
//       1. addItem ()
//       2. removeItem() .
//       3. getAllItems() .
class Storage {
    data = [];
    addItem(item) {
        this.data.push(item);
    }
    removeItem(id) {
        this.data = this.data.filter((item) => item.id !== id);
    }
    getAllItems() {
        return [...this.data];
    }
}
// Part B - UML Digram(3 Markes)
//       1. Draw the Class Diagram (2 Mark)
//          Draw a UML Class Diagram that includes :
//             • All classes
//             • Attributes
//             • Methods
//             • Relationships between classes
//! 		👈🏻👈🏻 Attached diagram.png
// 		2. Identify Relationships (1 Mark)
// 			Clearly identify the following relationships in your diagram:
// 			• Inheritance .
// 				Admin class inherits from User class [ inherit all User properties and methods, plus additional properties and methods ]
// 			• Composition .
//					- Note has a User as its author [ Note cannot exist without a User ]
//					- NoteBook has many Notes [ NoteBook can exist without Notes, but Notes cannot exist without NoteBook ]
// 			• Aggregation .
//					- User has many NoteBooks [ User can exist without NoteBooks, but NoteBooks can exist without Users ]
// 			• Association .
//					- Note is associated with User [ Note has a reference to User ]
