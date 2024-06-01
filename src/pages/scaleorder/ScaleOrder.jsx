import { Space, Table } from "antd";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import trashIcon from "../../assets/images/trash-solid.svg";
import editIcon from "../../assets/images/pen-to-square-solid.svg";
import exclamationCircleIcon from "../../assets/images/circle-exclamation-solid.svg";
import { CustomModal } from "../../components";
import { InputBox } from "../../utils/forms";
import moment from "moment/moment";
import { render } from "react-dom";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    price: 32,
    status: "active",
    modified: "25/04/2024 (07:24 AM)",
  },
  {
    key: "2",
    name: "John",
    price: 42,
    status: "completed",
    modified: "22/04/2024 (12:24 PM)",
  },
];

export default function ScaleOrder() {
  const [scaleData, setScaleData] = useState({
    activeScale: [dataSource[0]],
    completeScale: [dataSource[1]],
  });
  const { activeScale, completeScale } = scaleData;

  const [scaleInfo, setScaleInfo] = useState({ name: "", price: "" });
  const {name,price}=scaleInfo;
  const [isDelete, setIsDelete] = useState({ deleteData: false, editData: {} });
  const { deleteData, editData } = isDelete;

  const [isAddEdit, setIsAddEdit] = useState(false);
  const [isActiveData, setIsActiveData] = useState(true);
  const [currentEditKey, setCurrentEditKey] = useState(null);

  const handleCancel = () => {
    setIsDelete({ deleteData: false, editData: {} });
  };

  const handleDelete = () => {
    setScaleData((prev) => ({
      ...prev,
      [isActiveData ? 'activeScale' : 'completeScale']: (isActiveData ? activeScale : completeScale).filter(item => item.key !== editData.key)
    }));
    handleCancel();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Last Modified",
      dataIndex: "modified",
      key: "modified",
    //   render:(_,record)=>(
    //     moment(record?.modified).format('DD/MM/YYYY (hh:mm A)')
    //   )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Image
            src={trashIcon}
            onClick={() => setIsDelete({ deleteData: true, editData: record })}
            alt="deleteIcon"
            className="delete-icon"
          />
          <Image
            src={editIcon}
            onClick={() => {
                setIsAddEdit(true);
                setScaleInfo({ name: record.name, price: record.price });
                setCurrentEditKey(record.key);
              }}
              alt="editIcon" 
            className="delete-icon"
          />
        </Space>
      ),
    },
  ];


  const SubmitHandler = (e) => {
    e.preventDefault();

    const newScale = {
      key: currentEditKey || Date.now().toString(),
      name,
      price,
      status: isActiveData ? "active" : "completed",
      modified: moment().format("DD/MM/YYYY (hh:mm A)"),
    };

    setScaleData((prev) => {
      const updatedData = isActiveData ? [...activeScale] : [...completeScale];
      if (currentEditKey) {
        const index = updatedData.findIndex((item) => item.key === currentEditKey);
        updatedData[index] = newScale;
      } else {
        updatedData.push(newScale);
      }

      return {
        ...prev,
        [isActiveData ? "activeScale" : "completeScale"]: updatedData,
      };
    });

    setIsAddEdit(false);
    setCurrentEditKey(null);
    setScaleInfo({ name: "", price: "" });
  };

  return (
    <div className="table-wrapper">
      <CustomModal
        title="&nbsp;"
        isModalOpen={deleteData}
        handleCancel={handleCancel}
        okBtn="Yes"
        noBtn="No"
        okHandler={handleDelete}
      >
        <p className="mb-0 fs-18-14 fw-normal d-flex align-items-center gap-3">
          <Image src={exclamationCircleIcon} className="w-24" alt="!" />
          <span>
            Are you sure you want to delete <span className="delete-title-Name">{editData?.name}</span>?
          </span>
        </p>
      </CustomModal>
      <CustomModal
        title="&nbsp;"
        isModalOpen={isAddEdit}
        handleCancel={() => setIsAddEdit(false)}
        okBtn=""
        noBtn=""
      >
        <form onSubmit={SubmitHandler}>
          <Row>
            <Col sm={6}>
              <InputBox
                label="Name"
                placeholder="Enter name"
                values={name}
                changeHandler={(d) => setScaleInfo({ ...scaleInfo, name: d })}
              />
            </Col>
            <Col sm={6}>
              <InputBox
                type="num"
                label="Price"
                placeholder="Enter price"
                values={price}
                changeHandler={(d) => setScaleInfo({ ...scaleInfo, price: d })}
              />
            </Col>
            <Col sm={12} className="text-right mt-4">
              <button type="submit" className="submit-btn">
                Save
              </button>
            </Col>
          </Row>
        </form>
      </CustomModal>
      <div className="scale-sub-header">
        <div className="scale-btn-wrapper d-flex gap-3">
          <div
            className={`fs-16-13 fw-medium primary-btn ${isActiveData && 'active-btn'}`}
            onClick={() => setIsActiveData(true)}
          >
            Active Scale Order
          </div>
          <div
            className={`fs-16-13 fw-medium primary-btn ${!isActiveData && 'active-btn'}`}
            onClick={() => setIsActiveData(false)}
          >
            Completed Scale Order
          </div>
        </div>
        <div
          className="fs-16-13 fw-medium primary-btn rounded-1"
          onClick={() => {setIsAddEdit(true);   setScaleInfo({ name: "", price: "" })}}
        >
          + Scale Order
        </div>
      </div>
      <Table
        dataSource={isActiveData ? activeScale : completeScale}
        columns={columns}
      />
    </div>
  );
}
