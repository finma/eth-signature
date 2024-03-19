"use client";

import NavBar from "@/components/NavBar";
import {
  faCalendarDays,
  faDownload,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import React from "react";

const HistoryPage = () => {
  return (
    <>
      <NavBar />
      <div className="sm:px-6 w-full max-w-4xl mx-auto pb-12">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p
              tabIndex={0}
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              History
            </p>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-box">
          <div className="mt-7 ">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                  >
                    <button className="flex items-center gap-x-3 focus:outline-none">
                      <span>Nama File</span>
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                  >
                    Tanggal
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
                <tr
                  tabIndex={0}
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <td className="w-full">
                    <div className="flex items-center pl-5">
                      <p className="text-base font-medium leading-none text-gray-700 mr-2">
                        Sejarah Nilai.pdf
                      </p>
                    </div>
                  </td>

                  <td className="pl-5 ">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <p className="text-sm leading-none text-gray-600 ml-2">
                        04/07/2024
                      </p>
                    </div>
                  </td>

                  <td>
                    <Menu as="div" className="relative px-5 pt-2">
                      <Menu.Button className="focus:ring-2 rounded-md focus:outline-none">
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-600"
                        />
                      </Menu.Button>
                      <Menu.Items className="menu menu-sm dropdown-content absolute  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faDownload}
                                  className="mr-2"
                                />
                              )}
                              Download Signature
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-error text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
