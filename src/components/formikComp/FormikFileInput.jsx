import React, { useState } from "react";
import { ErrorMessage } from "formik";
import { Button, Col } from "react-bootstrap";
import { UploadProfileImageViaFormikStateService } from "../../services/globalServices";
import { baseUrlForImage } from "../../helper";
import BthLoader from "../loaders/BtnLoader";
import { toast } from "react-toastify";

const FormikFileInput = ({ flag, image_url, label, name, colProps, setFieldValue, slug, ...rest }) => {
  const [loadingForImage, setLoadingForImage] = useState(false);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (flag) {
      let img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();
      let width = img.width;
      let height = img.height;
      if (file) {
        if (width == 200 && height == 200) {
          if (file) {
            UploadProfileImageViaFormikStateService(
              file,
              setLoadingForImage,
              (shortPath) => setFieldValue(name, shortPath),
              slug
            );
          }
        } else {
          toast.error("Image size should be (200 * 200)")
        }
      }
    } else {
      if (file) {
        UploadProfileImageViaFormikStateService(
          file,
          setLoadingForImage,
          (shortPath) => setFieldValue(name, shortPath),
          slug
        );
      }
    }
  };

  const handleRemovePreview = () => {
    setFieldValue(name, null);
  };

  return (
    <Col {...colProps} className="mb-3 ">
      <div className="file-upload-container">
        {/* {
          flag && <small className="mb-2 d-block text-danger fw-bold">* Dimension (200 * 200) </small>
        } */}
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          {...rest}
          className="form-control-file d-none"
          onChange={handleFileChange}
        />

        <div
          className={`file-upload-placeholder ${image_url ? "has-preview" : ""}`}
          onClick={() => document.getElementById(name).click()}
        >
          {loadingForImage ? <BthLoader /> : image_url ? (
            <div className="preview-container">
              <img src={baseUrlForImage + image_url} alt="Preview" className="preview-image" />
              <Button
                variant="primary"
                type="button"
                className="remove-preview-btn"
                onClick={handleRemovePreview}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="upload-icon">
              <span>+</span>
            </div>
          )}
          {!image_url && !loadingForImage && <p>Click to Upload Image</p>}
        </div>
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </Col>
  );
};

export default FormikFileInput;
