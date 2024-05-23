import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBar } from "../../components";
import profile from "../../assets/images/profile.png";
import userIcon from "../../assets/images/user-solid.svg"
import logout from "../../assets/images/logout.svg";
import { Dropdown } from "antd";
import { Image } from "react-bootstrap";

export default function Layout() {
    const navigate  =useNavigate();
    const items = [
        {
          key: "1",
          label: <p className="fx-12 profile-li mb-0"><Image src={userIcon}/> Profile</p>,
          onClick:()=>{navigate('/profile');}
        },
        {
          key: "2",
          label: <p className="fx-12 profile-li mb-0 "><Image src={logout}/> Log out</p>,
          onClick:()=>{navigate('/onboarding');removeToken()}
        },
      ];
  return (
    <main className="main-section-wrapper d-flex min-vh-100">
      <SideBar />
      <div className="outlet-main-wrapper bg-f7f">
      <header className="header px-4 d-flex align-items-center justify-content-end">
          <Dropdown
            menu={{
              items,
            }}
            arrow
            // open={true}
          >
            <Image src={profile} className="profile-icon" alt="icon" />
          </Dropdown>
        </header>
        <div className="outlet-frame">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
