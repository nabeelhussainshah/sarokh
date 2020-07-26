import React from "react";
import StepIndicator from "./StepIndicator";
import {useStateMachine} from 'little-state-machine';
import {UpdateAction,DeleteAction} from "./actions/actions";
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';


export default function Step1(props) {
  const hist = useHistory();
  const {action,state} = useStateMachine(UpdateAction,DeleteAction);
  const {register,errors,handleSubmit} = useForm(
    {
      defaultValues: state
    }
  );
  const onSubmit = data =>{
    action(data);
    hist.push(`/shipper/newshipment/step2`);

  };
  console.log(state);
  const deleteDate = ()=>{
    window.STATE_MACHINE_RESET();

  };
  return (
    <>
      <StepIndicator step1={"active"} />
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
              ref={register({required : true})}
            >
              <option value>--- Ship From City ---</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label>Ship To</label>
            <select
              className="form-control"
              id="shipToCity"
              name="shipToCity"
              ref={register({required : true})}
            >
              <option value>--- Ship To City ---</option>
            </select>
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
