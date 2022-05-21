import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { db } from '../firebase/firebase.config';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  return <div className='profile'></div>;
}
export default Profile;
