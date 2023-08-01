"use client";
import Image from "next/image";
import React from "react";
import notesImg from "@/Images/note-taking.png";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";
import { useBoardStore } from "@/store/BoardStore";

const Header = () => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString
  ]);
  return (
    <header>
      <div
        className={`flex items-center flex-col md:flex-row p-5
                   bg-gray-400/20 rounded-b-2xl`}
      >
        <div
          className="absolute top-0 left-0 w-full h-[clamp(35%,45%,47%)] bg-gradient-to-br from-red-400 to-blue-400 opacity-50
        filter blur-3xl -z-20"
        ></div>
        <Image
          src={notesImg}
          width={72}
          height={20}
          alt="img err"
          className={`w-[clamp(3rem,4.5rem,5.2rem)] md:pb-0  object-contain pb-10 rounded-md`}
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search Box */}
          <form
            className={`flex items-center space-x-5 flex-1 md:flex-initial bg-white
                        rounded-md p-2 shadow-md `}
          >
            <BiSearch className="w-6 h-6  text-gray-400 " />
            <input
              type="text"
              placeholder="search"
              className=" flex-1 outline-none p-2"
              value={searchString}
              onChange={e=>setSearchString(e.target.value)}
            />
            <button className="hidden" type="submit">
              Search
            </button>
          </form>
          {/*Avtaar*/}
          <Avatar
            size="xl"
            color="primary"
            textColor="white"
            text="vishal chaudhary"
            zoomed
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 md:py-5 py-2 ">
        <p
          className={`flex items-center text-sm font-light pr-5 shadow-xl w-fit bg-white 
                      italic max-w-3xl p-5 text-blue-400/95 rounded-md`}
        >
          <FaUserCircle
            style={{
              minWidth: "2rem",
              minHeight: "1.6rem",
              color: "rgb(89, 133, 222)",
              display: "inline-block",
            }}
          />
          GPT is summarising your task for the day
        </p>
      </div>
    </header>
  );
};

export default Header;
