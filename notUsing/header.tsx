import { useLocation } from "react-router-dom";

const Header = () => {
  const pathname = useLocation();

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div
      className={
        "fixed top-0 left-0 z-50 w-full border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-color-2 bg-n-8 backdrop-blur-sm"
      }
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4  ">
        <a className="w-[4rem] text-3xl lg:text-2xl font-title text-center href=#hero">
          WORK PARK
        </a>
        <nav
          className={
            "flex fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent"
          }
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <a
              key={0}
              href="#about"
              onClick={handleClick}
              className={`block relative font-sans text-xl text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 leg:text-xs lg:font-regular
                ${
                  "#about" === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              about
            </a>
            <a
              key={1}
              href="#works"
              onClick={handleClick}
              className={`block relative font-sans text-xl text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 leg:text-xs lg:font-regular 
                ${
                  "#works" === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              works
            </a>
            <a
              key={2}
              href="#contact"
              onClick={handleClick}
              className={`block relative font-sans text-xl text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 leg:text-xs lg:font-regular 
                ${
                  "#contact" === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              contact
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
