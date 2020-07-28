import React, { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Step2(props) {
  const hist = useHistory();
  const [response, setresponse] = useState({ loading: true });
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setdata] = useState({
    pickupType: "true",
    sarokhWarehouseId: "true",
    shipperWarehouseId: "true",
    deliveryLocation: "",
    customerAddress: "",
    sarokhPoint: "",
    dealerPointId: "",
  });

  console.log(data);

  const { register, errors, handleSubmit } = useForm({
    defaultValues: hist.location.state === undefined ? {} : hist.location.state.step2,
    shouldFocusError: true

  });

  const onsubmit = (data1) => {
    console.log(data1);
    hist.replace({
      pathname: hist.location.pathname,
      state: {
        ...hist.location.state,
        step2: { ...data1 },
      },
    });
    hist.push({
      pathname: "/shipper/newshipment/step3",
      state: {
        ...hist.location.state,
        step2: { ...data1 },
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `${process.env.REACT_APP_API}/order/get-pickup-delivery-locations/${user.id}`
        )
        .then((response) => {
          if (response.status === 200) {
            setresponse({ loading: false, data: response.data });
            if(hist.location.state.step2 === undefined){}else{ setdata({...hist.location.state.step2})}
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
    fetchData();
  }, []);

  const goback = () => {
    hist.push({
      pathname: "/shipper/newshipment/step1",
      state: { step1: { ...hist.location.state.step1 } },
    });
  };

  return response.loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <StepIndicator step2={"current"} />
      <form className="margintop30" onSubmit={handleSubmit(onsubmit)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="pickupType">Pickup Location</label>
            <select
              className="form-control"
              id="pickupType"
              name="pickupType"
              defaultValue={data.pickupType}
              onChange={(e) => {
                setdata({ ...data, pickupType: e.target.value });
              }}
              ref={register({
                required: true,
                validate: value => value !== "true",
              })}
            >
              <option key={1} value="true">Pickup Location</option>
              <option key={2} value="SarokhPoint">From Sarokh Points</option>
              <option key={3} value="ShipperWarehouse">From Shipper Warehouse</option>
              <option key={4} value="SarokhWarehouse">From Sarokh Warehouse</option>
            </select>
            <span style={{ color: "red" }}>
              {" "}
              {errors.pickupType && "Pickup Location is required"}
            </span>
            {data.pickupType === "SarokhWarehouse" ? (
              <div className="mt-3">
                <label htmlFor="sarokhWarehouseId">Sarokh Warehouse</label>
                <select
                  className="form-control"
                  id="sarokhWarehouseId"
                  name="sarokhWarehouseId"
                  defaultValue={data.sarokhWarehouseId}
                  onChange={(e) => {
                    setdata({ ...data, sarokhWarehouseId: e.target.value });
                  }}
                  ref={register({
                    required: true,
                    validate: (value) => value !== "true",
                  })}
                >
                  <option key={12345} value="true">--- Select Sarokh Warehouse ---</option>
                  {response.data.sarokhWarehouses.map((doc,i) => {
                    return <option key={i} value={doc.id}>{doc.name}</option>;
                  })}
                </select>
                <span style={{ color: "red" }}>
                  {" "}
                  {errors.sarokhWarehouseId && "sarokh warehouse is required"}
                </span>
              </div>
            ) : null}
            {data.pickupType === "ShipperWarehouse" ? (
              <div className="mt-3">
                <label htmlFor="deliveryLocation`">Shipper Warehouse</label>
                <select
                  className="form-control"
                  id="shipperWarehouseId"
                  name="shipperWarehouseId"
                  defaultValue={data.shipperWarehouseId}
                  onChange={(e) => {
                    setdata({ ...data, shipperWarehouseId: e.target.value });
                  }}
                  ref={register({
                    required: true,
                    validate: (value) => value !== "true",
                  })}
                >
                  <option key={12345} value="true">--- Select Shipper Warehouse ---</option>
                  {response.data.shipperWarehouses.map((doc,i) => {
                    return <option key={i} value={doc.id}>{doc.name}</option>;
                  })}
                </select>
                <span style={{ color: "red" }}>
                  {" "}
                  {errors.shipperWarehouseId &&
                    "Shipper Warehouse is required"}
                </span>
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="deliveryLocation">Delivery Location</label>
            <select
              className="form-control"
              id="deliveryLocation"
              name="deliveryLocation"
              defaultValue={data.deliveryLocation}
              onChange={(e) => {
                setdata({ ...data, deliveryLocation: e.target.value });
              }}
              ref={register({
                required: true,
                validate: (value) => value !== "true",
              })}
            >
              <option key={1} value="true">Delivery Location </option>
              <option key={2} value="SarokhPoint">Select Delivery Location Now</option>
              <option key={3} value="PredefinedLocation">
                Let the Receiver Choose
              </option>
            </select>
            <span style={{ color: "red" }}>
              {" "}
              {errors.deliveryLocation && "Delivery location is required"}
            </span>
            {data.deliveryLocation === "SarokhPoint" ? (
              <div className="mt-3">
                <label name="sarokhPointRadio">
                  Choose the type of delivery location
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sarokhPoint"
                    id="indeliverycase"
                    value="customerAddress"
                    defaultChecked={data.customerAddress === "customerAddress"}
                    onClick={(e) => {
                      setdata({
                        ...data,
                        customerAddress: "customerAddress",
                        sarokhPoint: "",
                      });
                    }}
                    ref={register()}
                  />
                  <span style={{ color: "red" }}>
                    {" "}
                    {errors.sarokhPoint && "this is required"}
                  </span>
                  <label className="form-check-label" htmlFor="indeliverycase">
                    Customer's Address
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sarokhPoint"
                    id="selectNow"
                    value="sarokhPoint"
                    defaultChecked={data.sarokhPoint === "sarokhPoint"}
                    onClick={(e) => {
                      setdata({
                        ...data,
                        sarokhPoint: "sarokhPoint",
                        customerAddress: "",
                      });
                    }}
                    ref={register({required: true})}
                  />
                  <span style={{ color: "red" }}>
                    {" "}
                    {errors.sarokhPoint && "This field is required"}
                  </span>
                  <label className="form-check-label" htmlFor="selectNow">
                    Sarokh Point
                  </label>
                </div>
              </div>
            ) : null}
            {(data.sarokhPoint === "sarokhPoint" && data.deliveryLocation === "SarokhPoint") ? (
              <div className="mt-3">
                <label htmlFor="concernPerson">Sarokh Point</label>
                <select
                  className="form-control"
                  id="dealerPointId"
                  name="dealerPointId"
                  defaultValue={data.dealerPointId}
                  onChange={(e) => {
                    setdata({ ...data, dealerPointId: e.target.value });
                  }}
                  ref={register({
                    required: true,
                    validate: (value) => value !== "true",
                  })}
                >
                  <option key={12345} value="true">--- Select Sarokh Point ---</option>
                  {response.data.sarokhPoints.map((doc,i) => {
                    return (
                      <option key={i} value={doc.id}>
                        {doc.dealerPointName}
                      </option>
                    );
                  })}
                </select>
                <span style={{ color: "red" }}>
                  {" "}
                  {errors.dealerPointId && "Sarokh Point is required"}
                </span>
              </div>
            ) : null}
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
              <button
                className="btn btn-secondary dark-grey"
                onClick={() => {
                  goback();
                }}
              >
                Go to previous step
              </button>
              <button className="btn btn-success" type="submit">
                Next step
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
