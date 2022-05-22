import { useState, useEffect } from 'react';
import {
  updateDoc,
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebase.config';
import { toast } from 'react-toastify';

function SearchResult({
  title,
  authors,
  bookshelves,
  copyright,
  languages,
  subjects,
  text,
}) {
  const book = {
    title,
    authors,
    bookshelves,
    copyright,
    languages,
    subjects,
    text,
  };
  const auth = getAuth();
  const [isFavourited, setIsFavourited] = useState(false);

  //  Check if book is in favourites

  useEffect(() => {
    const checkFavourited = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        const data = docSnap.data();
        const match = data.favourites.find((el) => el.title === title);
        if (match) setIsFavourited(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth.currentUser) checkFavourited();
  });

  //  Add book to favourites

  const addToFavourites = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await updateDoc(userRef, {
        favourites: arrayUnion(book),
      });
      setIsFavourited(true);
      const bookTitle = title.length < 50 ? title : title.slice(0, 49) + '...';
      toast.success(`Added ${bookTitle} to favourites`);
    } catch (error) {
      toast.error('Something went wrong with adding to favorites');
    }
  };

  //  Remove book from favourites

  const removeFromFavourites = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await updateDoc(userRef, {
        favourites: arrayRemove(book),
      });
      setIsFavourited(false);
      const bookTitle = title.length < 50 ? title : title.slice(0, 49) + '...';
      toast.info(`Removed ${bookTitle} from favourites`);
    } catch (error) {
      toast.error('Something went wrong with removing from favorites');
    }
  };

  return (
    <div className='card bg-base-200 shadow-lg'>
      <div className='card-body bg-base-300'>
        <h3 className='card-title text-lg'>
          {title.length < 200
            ? title
            : title.split(' ').splice(0, 20).join(' ') + '...'}
        </h3>
      </div>
      <div className='card-body'>
        <p>
          <strong>Author(s): </strong>
          {authors.length > 0
            ? authors.map((author) => author.name).join(' ')
            : 'Unknown'}
        </p>
        <p>
          <strong>Subjects: </strong>
          {subjects.length > 0 ? subjects.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Bookshelves: </strong>
          {bookshelves.length > 0 ? bookshelves.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Languages: </strong>
          {languages.length > 0 ? languages.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Copyright: </strong>
          {copyright === true && 'Copyrighted'}
          {copyright === false && 'Not Copyrighted'}
          {copyright === null && 'Unknown'}
        </p>

        <div className='card-actions mt-5 w-full'>
          {!isFavourited && (
            <button
              onClick={addToFavourites}
              className='btn btn-success flex w-full'
            >
              Add to Favourites
            </button>
          )}
          {isFavourited && (
            <button
              onClick={removeFromFavourites}
              className='btn btn-error flex w-full'
            >
              Remove from Favourites
            </button>
          )}
          {text && text.length > 0 && (
            <a
              href={text}
              target='blank'
              rel='noreferred'
              className='btn btn-info flex w-full'
            >
              Read Online
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchResult;
