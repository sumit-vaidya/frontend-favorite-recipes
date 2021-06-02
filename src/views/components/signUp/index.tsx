import React, { FC, useState } from 'react';
import { SIGN_UP } from '../../util/constants';
import { postApi } from '../../util/fetch';

interface Register {
  phoneNumber?: number | undefined;
  userName?: string | undefined;
  password?: string | undefined;
  userEmailId?: string | undefined;
}

interface Props{
  recipePage: boolean | undefined;
  setRecipePage: (recipePage: boolean | undefined) => void;
}

export const RegisterScreen: FC<Props> = ({recipePage, setRecipePage}) => {
  const [register, setRegister] = useState<Register>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postApi(SIGN_UP, register).then(async (response) => {
      const res = await response.json();
      setRecipePage(res);
    });
  };
  return (
    <div className='sign-up-wrapper'>
      <h1>Please Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Phone Number : </span>
          <input
            type='text'
            onChange={(e) =>
              setRegister((register) => ({
                ...register,
                phoneNumber: parseInt(e.target.value),
              }))
            }
          />
        </label>
        <br />
        <br />
        <label>
          <span>Username : </span>
          <input
            type='text'
            onChange={(e) =>
              setRegister((register) => ({
                ...register,
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
            type='password'
            onChange={(e) =>
              setRegister((register) => ({
                ...register,
                password: e.target.value,
              }))
            }
          />
        </label>
        <br />
        <br />
        <label>
          <span>User Email Id : </span>
          <input
            type='text'
            onChange={(e) =>
              setRegister((register) => ({
                ...register,
                userEmailId: e.target.value,
              }))
            }
          />
        </label>
        <div>
          <br />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};
