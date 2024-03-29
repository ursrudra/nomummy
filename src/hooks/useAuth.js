import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase, auth } from "../firebase/firebase";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {!auth.loadingAuthState && children}
    </authContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("LOGIN_SCREEN");
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [additionalUserInfo, setAdditionalUserInfo] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const signInWithPhone = (phoneNumber, captchaId) => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(captchaId, {
      size: "invisible",
      defaultCountry: "IN",
    });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setScreen("VERIFY_SCREEN");
        return { isPending: true };
      });
  };

  const VerifyOTP = (OTP) => {
    window.confirmationResult.confirm(OTP).then((authUser) => {
      setUser(authUser.user);
      setAdditionalUserInfo(authUser.additionalUserInfo);
      setScreen("SUCCESS_SCREEN");
    });
  };

  const updateProfile = (data) => {
    const user = auth.currentUser;
    user
      .updateProfile(data)
      .then(() => true)
      .catch(() => false);
  };

  const updateEmail = (email) => {
    const user = auth.currentUser;
    user
      .verifyBeforeUpdateEmail(email)
      .then(() => true)
      .catch(() => false);
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingAuthState(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    screen,
    authenticated: user !== null,
    loadingAuthState,
    additionalUserInfo,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithPhone,
    VerifyOTP,
    updateProfile,
    updateEmail,
    setUser,
  };
}
