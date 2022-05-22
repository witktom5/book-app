import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import SearchResult from '../components/SearchResult';

function Profile() {
  const [userFavourites, setUserFavourites] = useState([]);
  //  Fetch favourites
  const auth = getAuth();
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        const { favourites } = docSnap.data();
        setUserFavourites(favourites);
        console.log(favourites);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavourites();
  }, [auth.currentUser.uid]);

  const { username } = useAuthStatus();

  return (
    <>
      <h1 className='text-3xl text-center'>
        Welcome to Your profile page <strong>{username}</strong>!
      </h1>
      <h2 className='text-2xl text-center mt-12'>Your favourite books:</h2>
      <section className='max-w-3xl mx-auto flex flex-col gap-8 mt-6'>
        {userFavourites.map((fav, i) => (
          <SearchResult
            key={i}
            title={fav.title}
            authors={fav.authors}
            languages={fav.languages}
            subjects={fav.subjects}
            copyright={fav.copyright}
            bookshelves={fav.bookshelves}
            text={fav.text}
          />
        ))}
      </section>
    </>
  );
}
export default Profile;
