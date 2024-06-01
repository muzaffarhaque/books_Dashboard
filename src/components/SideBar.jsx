import React, { useState } from "react";
import { Image } from "react-bootstrap";
import logo from "../assets/images/4851710.jpg";
import { NavLink } from "react-router-dom";
import { Collapse } from "antd";

export default function SideBar() {
  const [active, setActive] = useState();
  return (
    <div className={`main-side-bar`}>
      <div className="hand-me-logo">
        <Image src={logo} alt="logo" />
      </div>

      <ul className="side-nav-list">
        <li className="fx-14 fw-semibold black-757">
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Overview
          </NavLink>
        </li>
        <li className="fx-14 fw-semibold black-757">
          <NavLink
            to="/search-books"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books
          </NavLink>
        </li>
        <li className="fx-14 fw-semibold black-757">
          <NavLink
            to="/scale-order/active"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Scale Order
          </NavLink>
        </li>
   
        {/* 
        <li className="custom-ant-accordion">
          <Collapse
            accordion
            expandIconPosition={'end'}
            defaultActiveKey={''}
            items={[
              {
                key: "1",
                label: "Users",
                children: (
                  <>
                  <NavLink
                    to="/admin-user"
                    className={({ isActive }) =>
                      isActive ? "nav-link fx-14 fw-semibold  active " : "nav-link fx-14 fw-semibold black-757"
                    }
                  >
                  Admin Users
                  </NavLink>
                  <NavLink
                  to="/customer-user"
                  className={({ isActive }) =>
                    isActive ? "nav-link fx-14 fw-semibold  active " : "nav-link fx-14 fw-semibold black-757"
                  }
                >
                  Customer Users
                </NavLink>
                </>
                ),
              },
              
            ]}
          />
        </li> */}
    
      </ul>
    </div>
  );
}
