import React from "react";
import { useEffect, useState } from "react";
import commonGetApi from "../../server/Api";
import { FloatButton, Space, Table } from "antd";
import trashIcon from "../../assets/images/trash-solid.svg";
// import trashIcon from "../../assets/images/";
import exclamationCircleIcon from "../../assets/images/circle-exclamation-solid.svg";
import { API_LIMIT } from "../../utils/constant";
import { resOk } from "../../utils/reusableFunction";
import { CustomModal, SubHeader } from "../../components";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CloudDownloadOutlined } from "@ant-design/icons";

export default function Books() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState({ deleteData: false, editData: {} });
  const { deleteData, editData } = isDelete;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, setPageSizeLimit] = useState(API_LIMIT);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);

  async function getData() {
    setLoading(true);
    const res = await commonGetApi(
      `https://openlibrary.org/search.json?q=${searchValue?.toLowerCase()}&limit=${
        pageSizeLimit || API_LIMIT
      }&page=${currentPage}`
    );
    if (resOk(res.status)) {
      // console.log(res)
      setLoading(false);
      setData(res.data?.docs);
      setTotalItems(res.data?.numFound);
    }
  }
  useEffect(() => {
    navigate({
      search: `q=${encodeURIComponent(searchValue)}&page=${currentPage}&limit=${
        pageSizeLimit || API_LIMIT
      }`,
    });
    getData();
  }, [currentPage, searchValue, pageSizeLimit]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      sorter: (a, b) => a?.title?.localeCompare(b.title),
    },
    {
      title: "Author Name",
      dataIndex: "author_name",
      key: "author_name",
      sorter: (a, b) => a?.author_name?.[0]?.localeCompare(b?.author_name?.[0]),
      ellipsis: true,
      render: (_, record) => record?.author_name?.[0],
    },
    {
      title: "Ratings",
      dataIndex: "ratings_average",
      key: "ratings_average",
      sorter: (a, b) => a.ratings_average.localeCompare(b.ratings_average),
      ellipsis: true,
    },
    {
      title: "First Publish Year",
      dataIndex: "first_publish_year",
      key: "first_publish_year",
      sorter: (a, b) =>
        a.first_publish_year.localeCompare(b.first_publish_year),
      ellipsis: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sorter: (a, b) => a.subject?.[0].localeCompare(b.subject?.[0]),
      ellipsis: true,
      render: (_, record) => record?.subject?.[0],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Image
            src={trashIcon}
            onClick={() => setIsDelete({ deleteData: true, editData: record })}
            alt="deletIcon"
            className="delete-icon"
          />
        </Space>
      ),
    },
  ];

  const onChangeHandler = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
    setOffset((pagination.current - 1) * (pageSizeLimit || API_LIMIT));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDelete({ deleteData: false, editData: {} });
  };

  const downloadCSV = () => {
    const headers =
      columns
        .filter((col) => col?.dataIndex) 
        .map((col) => col?.title)
        .join(",") + "\n";

    const rows = data
      ?.map((row) =>
        columns.filter((col) => col?.dataIndex)
          .map((col) => {
            const value = row[col?.dataIndex];
            if (Array.isArray(value)) {
              return value[0]; 
            }
            return value;
          })
          .join(",")
      )
      .join("\n");

    const csv = headers + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div>
      <div className="table-wrapper">
        <SubHeader
          title="Books"
          isSearch={true}
          searchHandler={(e) => {
            setSearchValue(e);
          }}
          btnName=""
          btnHandler={() => {}}
        />
        <CustomModal
          title="&nbsp;"
          isModalOpen={deleteData}
          handleCancel={handleCancel}
          okBtn={"Yes"}
          noBtn={"No"}
          z
          okHandler={() => {
            handleCancel;
          }}
        >
          <p className="mb-0 fs-18-14 fw-normal d-flex align-items-center gap-3">
            <Image src={exclamationCircleIcon} className="w-24" alt="!" />
            <span>
              {" "}
              Are you sure you want to delete{" "}
              <span className="delete-title-Name">{editData?.title}</span> ?
            </span>
          </p>
        </CustomModal>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSizeLimit || API_LIMIT,
            total: totalItems,
            position: [
              "none",
              totalItems > (pageSizeLimit || API_LIMIT)
                ? "bottomCenter"
                : "none",
            ],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onShowSizeChange: (curr, size) => {
              setPageSizeLimit(size);
            },
          }}
          loading={loading}
          onChange={onChangeHandler}
        />
        {!loading && (
          <FloatButton
          onClick={downloadCSV}
            tooltip={<div>Download table Data</div>}
            // type="primary"
            style={{ right: 34, backgroundColor: "rgb(106, 200, 231)" }}
            icon={<CloudDownloadOutlined className={"text-white"} />}
          />
        )}
      </div>
    </div>
  );
}
