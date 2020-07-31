import React,{useState,useEffect} from "react";
import StepIndicator from "./StepIndicator";
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from "axios";


export default function Step1(props) {

  const [response, setresponse] = useState({loading: true});
  useEffect(()=>{
    async function fetchData()
    {
      await axios.get(`${process.env.REACT_APP_API}/city/get-list`)
      .then((response)=>{
        if(response.status === 200)
        {
          console.log(response);
          setresponse({loading: false, data: response.data.data});
        }
      })
      .catch((err)=>{
        window.alert(err.message);
      })
    }
    fetchData();
  },[]);

  const hist = useHistory();
  console.log(hist.location)
  const {register,errors,handleSubmit} = useForm(
    {
      defaultValues: hist.location.state === undefined ? {} : hist.location.state.step1
    }
  );
  const onSubmit = data =>{
    hist.replace({pathname:hist.location.pathname,state:{step1:{...data}}});
    hist.push({pathname:`/shipper/newshipment/step2`,state:{step1:{...data}}});

  };
  const deleteDate = ()=>{
    window.STATE_MACHINE_RESET();

  };
  return response.loading ? <div>Loading...</div> : (
    <>
      <StepIndicator step1={"current"} />
      <form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
        <p>
          Please select the city that you are shipping from and where you would
          like for it to be received.
        </p>
        <div className="form-row" style={{ display: "none" }}>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Ship From </label>
            <select
              className="form-control"
              id="shipFromCity"
              name="shipFromCity"
              placeholder="--- Ship From City ---"
              ref={register({required : true, validate: value => value !== "true"})}
            >
              {/* <option value="true">--- Ship From City ---</option> */}
              {response.data.map((doc)=>{
                return(
                <option value={doc}>{doc}</option>
                );
              })}
            </select>
            <span style={{ color: "red" }}>
                {" "}
            {errors.shipFromCity && "City is required"}
            </span>
          </div>
          <div className="form-group col-md-6">
            <label>Ship To</label>
            <select
              className="form-control"
              id="shipToCity"
              name="shipToCity"
              ref={register({required : true, validate: value => value !== "true"})}
            >
              {/* <option value="true">--- Ship To City ---</option> */}
              {response.data.map((doc)=>{
                return(
                <option value={doc}>{doc}</option>
                );
              })}
            </select>
            <span style={{ color: "red" }}>
                {" "}
            {errors.shipToCity && "City is required"}
            </span>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-12">
            <div className="btn-container float-left">
              <button type="button" className="btn btn-danger" onClick={()=>deleteDate()}>
                Cancel
              </button>
            </div>
            <div className="btn-container float-right">
              <button className="btn btn-success" type="submit">
                Next Step
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
