import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const signup = createAsyncThunk(
  'auth/signup',
  async (user) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      let userToDatabase = {
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        uid: userCredential.user.uid
      }

      await setDoc(doc(db,'users', userCredential.user.uid), userToDatabase)
      return userToDatabase
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const docSnapshot = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (!docSnapshot.exists()) {
        throw new Error("User document not found");
      }

      const dbUser = docSnapshot.data();
      return dbUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be caught in the component
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await signOut(auth)
      return true;
    } catch (error) {
      console.error('Login error:', error);
    }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload)
      state.user = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null
    })
  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer