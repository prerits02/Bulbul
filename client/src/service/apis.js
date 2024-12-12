const baseURL = "http://localhost:3000";

export const endpoints = {
  login: `${baseURL}/api/v1/auth/login`,
  signup: `${baseURL}/api/v1/auth/signup`,
  addBook: `${baseURL}/api/v1/book/addBook`,
  getAvailableBooks: `${baseURL}/api/v1/book/getAvailableBooks`,
  borrowBook: `${baseURL}/api/v1/transaction/borrow`,
  returnBook: `${baseURL}/api/v1/transaction/return`,
  getBooks: `${baseURL}/api/v1/book/getBooks`,
  getIssuedBooks: `${baseURL}/api/v1/book/getIssuedBooks`,
};
