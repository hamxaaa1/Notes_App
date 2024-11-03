import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase";
import { setUser } from "./app/slices/authSlice";
import Navigation from "./navigation/Navigation";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        dispatch(setUser({ email, uid })); // Dispatch action to update state
      } else {
        dispatch(setUser(null)); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch]);

  return <Navigation />;
}

export default App;
