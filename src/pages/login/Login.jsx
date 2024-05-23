import React, { useEffect, useState } from "react";
import { InputBox } from "../../utils/forms";
import gooleIon from "../../assets/images/About-Us_Image.png";
import handme from "../../assets/images/4851710.jpg";
import { Button, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";



export default function Login() {
  
  const [show, setShow] = useState(false);
  const[isOpen,setIsOpen]=useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { email, password } = loginInfo;
  const[visible,setVisible]=useState(false);
  const[otp,setOtp]=useState("");
  const[newPassword,setNewPassword]=useState("");
  const navigation = useNavigate();
  const changeHandler = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      emailAddress: email,
      password: password,
    }; password
   
  //  const res=await loginApi(data,navigation,setLoginInfo);
  
  };
  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);
  const handleClosePassword=()=>{setIsOpen(false);setEmailAddress("");setOtp("");setNewPassword("")}

  async function resetHandler(){
    // if(emailAddress){
    //   const data ={
    //       "emailAddress": emailAddress,
    //       "type":"otp"
    //   }
    //   const res=await forgotPasswordApi(FORGOT_PASSWORD,data)
    //   if(res){
    //     toast.success("Open your email")
    //     handleClose()
    //     setIsOpen(true)
    //   }
    // }else{
    //   toast.error("Enter your email address.")
    // }
  }
  async function resetHandlerPassword(){
  //  if(emailAddress){
  //   const data={
  //     "emailAddress":emailAddress,
  //     "otp":otp,
  //     "password":newPassword
  //   }
   
  //  const res=await forgotPasswordApi("/user/verify-otp",data)
  //     if(res){
  //       toast.success("Updated Successfully")
  //       handleClosePassword()
        
  //     }
  //   }else{
  //     toast.error("Something went wrong")
  //   }
  }



  return (
    <section className="login-main-section">
      <Modal className="forgot-pass-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title className="black-757 fw-bold">
            Forgot password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="black-757 fs-16-13 fw-normal mb-4">
            Please enter the email address associated with your UI Account, then
            check your inbox for password reset instructions.
          </p>
          <InputBox
            type="email"
            classes=""
            values={emailAddress}
            placeholder="Enter email"
            changeHandler={(data, isEmail) => {
              setEmailAddress(data)
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary primary-btn px-3 py-1" onClick={resetHandler}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal className="forgot-pass-modal" show={isOpen} onHide={handleClosePassword}>
        <Modal.Header closeButton>
          <Modal.Title className="black-757 fw-bold">
            Set New Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
          <InputBox
            type="email"
            classes=""
            label="Email"
            values={emailAddress}
            disable={true}
            placeholder="Enter email"
            changeHandler={(data, isEmail) => {
              setEmailAddress(data)
            }}

          />
          </div>
         <div className="my-3">
         <InputBox
            type="num"
            classes="input-box"
            label="OTP"
            values={otp}
            
            placeholder="Enter otp"
            changeHandler={(data) => {
              setOtp(data)
            }}
          />
          </div> 
          <div className=" d-flex  ">
          
           <InputBox
             type={visible?"text":"password"}
             label="New Password"
            className="input-box "
            value={newPassword}
            
            placeholder="Enter New Password"
            changeHandler={(data) => {
              setNewPassword(data)
            }}
          />
          <div className="my-5 " style={{position:"absolute",right:"60px"}} onClick={()=>setVisible(!visible)}>
          {visible? <EyeOutlined style={{color:"black"}}/>: <EyeInvisibleOutlined style={{color:"black"}}/>}
       </div>
        </div>  
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary primary-btn px-3 py-2" onClick={resetHandlerPassword}>
            Update Password
          </Button>
        </Modal.Footer>
      </Modal>
   
        <div className="loign-form-frame">
          <div className="login-left-screen w-51 mb-none">
            <Image src={handme}  alt="Logo" />
          </div>
          <div className="login-rignt-screen w-51">
            <div className="screen ">
              <div className="screen__content">
                <h4 className="fs-24-16 fw-bold">Hey! Welcome Back</h4>
                <form className="login" onSubmit={submitHandler}>
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      // form="alex@gmail.com"
                      onChange={changeHandler}
                      required
                      className="login__input"
                      placeholder="Email"
                    />
                  </div>
                  <div className="login__field d-flex">
                    <i className="login__icon fas fa-lock"></i>
                    <input
                      type={visible?"text":"password"}
                      name="password"
                      required
                      value={password}
                      onChange={changeHandler}
                      className="login__input"
                      placeholder="Password"
                    />
                    <div className="login__eyeicon my-3 "  onClick={()=>setVisible(!visible)}>
                     {visible? <EyeOutlined style={{color:"white"}}/>: <EyeInvisibleOutlined style={{color:"white"}}/>}
                    </div>
                  </div>
                  <p
                    onClick={handleShow}
                    className="fx-12 fw-normal grey-3 pointer ps-1 text-decoration-underline"
                  >
                    Forgot pasword
                  </p>
                  <button type="submit" className="button login__submit">
                    <span className="button__text raleway">Log In Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>
                </form>
                <div className="social-login">
                  <h3>log in via</h3>
                  <div className="social-icons">
                    <a
                      href="#"
                      className="social-login__icon fab fa-instagram"
                    ></a>
                    <a
                      href="#"
                      className="social-login__icon fab fa-facebook"
                    ></a>
                    <a
                      href="#"
                      className="social-login__icon fab fa-twitter"
                    ></a>
                  </div>
                </div>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </div>
            
          </div>
        </div>
   
    </section>
  );
}
