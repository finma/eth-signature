"use client";

import React, { useState } from "react";

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e: any, newActiveTab: any) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div role="tablist" className="tabs tabs-lifted">
        {children.map((child: any) => (
          <button
            key={child.props.label}
            role="tab"
            className={`font-semibold text-base ${
              activeTab === child.props.label
                ? "tab tab-active rounded-t-xl "
                : "tab"
            }`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      {/* <div className=""> */}
      {children.map((child: any, index: number) => {
        return (
          <div
            key={child.props.label}
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-b-xl p-6 ${
              index === 0 ? "rounded-tr-xl" : "rounded-tl-xl"
            }`}
            style={{
              display: activeTab === child.props.label ? "block" : "none",
            }}
          >
            {child.props.children}
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
};

const Tab = ({ label, children }: any) => {
  return <div className="hidden w-full">{children}</div>;
};

export { Tabs, Tab };
