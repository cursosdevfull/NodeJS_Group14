type STATE_BOOK = "NEW" | "GOOD" | "REGULAR";

interface IBook {
  id: number;
  subject: string;
  state: STATE_BOOK;
  isAvailable: boolean;
}

class Book {
  constructor(public readonly info: IBook) {}
}

class BookRepository {
  private static listBooks: Array<Book> = [
    new Book({ id: 1, subject: "NodeJS", state: "NEW", isAvailable: true }),
    new Book({ id: 2, subject: "NodeJS", state: "NEW", isAvailable: true }),
    new Book({ id: 3, subject: "NodeJS", state: "GOOD", isAvailable: true }),
    new Book({ id: 4, subject: "NodeJS", state: "NEW", isAvailable: true }),
    new Book({ id: 5, subject: "Angular", state: "NEW", isAvailable: true }),
    new Book({ id: 6, subject: "Angular", state: "NEW", isAvailable: false }),
    new Book({ id: 7, subject: "Angular", state: "NEW", isAvailable: true }),
    new Book({
      id: 8,
      subject: "Angular",
      state: "REGULAR",
      isAvailable: true,
    }),
    new Book({ id: 9, subject: "Typescript", state: "NEW", isAvailable: true }),
    new Book({
      id: 10,
      subject: "Typescript",
      state: "GOOD",
      isAvailable: true,
    }),
    new Book({
      id: 11,
      subject: "Typescript",
      state: "REGULAR",
      isAvailable: false,
    }),
    new Book({
      id: 12,
      subject: "Typescript",
      state: "REGULAR",
      isAvailable: true,
    }),
  ];

  static getBooks(): Array<Book> {
    return this.listBooks;
  }
}

abstract class SearchBookService {
  listBooks: Array<Book>;

  constructor() {
    this.listBooks = BookRepository.getBooks();
  }

  findByStates(subject: string, ...states: Array<STATE_BOOK>) {
    let position = 0;
    let bookMatched: Book | undefined;

    while (position < states.length) {
      bookMatched = this.listBooks.find(
        (book: Book) =>
          book.info.subject === subject &&
          book.info.state === states[position] &&
          book.info.isAvailable
      );
      position++;

      if (bookMatched) {
        this.updateAvailability(bookMatched);
        break;
      }
    }

    return bookMatched;
  }

  updateAvailability(book: Book) {
    book.info.isAvailable = false;
  }

  abstract findBook(subject: string): Book | undefined;
}

class Student extends SearchBookService {
  findBook(subject: string) {
    return this.findByStates(subject, "REGULAR", "GOOD", "NEW");
  }
}

class Teacher extends SearchBookService {
  findBook(subject: string) {
    return this.findByStates(subject, "GOOD", "NEW", "REGULAR");
  }
}

class Partner extends SearchBookService {
  findBook(subject: string) {
    return this.findByStates(subject, "NEW", "GOOD", "REGULAR");
  }
}

class Strategy {
  findBookByRole(role: SearchBookService, subject: string) {
    return role.findBook(subject);
  }
}

const student = new Student();
const teacher = new Teacher();
const partner = new Partner();

const strategy = new Strategy();

const book1: Book = strategy.findBookByRole(student, "NodeJS") as Book;
const book2: Book = strategy.findBookByRole(teacher, "NodeJS") as Book;
const book3: Book = strategy.findBookByRole(partner, "NodeJS") as Book;

console.log("book1", book1);
console.log("book2", book2);
console.log("book3", book3);
