
import { Badge, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./pateintDetails.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import Medicine from "../components/medicine/Medicine";

const PatientDetails = () => {
  const location = useLocation();
  const { patId } = location.state;
       
       //set token from session storage
       const [token, setToken] = useState(sessionStorage.getItem("token_patient"));
       //to set defaults of axios header
       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({});
  // medicines corrusponding to patient
  const [medicines, setMedicines] = useState([]);
  //to refresh the page
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  //=============================get data from server=============
  const GetPatientDataFromServer = () => {
    const url = `${URL}/patient/getPatient/${patId}`;
    //{{url}}/patient/getPatient/20
    axios.get(url).then((res) => {
      const result = res.data;
      console.log("insiide GetPatientDataFromServer ");
      console.log(res);
      if (result.status == "success") setPatientData(result.data);
      else toast.warning("inavalid user logged in ");
    }).catch(err=>{
      navigate("/error");
  });
  };
  //to get corrusponding medicines from server
  const GetAllMedicineOfPatientFromServer = () => {
    setDataChangedFlag(false); //to refresh the page to update to current values
    const url = `${URL}/patient/getMedicines/${patId}`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setMedicines(result.data);
        console.log("medicine recieved from server for patient" + res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  //useEffect to update page on data change
  useEffect(() => {
    console.log("inside use effect patient details");
    GetAllMedicineOfPatientFromServer();
    GetPatientDataFromServer();

  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div style={{ color: "yellow" }}>contact no: {patientData.cellNo},</div>
      <div style={{ color: "yellow" }}>address:{patientData.address}</div>
    </Tooltip>
  );

  return (
    <div className="container-fluid mainContainer ">
      <div style={{ marginTop: "30px", float: "right",marginRight:"70px" }}>
        <Button
          onClick={() => {
            sessionStorage.setItem("token_patient","");
            navigate("/");
          }}
          variant="primary"
        >
          LogOut
        </Button>
      </div>
     
      
      
      <div>
        <OverlayTrigger
          placement="right"
          delay={{ show: 1000, hide: 3000 }}
          overlay={renderTooltip}
        >
          <Button style={{ marginTop: "30px" }} variant="warning">
            {" "}
            <h4 className="title">
              welcome {patientData.firstName + " " + patientData.lastName}
            </h4>
          </Button>
        </OverlayTrigger>
       
      </div>
      <table class="table table-hover patientTableContainer bg-light table-striped">
        <tbody>
          <tr>
            <th>Name:</th>{" "}
            <th>{patientData.firstName + " " + patientData.lastName}</th>
          </tr>
          <tr>
            <th>Doctor Alloted </th>{" "}
            <th>
              {patientData.doctorFirstName + " " + patientData.doctorLastName}
            </th>
          </tr>
          <tr>
            <th>Payment Status </th> <th>{patientData.paymentStatus == "pending" ?

<div style={{ marginTop: "5px"}}>
<Button
  onClick={() => {
    navigate("/patientDetails/payment" ,{state:{patId:PatientDetails.patId}});
  }}
  variant="primary"
>
  Pay
</Button>
</div>
            
            
     :<div></div>       }</th>
          </tr>
          <tr>
            <th>Doctor Alloted </th> <th>{patientData.doctorCellNo}</th>
          </tr>
          <tr>
            <th>Date of admission </th> <th>{patientData.dateOfAdmission}</th>
          </tr>
          <tr>
            <th>Blood group </th> <th>{patientData.bloodGroup}</th>
          </tr>
          <tr>
            <th>Bed alloted </th>{" "}
            <th>{patientData.type + "-" + patientData.bedAlloted}</th>
          </tr>
          <tr>
            <th>Patient Problem </th> <th>{patientData.patientProblem}</th>
          </tr>
          <tr>
            <th>Prescription </th>{" "}
            <th>
              <div class="form-group">
                <textarea
                  class="form-control"
                  value={patientData.prescription}
                  id="exampleFormControlTextarea1"
                  rows="2"
                  readOnly
                ></textarea>
              </div>
            </th>
          </tr>

          <tr>
            <th>Medicine alloted </th>
            <th>
              <table className="patientPageMedicineList table">
                <tr >
                  <th>medicine</th>
                  <th>No of tablets</th>
                  <th>prescription</th>
                </tr>

                {medicines.map((medicine) => {
                  return <Medicine medicine={medicine} />;
                })}
              </table>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetails;
