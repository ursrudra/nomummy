export const signInWithPhone = (phoneNumber, captchaId, resend) => {
  console.log(captchaId);
  return (dispatch, getStore, { firebase, auth }) => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(captchaId, {
      size: "invisible",
      defaultCountry: "IN",
    });
    if (!resend) {
      dispatch({
        type: "SIGN_IN_STARTING",
        payload: {
          authMessage: "",
          isSendingOTP: true,
          isVerifyingOTP: false,
          isAuthPending: true,
          isAuthenticated: false,
          screenToRender: "LOGIN_SCREEN",
        },
      });
    }
    auth
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        dispatch({
          type: "SIGN_IN_PENDING",
          payload: {
            isSendingOTP: false,
            isVerifyingOTP: false,
            isAuthPending: true,
            isAuthenticated: false,
            screenToRender: "VERIFY_SCREEN",
          },
        });
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        // Handle Errors Here
        dispatch({
          type: "SIGN_IN_ERROR",
          payload: {
            isAuthenticationFailed: true,
            authMessage: error.message,
            isSendingOTP: false,
            isVerifyingOTP: false,
            screenToRender: "LOGIN_SCREEN",
          },
        });
      });
  };
};

export const verifyPhoneNumber = (OTP) => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_IN_PENDING",
      payload: {
        isSendingOTP: false,
        isVerifyingOTP: true,
        screenToRender: "VERIFY_SCREEN",
      },
    });
    window.confirmationResult.confirm(OTP).then((user) => {
      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: {
          isAuthenticationFailed: false,
          authMessage: "",
          isAuthPending: false,
          isAuthenticated: true,
          screenToRender: "SUCCESS_SCREEN",
        },
      });

      dispatch({
        type: "SET_CURRENT_USER",
        payload: user,
      });
    });
  };
};

export const signOut = () => {
  return (dispatch, getStore, { auth }) => {
    auth.signOut().then(() => {});
    dispatch({
      type: "SIGN_IN_STARTING",
      payload: {
        isLoginPending: false,
        isAuthenticated: false,
        isAuthenticationFailed: false,
        authMessage: "",
        screenToRender: "LOGIN_SCREEN",
      },
    });
    dispatch({
      type: "SET_CURRENT_USER",
      payload: null,
    });
  };
};
