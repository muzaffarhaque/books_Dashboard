import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import backIcon from '../assets/images/arrow-left-long-solid.svg';
import { useNavigate } from "react-router-dom";
import { FileSearchOutlined ,SearchOutlined,CloseOutlined} from "@ant-design/icons";

export default function SubHeader({
  title = "",
  btnName = "",
  btnHandler = () => {},
  searchHandler = () => {},
  isSearch = false,
  returnTo="",
  isBack=false,
}) {
  const navigate=useNavigate()
  const [search,setSearch]=useState();
  return (
    <div className="sub-header-frame">
      <h3 className="fs-24-16 fw-bold mb-0 d-flex align-items-end  gap-4 primary"> {isBack &&<Image src={backIcon} onClick={()=>navigate(returnTo)} className="w-24 mb-01" alt="image"/> }{title}</h3>
       <div className=" d-flex align-items-center gap-2">
        {isSearch && 
        <div className="input-box py-0 d-flex align-items-center g-2 sub-header-serach-box">
          <FileSearchOutlined />
          <input type="text" placeholder={`Search ${title}..`} onChange={(e)=>{setSearch(e?.target?.value);}} value={search} className=" input-box border-0 pe-0 search-input-field" />
         <CloseOutlined  onClick={()=>setSearch('')} className={` ${search ? 'opacity-100': 'opacity-0'}  me-2 pointer`} />
           <SearchOutlined onClick={()=>searchHandler(search)} className={`p-2 ${search ? 'search-icon' :''}`}/>
        </div>
        }
        &nbsp;&nbsp;&nbsp;
      <div className="serch-btn-wrapper">
        {btnName && <Button onClick={btnHandler} className="primary-btn fs-16-13 fw-semibold">{btnName}</Button>}
      </div>
      </div>
    </div>
  );
}
