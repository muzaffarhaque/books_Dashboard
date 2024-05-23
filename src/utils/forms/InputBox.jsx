import { Form, Select } from "antd";
import React, { useState } from "react";

export default function InputBox({
  type = "",
  placeholder = "",
  classes = "",
  required = true,
  label = "",
  values="",
  disable=false,
  id="",
  changeHandler = () => {},
}) {
  switch (type) {
    case "email":
      const [email, setEmail] = useState(values);
      const [isEmail, setIsEmail] = useState(false);
      function validateEmail(email) {
        const regex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email ? regex.test(String(email).toLowerCase()) : true;
      }
      return (
        <div className={`${classes}`}>
          {label && (
            <label htmlFor="email" className="form__label fs-18-14 fw-500 ">
              {label} {required?<span className="fx-14 fw-bold text-danger">*</span>:''}
            </label>
          )}
          <input
            type="email"
            value={email}
            placeholder={placeholder || "Enter email"}
            onChange={(e) => {
              setEmail(e.target.value);
              changeHandler(e.target.value, validateEmail(e.target.value));
              setIsEmail(!validateEmail(e.target.value));
            }}
            disabled={disable}
            id="emailAddres"
            className={`input-box w-80 ${
              isEmail ? "border-red" : ""
            }  ${disable?'desibled-input':''}`}
          />
        </div>
      );
    case "password":
      const [password, setPassword] = useState(values);
      return (
        <div className={` ${classes}`}>
        {label && (
          <label htmlFor={id || "password"} className="form__label fs-18-14 fw-500 ">
            {label} {required?<span className="fx-14 fw-bold text-danger ">*</span>:''}
          </label>
        )}

        <input
          type="password"
          id={id || "password"} 
          name="password "
          value={password}
          placeholder={placeholder || "********"}
          onChange={(e) => {
            changeHandler(e.target.value);
            setPassword(e.target.value);
          }}
          // maxLength={4}
          className={`input-box num-format ${
            false ? "border-red" : ""
          } `}
          // pattern="[0-9]{4}"
          required={required}
        />
      </div>
      );
    case "selectDropDown":
      const [selected, setSelected] = useState("");
      // const [isError,setIsError]=useState(false)
      return (
        <div className="custom-ant-sellect-frame">
          <Form.Item
            label=""
            name="Select"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              // defaultValue="Select Catogery"
              placeholder={placeholder || "Select Options"}
              onSelect={(e) => {
                
              }}
              style={{
                width: 120,
              }}
              loading={false}
              allowClear
              options={[
                {
                  value: "lucy",
                  label: "Lucy",
                },
              ]}
            />
          </Form.Item>
        </div>
      );
    case "tel":
      const [tel, setTel] = useState(values);
      return (
        <div className="">
          {label && (
            <label htmlFor="phone" className="form__label fs-18-14 fw-500 ">
              {label} {required?<span className="fx-14 fw-bold text-danger">*</span>:''}
            </label>
          )}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={tel}
            placeholder={placeholder || "Enter Phone Number"}
            onChange={(e) => {
              changeHandler(e.target.value);
              setTel(e.target.value);
            }}
            title="Format : 212-456-7890"
            maxLength={10}
            className={`input-box ${false ? "border-red" : ""} ${classes}`}
            pattern="[0-9]{10}"
            required={required}
          />
        </div>
      );

    case "num":
      const [num, setNum] = useState(values);
      return (
        <div className="">
          {label && (
            <label htmlFor="num" className="form__label fs-18-14 fw-500 ">
              {label} {required?<span className="fx-14 fw-bold text-danger">*</span>:''}
            </label>
          )}

          <input
            type="number"
            id="num"
            name="number"
            value={num}
            placeholder={placeholder || "Enter Phone Number"}
            onChange={(e) => {
              changeHandler(e.target.value);
              setNum(e.target.value);
            }}
            maxLength={4}
            className={`input-box num-format ${
              false ? "border-red" : ""
            } ${classes}`}
            pattern="[0-9]{4}"
            required={required}
          />
        </div>
      );
    default:
      const [inputVal,setInputVal]=useState(values)
      return (
        <div className="">
          {label && (
            <label htmlFor="text" className="form__label fs-18-14 fw-500 ">
              {label} {required?<span className="fx-14 fw-bold text-danger">*</span>:''}
            </label>
          )}
          <input
            type="text"
            placeholder={placeholder || "Enter text"}
            value={inputVal}

            onChange={(e) => {
              changeHandler(e.target.value);
              setInputVal(e.target.value)
            }}
            id="text"
            className={`input-box ${false ? "border-red" : ""}  ${classes}`}
            required={required}
          />
        </div>
      );
  }
}
