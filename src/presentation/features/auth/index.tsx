import { FormEvent, useState } from "react";
import { AuthUseCase } from "../../../domain/usecase/auth/AuthUseCase";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [blur, setOnBlur] = useState<boolean>(false);
  const navigate = useNavigate();

  const authUseCase = new AuthUseCase();
  const handleFormSubmit = (event: FormEvent) => {
    try {
      event.preventDefault();
      setOnBlur(true);
      authUseCase.login(username);
      navigate(-1);
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrorMsg(`Error: ${errorMessage}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setOnBlur(true);
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-2xl mb-8">Login first before play the quiz.</h1>
      {blur && errorMsg && (
        <div className="bg-pink-200 md:w-1/4 w-2/3 p-4 rounded-md relative">
          {errorMsg}
          <button
            onClick={() => setErrorMsg("")}
            className="absolute right-2 top-2 text-pink-500"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col md:w-1/4 w-2/3 bg-white md:px-8 px-4 py-4 rounded-md justify-center shadow-lg"
      >
        <div className="mb-1">
          <label htmlFor="username">Username</label>
          <input
            placeholder="type your username"
            type="text"
            name="username"
            id="username"
            required
            onChange={handleInputChange}
            className={`opacity-40 border-2 border-slate-400 rounded-md px-2 py-2  focus:outline-teal-400 ${
              blur && `invalid:border-pink-500`
            } peer w-full`}
          />
          {blur && (
            <p className="peer-invalid:visible invisible text-pink-500">
              Must be filled!
            </p>
          )}
        </div>
        <ButtonPrimary
          disabled={username?.trim() == ""}
          type="submit"
          className="w-full disabled:bg-slate-300 disabled:text-white disabled:cursor-not-allowed"
        >
          Login
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default Auth;
