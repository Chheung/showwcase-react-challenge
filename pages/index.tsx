import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl">Hi there! Welcome to your education showcase</h1>
      <div className="mt-10">
        <p className="text-2xl">
          Type your name and click &quot;Enter&quot; below to begin
        </p>
        <input type="text" placeholder="Your name" />
      </div>
    </div>
  );
};

export default Home;
