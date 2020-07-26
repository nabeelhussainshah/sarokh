import React from "react";
import StepIndicator from "./StepIndicator";
import {useHistory} from 'react-router-dom';

export default function Step2(props) {

  const hist = useHistory();
  const goback = ()=>{
    hist.push('/shipper/newshipment/step1');
  };

  return (
    <>
    <StepIndicator step1={"active"} />
      <form className="margintop30">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="pickupType">Pickup Location</label>
            <select className="form-control" id="pickupType">
              <option value>Pickup Location</option>
              <option />
              <option value="DealerPoint">From Sarokh Points</option>
              <option value="ShipperWarehouse">From Shipper Warehouse</option>
              <option value="SarokhWarehouse">From Sarokh Warehouse</option>
            </select>
            <div className="mt-3">
              <label htmlFor="sarokhWarehouseId">Sarokh Warehouse</label>
              <select className="form-control" id="sarokhWarehouseId">
                <option value>--- Select Sarokh Warehouse ---</option>
                <option></option>
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="deliveryLocation`">Shipper Warehouse</label>
              <select className="form-control" id="shipperWarehouseId">
                <option value>--- Select Shipper Warehouse ---</option>
                <option></option>
              </select>
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="deliveryLocation">Delivery Location</label>
            <select className="form-control" id="deliveryLocation">
              <option value>Delivery Location </option>
              <option />
              <option value="To Sarokh Point">
                Select Delivery Location Now
              </option>
              <option value="To Predefined Location">
                Let the Receiver Choose
              </option>
            </select>
            <div className="mt-3">
              <label name="sarokhPointRadio">
                Choose the type of delivery location
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sarokhPointRadio"
                  id="indeliverycase"
                  defaultValue="indeliverycase"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="indeliverycase">
                  Customer's Address
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sarokhPointRadio"
                  id="selectNow"
                  defaultValue="selectNow"
                />
                <label className="form-check-label" htmlFor="selectNow">
                  Sarokh Point
                </label>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="concernPerson">Sarokh Point</label>
              <select
                className="form-control"
                id="dealerPointId"
                formcontrolname="dealerPointId"
              >
                <option value>--- Select Sarokh Point ---</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-12">
            <div className="btn-container float-left">
              <button type="button" className="btn btn-danger">
                Cancel
              </button>
            </div>
            <div className="btn-container float-right">
              <button className="btn btn-secondary dark-grey" onClick={()=>{goback()}}>
                Go to previous step
              </button>
              <button className="btn btn-success" type="button">
                Next step
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
