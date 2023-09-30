import { Link } from "react-router-dom";
// import onLaptopIllustration from "./../../../assets/illustration-0.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { USER } from "../../../utils/Constanta";
import { User } from "../../../domain/entity/User";
import { AuthUseCase } from "../../../domain/usecase/auth/AuthUseCase";
import {
  AiOutlineFieldTime,
  AiOutlineLogout,
  AiOutlineSave,
  AiOutlineUserAdd,
} from "react-icons/ai";
import ButtonPrimary from "../../components/ButtonPrimary";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const authUseCase = new AuthUseCase();

  const handleClickOutsideMenu = useCallback((event: MouseEvent) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpened(false);
    }
  }, []);

  useEffect(() => {
    try {
      const userJson = localStorage.getItem(USER);
      if (userJson == null) throw new Error("No user logged!");
      const user: User = JSON.parse(userJson);
      setUser(user);
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
    window.addEventListener("click", handleClickOutsideMenu as EventListener);
    return () => {
      window.removeEventListener(
        "click",
        handleClickOutsideMenu as EventListener
      );
    };
  }, [handleClickOutsideMenu]);

  const handleLogout = () => {
    authUseCase.logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen pb-12" id="home-container">
      <nav className="w-full flex flex-row md:px-8 px-4 py-2 fixed mt-0 bg-white shadow-sm">
        {user == null ? (
          <Link
            to="/login"
            className="ml-auto text-teal-500 hover:text-teal-400 hover:border-b-2 font-bold"
          >
            Login
          </Link>
        ) : (
          <div
            ref={userMenuRef}
            className="w-[32px] h-[32px] rounded-full overflow-clip object-cover ml-auto cursor-pointer"
            onClick={() => {
              setIsMenuOpened(!isMenuOpened);
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user.username}&background=14b8a6&color=ffffff`}
              className="w-[32px] h-[32px]"
              alt="user avatar"
            />
            {isMenuOpened && (
              <div className="rounded-md shadow-lg absolute right-4 bg-white">
                <ul>
                  <li className="text-slate-400 p-4">{user.username}</li>
                  <li
                    onClick={() => {
                      handleLogout();
                    }}
                    className="flex items-center justify-around p-4 hover:bg-slate-200"
                  >
                    <AiOutlineLogout />
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="grid grid-cols-2 md:px-24 px-8 pt-[15vh]">
        <div className="md:col-span-1 col-span-2">
          <h1 className="font-bold md:text-6xl text-2xl">
            Welcome to <span className="text-teal-500">Trivia.</span>
          </h1>
          <h1 className="font-bold md:text-6xl text-4xl mt-[32px] text-slate-800">
            Let's test your knowledge
          </h1>
          <Link to="/quiz">
            <ButtonPrimary>Start the quiz!</ButtonPrimary>
          </Link>
        </div>
        <div className="md:col-span-1 col-span-2 flex flex-col md:mt-0 mt-8">
          <div className="w-full flex flex-col md:self-center self-start">
            <img
              src="/assets/illustration-0.svg"
              alt="illustration on laptop"
              className="md:w-[360px] md:h-[360px] w-[220px] h-[220px] mb-[32px]md:self-start self-end md:mt-0 mt-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 col-span-2 gap-[16px] md:mt-24 mt-4">
          <h5 className="col-span-3 text-center text-2xl font-bold">
            Why Trivia?
          </h5>
          <div className="col-span-1 rounded-md p-4 shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:self-start self-center text-teal-500 text-4xl md:mr-3 mr-0 md:mb-0 mb-4">
                <AiOutlineFieldTime />
              </div>
              <h6 className="font-bold md:text-lg text-sm md:text-left text-center mb-4">
                Fast
              </h6>
            </div>
            <p className="text-slate-500 md:block hidden">
              Don't worry if you have a busy schedule. The trivia quiz can be
              done in one sitting.
            </p>
          </div>
          <div className="col-span-1 rounded-md p-4 shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:self-start self-center text-teal-500 text-4xl md:mr-3 mr-0 md:mb-0 mb-4">
                <AiOutlineUserAdd />
              </div>
              <h6 className="font-bold md:text-lg text-sm md:text-left text-center mb-4">
                No Register
              </h6>
            </div>
            <p className="text-slate-500 md:block hidden">
              To use Trivia, you don't have to create an account. You just need
              to type an username to login and start play the quiz.
            </p>
          </div>
          <div className="col-span-1 rounded-md p-4 shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:self-start self-center text-teal-500 text-4xl md:mr-3 mr-0 md:mb-0 mb-4">
                <AiOutlineSave />
              </div>
              <h6 className="font-bold md:text-lg text-sm md:text-left text-center mb-4">
                Auto Save
              </h6>
            </div>
            <p className="text-slate-500 md:block hidden">
              You accidentally close the browser tab? Don't worry, your current
              progress is automatically saved, so you can continue the quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
