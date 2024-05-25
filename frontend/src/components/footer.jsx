function Footer(){
  const values = ["Disclaimer","PrivacyPolicy","About Us","Contact Us"];
  return(
    <footer className=" bottom-0 w-full h-22 bg-gray-300 p-4 rounded-t-xl text-lg lg:text-xl">
      <div className="">
        <ul className="flex justify-around flex-wrap items-center">
        {values.map((item,index) => (
          <li className="hover:bg-black hover:text-white rounded p-[4px] mb-1">
            <a href="">{item}</a>
          </li>
          ))}
        </ul>
      <p className="text-center">© 2024 RapidTube<br/>All rights reserved</p>
      </div>
    </footer>
  )
};

export default Footer;