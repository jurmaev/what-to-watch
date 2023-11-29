import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/api-actions';
import UserBlock from '../../components/ui/user-block/user-block';
import Logo from '../../components/ui/logo/logo';
import Footer from '../../components/ui/footer/footer';

function containsAnyLetters(password: string) {
  return /[a-zA-Z]/.test(password);
}

function containsAnyNumbers(password: string) {
  return /[0-9]/.test(password);
}

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current) {
      if (!isValidEmail(emailRef.current.value)) {
        setErrorMessage('Please enter a valid email address');
      } else if (
        !containsAnyLetters(passwordRef.current.value) ||
        !containsAnyNumbers(passwordRef.current.value)
      ) {
        setErrorMessage(
          'Password should contain at least one letter and one number'
        );
      } else {
        dispatch(
          login({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          })
        );
      }
    }
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <header className="page-header user-page__head">
        <Logo />

        <UserBlock />
      </header>

      <div className="sign-in user-page__content">
        <form
          action=""
          className="sign-in__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {errorMessage && (
            <div className="sign-in__message">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                required
                ref={emailRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                required
                ref={passwordRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
