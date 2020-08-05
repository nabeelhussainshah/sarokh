import React,{useState,useEffect} from "react";
import StepIndicator from "./StepIndicator";
import {useForm} from 'react-hook-form';
import {useHistory,Redirect} from 'react-router-dom';
import axios from "axios";
import { newShipment, newShipmentList } from "./state";
import {useRecoilState, useSetRecoilState} from 'recoil';

export default function Step1(props) {

  const hist = useHistory();
  const [data,setdata] = useRecoilState(newShipment);
  const [response, setresponse] = useState({loading: true});
  const setState = useSetRecoilState(newShipmentList);

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
      });
    }
    fetchData();
  },[]);

  const {register,errors,handleSubmit} = useForm(
    {
      defaultValues: data,
      shouldFocusError : true,
      mode: "onChange",
      criteriaMode: "all"

    }
  );
  const onSubmit = formData =>{
    setdata({...data, ...formData});
    hist.push('/shipper/newshipment/step2');
    console.log(data);

  };

  const cancel = () => {
    setdata({});
    setState([]);
    hist.push('/shipper/allshipments');
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
              {response.data.map((doc,i)=>{
                return(
                <option key={i} value={doc}>{doc}</option>
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

              {response.data.map((doc,i)=>{
                return(
                <option key={i} value={doc}>{doc}</option>
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
              <button type="button" className="btn btn-danger" onClick={()=>{cancel()}}>
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
