import React from "react";

const Panel = ({ children }) => {
  return (
    <div className={`shadow bg-light rounded container p-5`} style={{ minHeight: "91vh" }}>
      {children}
    </div>
  );
};

export default Panel;
