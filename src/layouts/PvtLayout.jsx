import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const PrivateLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const onToggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="layoutwrapper">
      <aside className={`sidebar ${toggle ? "collapsed" : ""}`}>
        <Sidebar toggle={toggle} onToggleHandler={onToggleHandler} />
      </aside>
      <main className={`main-content ${toggle ? "collapsed" : ""}`}>
        <header className="custom-header">
          <Header />
        </header>
        <div className="container-fluid">{children}</div>
      </main>
    </div>
  );
};

export default PrivateLayout;
