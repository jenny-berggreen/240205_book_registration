const books = [];
const audioBooks = [];

// SELECTING THE ELEMENTS FROM THE DOM
const bookForm = document.querySelector('.book-form');

const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const selectElement = document.querySelector('.format');
const isbnInput = document.querySelector('.isbn');
const narratorInput = document.querySelector('.narrator');
const booksUl = document.querySelector('.physical-books-list');
const audioBooksUl = document.querySelector('.audio-books-list');

const displayPhysicalBooksContainer = document.querySelector('.display-physical-books');
const displayAudioBooksContainer = document.querySelector('.display-audio-books');

const renderPhysicalBooksButton = document.querySelector('.render-physical-books-button');
const renderAudioBooksButton = document.querySelector('.render-audio-books-button');

// ADDING THE EVENT LISTENERS
selectElement.addEventListener('change', ()=> {
	if(selectElement.value === 'physical') {
		narratorInput.setAttribute('disabled', '');
		isbnInput.removeAttribute('disabled');
	} else {
		isbnInput.setAttribute('disabled', '');
		narratorInput.removeAttribute('disabled');
	}
})

bookForm.addEventListener('submit', (e)=> {
	e.preventDefault();
	let newBook;
	if(selectElement.value === 'physical') {
		newBook = new Book(titleInput.value, authorInput.value, selectElement.value, isbnInput.value);
	} else {
		newBook = new AudioBook(titleInput.value, authorInput.value, selectElement.value, narratorInput.value);
	}
	Book.addBook(newBook);
	console.log(newBook);
	console.log(books);
	console.log(audioBooks);
})

renderPhysicalBooksButton.addEventListener('click', ()=> {
	UI.activeTab = 'physical';
	UI.renderBook(books);
})

renderAudioBooksButton.addEventListener('click', ()=> {
	UI.activeTab = 'audio';
	UI.renderAudioBook(audioBooks);
})

// DECLARING THE BOOK CLASS
class Book {
	constructor(title, author, format, isbn) {
		this.title = title;
		this.author = author;
		this.format = format;
		this.isbn = isbn;
		this.ID = Date.now();
	}

	static addBook(book) {
		if(book.format === 'physical') {
			books.push(book)
		} else {
			audioBooks.push(book)
		}
	}

	// DELETE METHOD
	static deleteBook(id, booksArray) {
		const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
		if(index !== -1) {
			booksArray.splice(index, 1);
			if(UI.activeTab === 'physical') {
				UI.renderBook(books);
			} else {
				UI.renderAudioBook(audioBooks);
			}
		}
	}
}

// DECLARING THE AUDIO BOOK CLASS
class AudioBook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format);
		this.narrator = narrator;
		this.ID = Date.now();
	}
}

// DECLARE THE UI CLASS
class UI {
	static activeTab = 'physical';
	static renderBook(books) {
		displayAudioBooksContainer.style.display = 'none';
		displayPhysicalBooksContainer.style.display = 'block';
		booksUl.textContent = '';

		if(UI.activeTab === 'physical') {
			books.forEach((book) => {
				const liRow = document.createElement('li');
				const renderedTitle = document.createElement('span');
				const renderedAuthor = document.createElement('span');
				const renderedFormat = document.createElement('span');
				const renderedISBN = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedTitle.textContent = book.title;
				renderedAuthor.textContent = book.author;
				renderedFormat.textContent = book.format;
				renderedISBN.textContent = book.isbn;
				deleteButton.textContent = 'Delete';

				liRow.classList.add('books-row');
				deleteButton.classList.add('button--red');

				liRow.dataset.id = book.ID;

				booksUl.append(liRow);
				liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedISBN, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e)=> {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id
					Book.deleteBook(rowID, books);
				})

			})
		}
	}

	static renderAudioBook() {
		displayAudioBooksContainer.style.display = 'block';
		displayPhysicalBooksContainer.style.display = 'none';
		audioBooksUl.textContent = '';

		if(UI.activeTab === 'audio') {
			audioBooks.forEach((book) => {
				const liRow = document.createElement('li');
				const renderedTitle = document.createElement('span');
				const renderedAuthor = document.createElement('span');
				const renderedFormat = document.createElement('span');
				const renderedNarrator = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedTitle.textContent = book.title;
				renderedAuthor.textContent = book.author;
				renderedFormat.textContent = book.format;
				renderedNarrator.textContent = book.narrator;
				deleteButton.textContent = 'Delete';

				liRow.classList.add('books-row');
				deleteButton.classList.add('button--red');

				liRow.dataset.id = book.ID;

				audioBooksUl.append(liRow);
				liRow.append(renderedTitle, renderedAuthor, renderedFormat, renderedNarrator, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e)=> {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id
					Book.deleteBook(rowID, audioBooks);
				})

			})
		}
	}
}