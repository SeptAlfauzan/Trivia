import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center px-[24px]">
      <h1 className="md:text-6xl text-4xl font-light text-slate-400">
        <span className="text-teal-400 font-bold">404</span> | Page not found
      </h1>
      <Link to={"/"}>
        <button className="w-fit bg-teal-400 font-bold  px-4 py-2 rounded-sm hover:bg-teal-300 border-none mt-8">
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
