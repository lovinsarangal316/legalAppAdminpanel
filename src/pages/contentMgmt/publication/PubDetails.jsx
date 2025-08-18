import React, { useEffect, useState } from "react";
import Panel from "../../../components/Panel";
import { NavLink, useParams } from "react-router-dom";
import { pathData } from "../../../navigation/constants";
import { GetPublicationService } from "../../../services/globalServices";
import { baseUrlForImage } from "../../../helper";
import noImaage from "../../../assets/images/noimage.avif"
import Loader from "../../../components/loaders/Loader";

const PublicationDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loadingForGetUser, setLoadingForGetUser] = useState(false);
  // Fetch faq data on component mount
  useEffect(() => {
    GetPublicationService(setData, setLoadingForGetUser, id)
  }, [id])
  if (loadingForGetUser) {
    return <Loader />
  }
  return (
    <Panel>
      <div className="text-end mb-2">
        <NavLink to={`${pathData.contentUpdatePublication}${id}`} className="btn btn-primary">Edit</NavLink>
      </div>
      <div className="userDetail">
        <div className="image_section">
          <img
            src={data && data?.image ? baseUrlForImage + data?.image : noImaage}
            height={400}
            alt="profileImage"
            className="w-100 rounded"
          />
        </div>
        <hr />
        <div className="contact_info mt-4">
          <h4 className="mb-4">
            {data && <div dangerouslySetInnerHTML={{ __html: data?.title }}></div>}
          </h4>
          <p>
            {data && <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>}
          </p>
        </div>
        <hr />
      </div>
    </Panel>
  );
};

export default PublicationDetail;
