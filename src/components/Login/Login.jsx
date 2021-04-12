import React, { useState, useEffect, useCallback } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import Counter from "../Counter/Counter";
import "./Login.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const messages = {
  error: {
    invalid_mobile: "Please enter a valid mobile number",
  },
  info: {
    otp_sent: "Six digits verfication code has been sent to ",
    resend_otp: "Didn't recieve code?",
  },
};
const LoginWithPhone = ({ role }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading] = useState(false);
  const [canRequestCode, setCanRequestCode] = useState(false);
  const auth = useAuth();
  const screen = auth.screen;

  const handleChange = (e) => {
    const { value } = e.target;
    setMobile(value);
  };
  const handleValidation = (e) => {
    const { value } = e.target;
    const regEx = /[0-9]/;
    if (!regEx.test(value) || value.length < 10) {
      setError(messages.error.invalid_mobile);
    }
  };
  const handleOTPChange = (element, index) => {
    const value = element.value;
    if (Number.isNaN(value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e, captchaId) => {
    e.preventDefault();
    const phoneNumber = "+91" + mobile;
    auth.signInWithPhone(phoneNumber, captchaId);
  };

  const handleVerifyOTP = useCallback(
    (e) => {
      e && e.preventDefault();
      auth.VerifyOTP(otp.join(""));
    },
    [otp, auth]
  );

  const clearInput = (e) => {
    e.preventDefault();
    setMobile("");
  };
  const clearOTP = (e) => {
    e.preventDefault();
    setOtp([...otp.map((_) => "")]);
  };
  const handleResendCode = (e, captchaId, resend) => {
    e.preventDefault();
    if (canRequestCode) {
      handleSubmit(e, captchaId, resend);
    }
  };
  useEffect(() => {
    const canSubmitOtp = otp.some((d) => d === "");
    if (!canSubmitOtp) {
      handleVerifyOTP();
    }
  }, [otp, handleVerifyOTP]);

  return (
    <div className="login">
      <div
        className={`login__container login__poster ${
          screen === "VERIFY_SCREEN" ? "flex-none" : "flex-auto"
        }`}
      ></div>
      <div className="login__container">
        {screen === "LOGIN_SCREEN" && (
          <div className="login__form">
            <div className="login__form-title">Login with phone</div>

            <form onSubmit={(e) => handleSubmit(e, "recaptcha-container")}>
              <label htmlFor="mobile">Enter your phone number</label>
              <small>we will send you a confirmation code</small>
              <div className="input__wrapper">
                <span className="country-code">+91</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="mobile"
                  id="mobile"
                  autoComplete="off"
                  value={mobile}
                  onChange={handleChange}
                  maxLength="10"
                  onBlur={handleValidation}
                  onFocus={() => setError("")}
                />
                <span className="cross-btn" onClick={clearInput}>
                  <CancelIcon />
                </span>
              </div>
              <div className="login__terms">
                <p>
                  By Login you are agree to
                  <a href="#terms"> terms & conditions</a>
                </p>
              </div>
              <button
                type="submit"
                disabled={error || mobile === "" ? true : false}
                className={`btn btn-cta ${loading ? "btn-loading" : ""}`}
              >
                {!loading ? "Login with OTP" : "Sending OTP"}
              </button>
            </form>
            <div id="recaptcha-container"></div>
          </div>
        )}
        {screen === "VERIFY_SCREEN" && (
          <div className="login__verify">
            <div className="login__form-title">Verification</div>
            <form onSubmit={handleVerifyOTP}>
              <label htmlFor="otp0">Enter Verification code</label>
              <div className="login__verify-wrapper">
                {otp.map((data, index) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    autoFocus={index === 0}
                    name="otp"
                    id={"otp" + index}
                    maxLength="1"
                    value={data}
                    key={index}
                    onChange={(e) => handleOTPChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className={`${data !== "" ? "filled" : ""}`}
                  />
                ))}
              </div>
              <div>
                <p>
                  {messages.info.otp_sent}{" "}
                  <b className="btn btn-link">{mobile}</b>
                </p>
              </div>
              <div className="resend-otp">
                <p>{messages.info.resend_otp}</p>
                <span>can request in</span>
                <Counter callback={() => setCanRequestCode(true)} />
              </div>
              <div className="login__verify-wrapper">
                <button
                  type="submit"
                  disabled={!canRequestCode}
                  className={`btn btn-cta ${
                    loading && canRequestCode && "btn-loading"
                  } order-1`}
                  onClick={(e) =>
                    handleResendCode(e, "resend-recaptcha-container", true)
                  }
                >
                  {loading ? "Sending OTP" : "Request Otp"}
                </button>
                <button onClick={clearOTP} className="btn btn-link">
                  clear
                </button>
              </div>
            </form>
            <div id="resend-recaptcha-container"></div>
          </div>
        )}
        <div className={`${error ? "login__error invalid" : "login__error"}`}>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};
export default LoginWithPhone;
