import React from "react";
import { useState, useEffect } from "react";
import { resOk } from "../../utils/reusableFunction";
import commonGetApi from "../../server/Api";
import defaultImage from "../../assets/images/About-Us_Image.png";
import { Image, Spin } from "antd";
import { API_LIMIT } from "../../utils/constant";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  async function getData() {
    setLoading(true);
    const res = await commonGetApi(
      `https://openlibrary.org/search.json?q=${"all"}&limit=${API_LIMIT}&page=1`
    );
    if (resOk(res.status)) {
      // console.log(res)
      setLoading(false);
      setData(res.data?.docs);
    }
  }
  useEffect(() => {
    console.log("What happend");
    getData();
  }, []);
  return (
    <section>
      <h4 className="fs-34-28 fw-bold mt-4">Popular Books To Read :-</h4>
      <div className="dashboard-main-frame">
        {loading?  <div className=" d-flex align-items-center justify-content-center vh-100 w-100"> <Spin tip="Loading ..."  size="large">{content}</Spin></div>
         : data?.map((ele) => {
          return <ImageCart data={ele} />;
        })}
      </div>
      ;
    </section>
  );
}

function ImageCart({ data }) {
  const [isValidThumbnail, setIsValidThumbnail] = useState(true)
  const coverImageUrl = data?.cover_i
    ? `https://covers.openlibrary.org/b/id/${data?.cover_i}-L.jpg`
    : defaultImage;
  return (
    <div className="books-card-frame">
      <div className="books-image-frame">
        {/* <Image src={coverImageUrl} alt="bookImage" /> */}
        {isValidThumbnail && 
        <ImageBlurEffect path={coverImageUrl} setIsValidThumbnail={setIsValidThumbnail} imageClass={''}/>
        }
      </div>
      <div className="books-description-box">
        <h4 className="fs-24-16 fw-semibold">{data?.title || ''}</h4>
        <div className="boos-info-details">
          <p className="fs-16-14 fw-medium my-2">
            Read count : <span className=" fw-bold">{data?.already_read_count || ''}</span>
          </p>
          <p className="fs-16-14 fw-medium mb-2">
          First Publish Year : <span className=" fw-bold">{data?.first_publish_year}</span>
          </p>
          <p className="fs-16-14 fw-medium mb-0">
          Author Name : <span className=" fw-bold">{data?.author_name?.[0]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}


const ImageBlurEffect = ({ path, setIsValidThumbnail, imageClass }) => {
  return (<>

    <LazyLoadImage
      className={`main-img ${imageClass}`}
      alt="image"
      effect="blur"
      src={path}
      onLoad={(e) => { }}
      onError={() => setIsValidThumbnail(false)}
    />
  </>
  );
};
