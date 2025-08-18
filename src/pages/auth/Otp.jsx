import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import logo from "../../assets/logo/logo.svg";
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { VerifyOtpService } from '../../services/globalServices';
import BtnLoader from "../../components/loaders/BtnLoader";

const Otp = () => {
  const location = useLocation()
  const [localState, setLoclState] = useState({
    otp: "",
    id: location?.state?.id,
    error: ""
  });
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localState.otp) {
      setLoclState((prev) => ({ ...prev, error: "Otp is required" }))
    } else if (localState.otp.length < 4) {
      setLoclState((prev) => ({ ...prev, error: "Please fill completely" }))
    } else {
      delete localState['error'];
      VerifyOtpService(localState, setLoading, navigate)
    }

  }
  return (
    <div className='loginWrapper vh-100 d-flex align-items-center justify-content-center'>
      <div className='w-25'> <div className="text-center">
        <img src={logo} alt="logo" />
      </div>

        <div className="form_wrapper p-4 mt-3">
          <h5 className='mb-4 text-center'> Varification Code</h5>
          <Form onSubmit={handleSubmit}>
            <OtpInput
              value={localState.otp}
              onChange={(event) => setLoclState((prev) => ({ ...prev, otp: event, error: "" }))}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              containerStyle={{ justifyContent: "center", gap: "10px" }}
              inputStyle={{ height: "50px", width: "50px", borderRadius: "8px" }}
            />
            {localState.error && <small className='text-danger' style={{ marginTop: "10px", display: "block" }}>{localState.error} </small>}
            <div className='text-center'>
              <button className='btn btn-primary mt-3 w-100' disabled={loading} type='submit'> {loading ? <BtnLoader /> : "Send"}</button></div>
          </Form>
        </div>
      </div>

    </div >
  )
}

export default Otp
