import { Link } from "react-router-dom";

const NotAuthorize = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center px-[24px]">
      <h1 className="md:text-6xl text-4xl font-light text-slate-400">
        Oops! You're not login yet. Please login first
      </h1>
      <Link to={"/login"}>
        <button className="w-fit bg-teal-400 font-bold  px-4 py-2 rounded-sm hover:bg-teal-300 border-none mt-8">
          Login
        </button>
      </Link>
    </div>
  );
};

export default NotAuthorize;
