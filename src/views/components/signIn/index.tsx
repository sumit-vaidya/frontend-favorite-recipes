import React, { FC, useState } from "react";
import { SIGN_IN } from "../../util/constants";
import { postApi } from "../../util/fetch";
interface Login {
  userName?: string | undefined;
  password?: string | undefined;
}

interface Props {
  recipePage: boolean | undefined;
  setRecipePage: (recipePage: boolean | undefined) => void;
}

export const LoginScreen: FC<Props> = ({ recipePage, setRecipePage }) => {
  const [login, setLogin] = useState<Login>();
  const [error, setError] = useState<string>();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (login) {
      await postApi(SIGN_IN, login).then(async (response) => {
        const res = await response.json();
        if(!res){
          setError("Username and password is incorrect...")
        }
        setRecipePage(res);
      });
    }
  };
  return (
    <div className="sign-in-wrapper">
      <h1>Please Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username : </span>
          <input
            type="text"
            onChange={(e) =>
              setLogin((login) => ({
                ...login,
                userName: e.target.value,
              }))
            }
          />
        </label>
        <label>
          <br />
          <br />
          <span>Password : </span>
          <input
            type="password"
            onChange={(e) =>
              setLogin((login) => ({
                ...login,
                password: e.target.value,
              }))
            }
          />
        </label>

        <div>
          <br />
          <button type="submit">Submit</button>
        </div>
        <div>
          <br/>
          <span style={{color: 'red'}}>{error}</span>
        </div>
      </form>
    </div>
  );
};
