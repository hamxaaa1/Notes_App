import React from "react";
import Navbar from "../component/navbar/Navbar";
import Header from "../component/header/header";
import ShowNotes from "../component/showNotes/showNotes";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
        <Header />
        <ShowNotes />
      </div>
    </>
  );
}

export default Home;
