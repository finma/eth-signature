"use client";

import { useState } from "react";

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e: any, newActiveTab: any) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div role="tablist" className="tabs tabs-lifted">
        {children.map((child: any) => (
          <button
            key={child.props.label}
            role="tab"
            className={`${
              activeTab === child.props.label ? "tab tab-active" : "tab"
            }`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4 w-full bg-white rounded-b-xl">
        {children.map((child: any) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }: any) => {
  return <div className="hidden w-full">{children}</div>;
};

export { Tabs, Tab };
