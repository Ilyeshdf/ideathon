import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'customer' or 'restaurant'
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, name) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user profile with display name
      await updateProfile(result.user, {
        displayName: name
      });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        displayName: name,
        email: email,
        userType: 'customer',
        createdAt: serverTimestamp(),
        orders: []
      });
      
      toast.success('Account created successfully!');
      return result.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      return result.user;
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
      throw error;
    }
  }

  async function googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create user document for new Google sign-ins
        await setDoc(userRef, {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          userType: 'customer',
          createdAt: serverTimestamp(),
          orders: []
        });
      }
      
      toast.success('Login successful!');
      return result.user;
    } catch (error) {
      toast.error('Failed to login with Google.');
      throw error;
    }
  }

  function logout() {
    setUserData(null);
    setUserType(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Check if user is a restaurant
  async function fetchUserData(user) {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setUserType(data.userType || 'customer');
      } else {
        // Check if user is a restaurant
        const restaurantDoc = await getDoc(doc(db, 'restaurants', user.uid));
        
        if (restaurantDoc.exists()) {
          const data = restaurantDoc.data();
          setUserData(data);
          setUserType('restaurant');
        } else {
          setUserType('customer');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userType,
    userData,
    signup,
    login,
    googleSignIn,
    logout,
    resetPassword,
    isCustomer: userType === 'customer',
    isRestaurant: userType === 'restaurant',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 