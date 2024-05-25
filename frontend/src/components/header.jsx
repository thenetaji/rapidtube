import { useState } from "react";

function Header(){
  const [menuActive,setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const menuOptions = ["YouTube ","Facebook","Instagram","Threads","Twitter","TikTok"];
  return(
    <>
    <header className={`${menuActive ? "bg-white" : ""} sticky top-0 w-full z-50 flex flex-col justify-center align-center`}>
     <div className="flex justify-between align-center w-full h-full px-4 py-2 ">
       <h1 className="text-2xl text-left border-b-1 border-b-black">
       RAPIDTUBE
      </h1>
       <span className="w-9 h-full" onClick={toggleMenu}>
         <figure>
           <img src={menuActive ? "/images/active-menu.png" : "/images/menu.png"} alt="menu-icon" />
        </figure>
      </span>
    </div>
  </header>
  
    <nav className={`${menuActive ? "" : "hidden"} w-full h-full text-lg bg-white pb-4 font-semibold font-sens px-8`}>
     <div className="bg-slate-200 rounded-[6px] p-2 text-center backdrop-blur">
       <ul className="space-y-3">
       {menuOptions.map((item,index) => (
         <>
          <li className="p-1 hover:text-white hover:bg-sky-500 rounded" index={index}>
            <a href="#">{item} Downloader</a>
          </li>
          </>
         ))}
       </ul>
     </div>
     <hr className="my-2 border" />
       
      <div className="w-full flex justify-around align-center">
       <select className="rounded p-2">
         <option>English</option>
       </select>
       <select className="rounded p-1">
         <option>Dark</option>
       </select>
      </div>
     </nav>
    </>
  )
}

export default Header;

/*           <figcaption>
              <a href="https://www.flaticon.com/free-icons/menu" title="menu icons">Menu icons created by Freepik - Flaticon</a>
         </figcaption>*/