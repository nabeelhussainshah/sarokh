import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import StepIndicator from "./StepIndicator";
import { useHistory } from "react-router-dom";
import Table from "./DataTable";

export default function Step3(props) {
  const hist = useHistory();
  const [data, setdata] = useState({
    shipmentValue: 10,
    normalPackaging: true,
    gifyPackaging: false,
    insurance: false,
    additionalCharges: 0,
    total: 45,
    paymentType: "COD",
  });
  const [finalData, setfinalData] = useState([]);
  const { register, errors, handleSubmit, reset } = useForm({
    shouldFocusError: true,
    defaultValues: hist.location.step3 === undefined ? {} : hist.location.step3
  });
  // console.log(hist.location.state);
  console.log(finalData);

  const onSubmit = (value) => {
    console.log(value);
    setfinalData([
      ...finalData,
      {
        ...value,
        additionalCharges: data.additionalCharges,
        shipmentCost: data.total + Math.round((data.total / 100) * 15),
      },
    ]);
    reset();
  };

  const addCharges = (type, check) => {
    switch (type) {
      case "normalPackaging":
        setdata({
          ...data,
          normalPackaging: check,
          gifyPackaging: check ? false : data.gifyPackaging,
          additionalCharges: check ? 0 : data.additionalCharges,
          insurance: check ? false : data.insurance,
          total: 45,
        });
        break;

      case "giftPackaging":
        setdata({
          ...data,
          gifyPackaging: check,
          normalPackaging: false,
          additionalCharges: check
            ? data.additionalCharges + 5
            : data.additionalCharges - 5,
          total: check ? data.total + 5 : data.total - 5,
        });
        break;

      case "insurance":
        setdata({
          ...data,
          insurance: check,
          normalPackaging: false,
          additionalCharges: check
            ? data.additionalCharges +
              Math.round((data.shipmentValue / 100) * 2)
            : data.additionalCharges -
              Math.round((data.shipmentValue / 100) * 2),
          total: check
            ? data.total + Math.round((data.shipmentValue / 100) * 2)
            : data.total - Math.round((data.shipmentValue / 100) * 2),
        });
        break;

      case "shipmentValue":
        console.log(check);
        if (Number.isNaN(check) !== true) {
          setdata({
            ...data,
            shipmentValue: check, // in this case check is the value
            insurance: false,
            additionalCharges: data.insurance
              ? data.additionalCharges -
                Math.round((data.shipmentValue / 100) * 2)
              : data.additionalCharges,
            total: data.insurance
              ? data.total - Math.round((data.shipmentValue / 100) * 2)
              : data.total,
          });
          break;
        }
    }
  };

  return (
    <>
      <StepIndicator step3={"current"} />
      <div className="order-step-detail">
        <div className="form-row">
          <div className="col-sm-12">
            <h2>Receiver Information</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="receiverName">Receiver Name</label>
              <input
                type="text"
                className="form-control"
                name="receiverName"
                id="receiverName"
                placeholder="Receiver Name"
                ref={register({ required: true })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.receiverName && "Name is required *"}
              </span>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="receiverMobileNumber">Receiver Contact No</label>
              <input
                type="tel"
                className="form-control"
                id="receiverMobileNumber"
                name="receiverContact"
                placeholder="Receiver Contact No"
                ref={register({ required: true })}
              />
              <span style={{ color: "red" }}>
                {errors.receiverMobileNumber && "Mobile no is required *"}
              </span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="receiverAddress">Receiver Address</label>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Your Email"
                />
                <div className="input-group-append">
                  <span className="input-group-text">map</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-sm-12">
              <h2>Shipment Information</h2>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shipmentName">Shipment Title</label>
              <input
                type="text"
                className="form-control"
                id="shipmentName"
                name="shipmentName"
                placeholder="Shipment Title"
                ref={register({ required: true })}
              />
              <span style={{ color: "red" }}>
                {errors.shipmentName && "Shipment name is required *"}
              </span>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Shipment Type</label>
              <select
                className="form-control"
                id="shipmentType"
                name="shipmentType"
                ref={register({
                  required: true,
                  validate: (value) => value !== "true",
                })}
              >
                <option value="true">Shipment Type</option>
                <option value="Electronics">Electronics</option>
                <option value="General Goods">General Goods</option>
                <option value="Apparel">Apparel</option>
                <option value="Others">Others</option>
              </select>
              <span style={{ color: "red" }}>
                {errors.shipmentType && "Shipment Type is required *"}
              </span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="weight">Shipment Weight</label>
              <select
                className="form-control"
                id="shipmentWeight"
                name="shipmentWeight"
                ref={register({
                  required: true,
                  validate: (value) => value !== "true",
                })}
              >
                <option value="true">Shipment Weight</option>
                <option value="Upto 5 kg">Upto 5 kg</option>
                <option value="5 kg to 10 kg"> 5 kg to 10 kg</option>
                <option value="Above 15 kg">Above 15 kg</option>
              </select>
              <span style={{ color: "red" }}>
                {errors.shipmentWeight && "Shipment weight is required *"}
              </span>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="shipmentName">Shipment Value (SAR)</label>
              <input
                type="number"
                className="form-control"
                name="shipmentValue"
                placeholder="Enter shipment value"
                min="1"
                onChange={(e) =>
                  addCharges("shipmentValue", parseInt(e.target.value))
                }
                defaultValue={data.shipmentValue}
                ref={register({ required: true })}
              />
              <span style={{ color: "red" }}>
                {errors.shipmentValue && "Shipment value is required *"}
              </span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-12">
              <label htmlFor="shipmentcontent">Shipment Contents</label>
              <textarea
                style={{ resize: "none" }}
                className="form-control"
                id="content"
                name="content"
                placeholder="What does the shipment contain?"
                ref={register({ required: true })}
              />
              <span style={{ color: "red" }}>
                {errors.content && "Shipment content is required *"}
              </span>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6">
              <h2>Shipper Bill</h2>
              <h3>Additional Services</h3>
              {data ? (
                <table className="table">
                  <tr>
                    <td className="bordertop font14" align="left">
                      <input
                        key={Math.random()}
                        type="checkbox"
                        name="normalPackaging"
                        defaultValue={data.normalPackaging}
                        defaultChecked={data.normalPackaging}
                        onClick={(e) =>
                          addCharges("normalPackaging", e.target.checked)
                        }
                        ref={register()}
                      />
                      Normal Packaging
                    </td>
                    <td className="bordertop font14" align="right">
                      SAR 0/-
                    </td>
                  </tr>
                  <tr>
                    <td className="font14" align="left">
                      <input
                        key={Math.random()}
                        type="checkbox"
                        name="giftPackaging"
                        defaultChecked={data.gifyPackaging}
                        defaultValue={data.gifyPackaging}
                        onClick={(e) => {
                          addCharges("giftPackaging", e.target.checked);
                        }}
                        ref={register()}
                      />
                      Gift Packaging
                    </td>
                    <td className="font14" align="right">
                      SAR 5/-
                    </td>
                  </tr>
                  <tr>
                    <td className="font14" align="left">
                      <input
                        key={Math.random()}
                        type="checkbox"
                        name="insurance"
                        defaultChecked={data.insurance}
                        defaultValue={data.insurance}
                        onClick={(e) => {
                          addCharges("insurance", e.target.checked);
                        }}
                        ref={register()}
                      />
                      Insurance (2% of Shipment Value)
                    </td>
                    <td className="font14" align="right">
                      SAR {Math.round((data.shipmentValue / 100) * 2)}/-
                    </td>
                  </tr>
                </table>
              ) : null}
              <table className="table">
                <tr>
                  <td className="bordertop" align="left">
                    Additional Services Total:
                  </td>
                  <td className="bordertop" align="right">
                    SAR {data.additionalCharges}/-
                  </td>
                </tr>
                <tr>
                  <td>Services Charges:</td>
                  <td align="right">SAR 35/-</td>
                </tr>
                <tr>
                  <td>Receiver Address Surcharge:</td>
                  <td align="right">SAR 10/-</td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td className="bordertop" align="left">
                    Sub Total:
                  </td>
                  <td className="bordertop" align="right">
                    SAR {data.additionalCharges + 35 + 10}/-
                  </td>
                </tr>
                <tr>
                  <td align="left">VAT: (15%)</td>
                  <td align="right">
                    SAR {Math.round((data.total / 100) * 15)}/-
                  </td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td className="font18" align="left">
                    Total: (VAT Incusive)
                  </td>
                  <td className="font18" align="right">
                    SAR {data.total + Math.round((data.total / 100) * 15)}/-
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <h2>Receiver Bill</h2>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="weight">Shipment Bill</label>
                  <select
                    type="text"
                    className="form-control"
                    name="billingType"
                    placeholder="Enter COD Amount"
                    defaultValue={data.paymentType}
                    onChange={(e) =>
                      setdata({ ...data, paymentType: e.target.value })
                    }
                    ref={register({
                      required: true,
                      validate: (value) => value !== "true",
                    })}
                  >
                    <option value="true">
                      Select Shipment Bill (COD/Prepaid)
                    </option>
                    <option value="COD">Cash On Delievery (COD)</option>
                    <option value="Prepaid">Prepaid</option>
                  </select>
                </div>

                {data.paymentType === "COD" ? (
                  <div className="form-group col-md-12">
                    <label htmlFor="shipmentName">Cash On Delivery (COD)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="CodValue"
                      placeholder="Shipment Title"
                      ref={register({ required: true })}
                    />
                  </div>
                ) : null}
              </div>
              {data.paymentType === "COD" ? (
                <>
                  <table className="table bordernone mb-3">
                    <tr>
                      <td className="font18 bordernone redcolor" align="left">
                        Cash to be collected by Receiver
                      </td>
                      <td className="font18 bordernone redcolor" align="right">
                        SAR 200/-
                      </td>
                    </tr>
                  </table>
                  <div class="form-row">
                    <div className="col-sm-12">
                      <p>
                        Note: COD does not include delivery charges and shipper
                        is liable to pay all delivery and additional service
                        changes
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-6">
              <div className="form-row mb-4 mt-4">
                <div>
                  <label className="mr-3">
                    <input type="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <input
                type="hidden"
                className="form-control"
                id="billedAmount"
                placeholder="Billed Amount"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="col-sm-12">
              <div className="btn-container float-left">
                <button type="button" className="btn btn-danger canclebtn">
                  Cancel
                </button>
              </div>
              <div className="btn-container float-right">
                <button className="btn btn-success" type="button">
                  Clone
                </button>
                <button className="btn btn-success" type="submit">
                  Add to Way Bill
                </button>
                <div className="clearfix"></div>
                <button
                  className="btn btn-success mt-3 width206 finishbtn"
                  type="button"
                >
                  Finish
                </button>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </form>
        <div className="clearfix"></div>
        <div class="col-sm-12 margintop30">
          <Table data={finalData} />
        </div>
      </div>
    </>
  );
}
