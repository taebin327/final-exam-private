// 1. Book class
class Book {
  constructor(subject, professor, classroom) {
    this.subject = subject
    this.professor = professor
    this.classroom = classroom
  }
}

// 2. UI class: UI를 다루는 기능
class UI {
  // 2.1 Display books
  static displayBooks() {
    const books = Store.getBooks()
    books.forEach((book) => UI.addBookToList(book))
  }

  // 2.2 Add book to UI
  static addBookToList(book) {
    const list = document.getElementById('book-list')
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${book.subject}</td>
      <td>${book.professor}</td>
      <td>${book.classroom}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `
    list.appendChild(row)
  }

  // 2.3 Delete book from UI
  static deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.remove()
    }
  }

  // 2.4 알림메시지 표시
  static showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)

    setTimeout(() => {
      const alert = document.querySelector('.alert')
      if (alert) alert.remove()
    }, 2000)
  }

  // 2.5 Clear Fields
  static clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }
}

// 3. 사용자 Event 처리 기능

// 3.1 Event: Display books (페이지 초기 로드시 실행)
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// 3.2 Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()

  const subject = document.querySelector('#title').value
  const professor = document.querySelector('#author').value
  const classroom = document.querySelector('#isbn').value

  if (subject === '' || professor === '' || classroom === '') {
    UI.showAlert('모든 필드를 입력해 주세요', 'danger')
  } else {
    const book = new Book(subject, professor, classroom)

    UI.addBookToList(book)
    Store.addBook(book)
    UI.showAlert('과목이 저장되었습니다', 'success')
    UI.clearFields()
  }
})

// 3.3 Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('과목을 삭제했습니다', 'info')
  }
})

// 3.4 Event: 전체 초기화 버튼 클릭
document.querySelector('#clear-all').addEventListener('click', () => {
  // 저장소 비우기
  localStorage.removeItem('books')

  // UI 초기화
  document.getElementById('book-list').innerHTML = ''

  UI.showAlert('모든 과목이 초기화 되었습니다', 'danger')
})

// 4. Store class : localStorage에 저장하는 기능
class Store {
  // 4.1 localStorage에서 책정보를 읽어옴
  static getBooks() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  // 4.2 localStorage에 새로운 책을 저장함
  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  // 4.3 localStorage에서 책정보를 지움
  static removeBook(subject) {
    let books = Store.getBooks()

    books = books.filter((book) => book.subject !== subject)

    localStorage.setItem('books', JSON.stringify(books))
  }
}
