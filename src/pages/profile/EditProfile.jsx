import React, { useState } from "react";
import NoImage from "../../assets/images/profile.png";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import profileLogo from "../../assets/images/profile.png";
import {
  UpdateProfileService,
  UploadProfileImageService,
} from "../../services/globalServices";
import BthLoader from "../../components/loaders/BtnLoader";
import { baseUrlForImage } from "../../helper";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
const EditProfilePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadingForImage, setLoadingForImage] = useState(false);
  const navigate = useNavigate();
  const [localState, setLocalState] = useState({
    inputData: {
      name: location?.state?.full_name,
      email: location?.state?.email,
      phone: location?.state?.phone,
      address: location?.state?.address,
      company_name: location?.state?.company_name,
      company_type: location?.state?.company_type,
      website: location?.state?.website,
      image: location?.state?.image,
    },
    inputError: {
      name: "",
      email: "",
      phone: "",
      address: "",
      company_name: "",
      company_type: "",
      website: "",
    },
  });
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prev) => ({
      ...prev,
      inputData: {
        ...prev.inputData,
        [name]: value,
      },
      inputError: {
        ...prev.inputError,
        [name]: value.length > 0 ? "" : `${name} is required`,
      },
    }));
  };

  const handlePhoneInput = (value, dial_code) => {
    setLocalState((prev) => ({
      ...prev,
      inputData: {
        ...prev.inputData,
        phone: value,
        dial_code: dial_code.dialCode
      },
      inputError: {
        ...prev.inputError,
        phone: ""
      }
    }))

  }
  // handle submit
  const handleSave = (e) => {
    e.preventDefault();
    if (
      !localState.inputData.name &&
      !localState.inputData.email &&
      !localState.inputData.phone &&
      !localState.inputData.address &&
      !localState.inputData.company_name &&
      !localState.inputData.company_type &&
      !localState.inputData.website
    ) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          name: "Name is required",
          email: "Email is required",
          phone: "Phone is required",
          address: "Address is required",
          company_name: "Company name is required",
          company_type: "Company type is required",
          website: "Website is required",
        },
      }));
    } else if (!localState.inputData.name) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          name: "Name is required",
        },
      }));
    } else if (!localState.inputData.email) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          email: "Email is required",
        },
      }));
    } else if (!localState.inputData.phone) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          phone: "Phone is required",
        },
      }));
    } else if (!localState.inputData.address) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          address: "Address is required",
        },
      }));
    } else if (!localState.inputData.company_name) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          company_name: "Company name is required",
        },
      }));
    } else if (!localState.inputData.company_type) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          company_type: "Company type is required",
        },
      }));
    } else if (!localState.inputData.website) {
      setLocalState((prev) => ({
        ...prev,
        inputError: {
          ...prev.inputError,
          website: "Website is required",
        },
      }));
    } else {
      const phoneWithoutDialCode = localState.inputData.phone.replace(localState.inputData.dial_code, '');
      const payload = {
        id: location?.state?._id,
        full_name: localState?.inputData?.name,
        email: localState?.inputData?.email,
        dial_code: localState?.inputData?.dial_code,
        country_code: location?.state?.country_code,
        phone: phoneWithoutDialCode,
        address: localState?.inputData?.address,
        image: localState?.inputData?.image,
        company_name: localState?.inputData?.company_name,
        company_type: localState?.inputData?.company_type,
        website: localState?.inputData?.website,
        designation: location?.state?.designation,
      };
      UpdateProfileService(payload, setLoading, navigate);
    }
  };
  // handle profile image handler
  const handleImageUpload = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      UploadProfileImageService(
        file,
        setLoadingForImage,
        setLocalState,
        navigate
      );
    }
  };

  return (
    <div className="userProfile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header d-flex align-items-center mb-4">
              <div className="avatar-container">
                <label style={{ height: "100%" }} htmlFor="profileImage">
                  {loadingForImage ? (
                    <BthLoader />
                  ) : (
                    <img
                      src={
                        localState.inputData.image
                          ? baseUrlForImage + localState.inputData.image
                          : profileLogo
                      }
                      alt="noImage"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </label>
                <input
                  id="profileImage"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control mt-2 d-none"
                />
              </div>
              <div className="profile-info ms-3">
                <h4 className="mb-1">{location?.state?.full_name}</h4>
                <h6 className="light_gray">{location?.state?.designation}</h6>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <h6 className="text-uppercase">Personal Information</h6>
            <div className="personal-info mt-4">
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Full Name</h6>
                <input
                  type="text"
                  name="name"
                  value={localState.inputData.name}
                  onChange={handleChange}
                  className="form-control ms-3"
                />
              </div>
              {localState.inputError.name && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.name}{" "}
                </small>
              )}
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Email</h6>
                <input
                  type="email"
                  name="email"
                  value={localState.inputData.email}
                  onChange={handleChange}
                  className="form-control ms-3"
                />
              </div>
              {localState.inputError.email && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.email}{" "}
                </small>
              )}
              <div className="d-flex mt-4 align-items-center edit_profile_phone">
                {/* <h6 className="w-25 mb-0">Phone</h6>
                <input
                  type="number"
                  name="phone"
                  value={localState.inputData.phone}
                  onChange={handleChange}
                  className="form-control ms-3"
                /> */}
                <h6 className="w-25 mb-0">Phone</h6>
                <PhoneInput
                  country={'us'}
                  value={localState.inputData.phone}
                  onChange={handlePhoneInput}
                />

              </div>
              {localState.inputError.phone && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.phone}{" "}
                </small>
              )}
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Address</h6>
                <input
                  type="text"
                  name="address"
                  value={localState.inputData.address}
                  onChange={handleChange}
                  className="form-control ms-3"
                />
              </div>
              {localState.inputError.address && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.address}{" "}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-12 mt-4 d-none">
            <h6 className="text-uppercase">Change Password</h6>
            <div className="password-change mt-4">
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">New Password</h6>
                <input
                  type="password"
                  name="newPassword"
                  value={localState.inputData.newPassword}
                  onChange={handleChange}
                  className="form-control ms-3"
                />
              </div>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Confirm Password</h6>
                <input
                  type="password"
                  name="confirmPassword"
                  value={localState.inputData.confirmPassword}
                  onChange={handleChange}
                  className="form-control ms-3"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="contact_info mt-4">
              <h6 className="text-uppercase">Company Info</h6>
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Company Name</h6>
                <input
                  type="text"
                  name="company_name"
                  value={localState.inputData.company_name}
                  onChange={handleChange}
                  className="form-control ms-3"
                  placeholder="Enter company name"
                />
              </div>
              {localState.inputError.company_name && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.company_name}{" "}
                </small>
              )}
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Company Type</h6>
                <input
                  type="text"
                  name="company_type"
                  value={localState.inputData.company_type}
                  onChange={handleChange}
                  className="form-control ms-3"
                  placeholder="Enter company type"
                />
              </div>
              {localState.inputError.company_type && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.company_type}{" "}
                </small>
              )}
              <div className="d-flex mt-4 align-items-center">
                <h6 className="w-25 mb-0">Website</h6>
                <input
                  type="text"
                  name="website"
                  value={localState.inputData.website}
                  onChange={handleChange}
                  className="form-control ms-3"
                  placeholder="Enter website"
                />
              </div>
              {localState.inputError.website && (
                <small className="text-danger text-capitalize">
                  {localState.inputError.website}{" "}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <BthLoader /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
