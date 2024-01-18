import React, { useEffect, useState } from "react";

const Links = [
  { child: "Home", href: "http://" },
  { child: "Flshcard", href: "http://" },
  { child: "Contact US", href: "http://" },
  { child: "FAQ", href: "http://" },
];

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 950);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobileView ? <MobileView /> : <WebView />;
};

const WebView = () => {
  return (
    <>
      <div className="grid grid-cols-2 w-screen items-center p-2">
        <div className="grow-0 mx-4 bg-center bg-contain bg-no-repeat">
          <div className="w-full h-full py-2">
            <img src="Assets/logo.png" alt="Assets" className="px-4" />
          </div>
        </div>
        <div className="flex grow justify-around items-center px-4">
          {Links.map((child, index) => (
            <div key={index}>
              <ListItem child={child.child} NavLink={child.href} />
            </div>
          ))}
          <button className="px-8 py-2 bg-gradient-to-t from-[#06286E] to-[#164EC0] text-white rounded-full">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

const MobileView = () => {
  return (
    <>
      <div className="flex w-screen justify-between items-center overflow-hidden p-2">
        <div className="w-full h-full py-2">
          <img src="Assets/logo.png" alt="Assets" className="px-4" />
        </div>

        <div className="flex grow justify-end items-center mx-1">
          <div className="flex -space-x-2 overflow-hidden p-1">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

const ListItem = ({ child, NavLink }) => {
  return (
    <div>
      <a href={NavLink} className="text-black hover:text-[#164EC0]">
        {child}
      </a>
    </div>
  );
};
