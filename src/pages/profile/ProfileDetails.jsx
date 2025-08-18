import { useNavigate } from "react-router-dom";
import { pathData } from "../../navigation/constants";
import "../css/profile.css";
import Loader from "../../components/loaders/Loader";
import profileLogo from "../../assets/images/profile.png";
import { baseUrlForImage } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import StatusCode from "../../utils/statuscode";
import { useEffect } from "react";
import { userprofile } from "../../redux/thunks/userprofile";
const ProfilePage = () => {
  const { profileData, status } = useSelector((state) => state?.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userprofile());
  }, []);
  if (status === StatusCode.LOADING) {
    return <Loader />;
  }
  return (
    <div className="userProfile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div className="avatar-container">
                  {profileData?.image ? (
                    <img
                      src={baseUrlForImage + profileData?.image}
                      alt="Profile"
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      <img
                        src={profileLogo}
                        alt="Profile"
                        className="profile-avatar"
                      />
                    </div>
                  )}
                </div>
                <div className="profile-info ms-3">
                  <h4 className="mb-1 text-capitalize">{profileData?.full_name}</h4>
                  <h6 className="light_gray">{profileData?.designation} </h6>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(pathData.editProfile, { state: profileData })
                }
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <h6 className="text-uppercase">Personal Information</h6>
            <div className="personal-info mt-4">
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Full Name</h6>
                <span className="ms-3">{profileData?.full_name}</span>
              </div>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Email</h6>
                <span className="ms-3">{profileData?.email}</span>
              </div>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Phone</h6>
                <span className="ms-3">+{profileData?.phone}</span>
              </div>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Address</h6>
                <span className="ms-3">{profileData?.address}</span>
              </div>
            </div>
            <hr />
          </div>

          <div className="col-md-12">
            <div className="contact_info mt-4">
              <h6 className="text-uppercase">Company Info</h6>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Company Name</h6>
                <span className="light_gray ms-3">
                  {profileData?.company_name}{" "}
                </span>
              </div>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Company Type</h6>
                <span className="light_gray ms-3">
                  {profileData?.company_type}
                </span>
              </div>
              <div className="d-flex mt-4">
                <h6 className="w-25 mb-0">Website</h6>
                <span className="light_gray ms-3">{profileData?.website} </span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
