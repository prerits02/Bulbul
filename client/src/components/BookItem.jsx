import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { borrowBook } from "../service/Auth Operations/BookOperations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookItem({ book }) {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  console.log("Book ITEM : ", book);
  async function borrow(bookId) {
  
    if (!user || !token) {
      toast.error("Please login to borrow books");
      navigate("/login"); 
      return;
    }

    
    if (!user._id) {
      toast.error("User information is incomplete");
     
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await borrowBook(bookId, user._id, token);
      console.log("BORROW BOOK RESPONSE : ", response);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      console.error("Error in borrow:", error);
     
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="book-item border-richYellow border-2 text-white font-saira w-[12rem] px-4 py-2 flex flex-col justify-center items-center">
    <img 
      src={book.bookImage} 
      alt={book.title} 
      className="w-[8rem]" 
    />
    <h2 className="font-bold text-base text-center">{book.title}</h2>
    <p className="text-sm line-clamp-1 text-center">
      <strong>Author:</strong> {book.author}
    </p>
    <p className="text-sm text-center">
      <strong>Genre:</strong> {book.genre}
    </p>
    
  
    {!user ? (
      <button
        onClick={() => navigate("/login")}
        className="bg-richYellow mt-2 hover:bg-yellow-400 text-richBlue-100 font-saira text-base font-bold p-1 px-4 rounded-full w-fit"
      >
        Login to Borrow
      </button>
    ) : (
      <button
        onClick={() => borrow(book._id)}
        disabled={isLoading}
        className={`bg-richYellow mt-2 hover:bg-yellow-400 text-richBlue-100 font-saira text-base font-bold p-1 px-4 rounded-full w-fit ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Borrowing...' : 'Borrow'}
      </button>
      )}
    </div>
  );
}

export default BookItem;
