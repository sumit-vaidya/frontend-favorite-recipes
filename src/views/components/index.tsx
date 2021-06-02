import React, { FC, useState } from 'react';
import { DateTime } from './dateTime';
import { RecipeScreen } from './recipe';
import { LoginScreen } from './signIn';
import { RegisterScreen } from './signUp';
interface Props {
  title: string;
}

export const RecipeTitle: FC<Props> = ({ title }) => {
  const [isSignIn, setSignIn] = useState<boolean>(true);
  const [recipePage, setRecipePage] = useState<boolean | undefined>(false);

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <DateTime />
        <button
          style={{ marginLeft: '15px' }}
          onClick={(): void => {
            setSignIn(true);
            setRecipePage(false);
          }}
        >
          SignIn
        </button>
        <button
          style={{ marginLeft: '15px' }}
          onClick={(): void => {
            setSignIn(false);
            setRecipePage(false);
          }}
        >
          SignUp
        </button>
      </div>
      <div>
        {!recipePage ? (
          isSignIn ? (
            <LoginScreen
              recipePage={recipePage}
              setRecipePage={setRecipePage}
            />
          ) : (
            <RegisterScreen
              recipePage={recipePage}
              setRecipePage={setRecipePage}
            />
          )
        ) : (
          <RecipeScreen />
        )}
      </div>
    </div>
  );
};
export default RecipeTitle;
