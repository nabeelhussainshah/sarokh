import React from "react";
import StepIndicator from "./StepIndicator";
import {useHistory} from "react-router-dom";

export default function Step3(props) {
  const hist = useHistory();
  console.log(hist.location.state);
  return (
    <>
     <StepIndicator />
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <div>
              Latitude:
              <input className="form-control" type="text" />
            </div>
          </div>
          <div className="form-group col-md-6">
            <div>
              Longitude:
              <input className="form-control" type="text" />
            </div>
          </div>
        </div>
        <form className="margintop30">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="receiverName">Receiver Name</label>
              <input
                type="text"
                className="form-control"
                id="receiverName"
                placeholder="Receiver Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="receiverMobileNumber">Receiver Contact No</label>
              <input
                type="text"
                className="form-control"
                id="receiverMobileNumber"
                placeholder="Receiver Contact No"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="receiverAddress">Receiver Address</label>
              <input
                type="text"
                className="form-control"
                id="receiverAddress"
                placeholder="Receiver Address"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Shipment Type</label>
              <select className="form-control" id="sel1">
                <option value>Shipment Type</option>
                <option value="Electronics">Electronics</option>
                <option value="General Goods">General Goods</option>
                <option value="Apparel">Apparel</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="weight">Shipment Weight</label>
              <select className="form-control" id="sel1">
                <option value>Shipment Weight</option>
                <option value="Upto 5 kg">Upto 5 kg</option>
                <option value="5 kg to 10 kg"> 5 kg to 10 kg</option>
                <option value="Above 15 kg">Above 15 kg</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shipmentName">Shipment Title</label>
              <input
                type="text"
                className="form-control"
                id="shipmentName"
                placeholder="Shipment Title"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="shipmentcontent">Shipment Content</label>
              <textarea
                style={{ resize: "none" }}
                className="form-control"
                id="content"
                placeholder="Shipment Content"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shipmentValue">Shipment Value (SAR)</label>
              <input
                type="text"
                className="form-control"
                id="value"
                placeholder="Shipment Value"
              />
              <p
                style={{
                  fontSize: 11,
                  fontStyle: "italic",
                  marginTop: 5,
                  marginLeft: 5,
                  color: "#666666",
                }}
              >
                Exclusive of VAT
              </p>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="deliveryCharges">Delivery Charges (SAR)</label>
              <input
                type="text"
                className="form-control"
                disabled
                id="deliveryCharges"
                placeholder="Delivery Charges"
              />
              <p
                style={{
                  fontSize: 11,
                  fontStyle: "italic",
                  marginTop: 5,
                  marginLeft: 5,
                  color: "#666666",
                }}
              >
                Exclusive of VAT
              </p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Payment Type</label>
              <select
                className="form-control"
                id="paymentType"
                formcontrolname="paymentType"
              >
                <option value>Payment Type</option>
                <option value="COD">Cash On Delivery(COD)</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="codAmount">COD Amount (SAR)</label>
              <input
                type="text"
                className="form-control"
                id="codAmount"
                placeholder="COD Amount"
              />
              <p
                style={{
                  fontSize: 11,
                  fontStyle: "italic",
                  marginTop: 5,
                  marginLeft: 5,
                  color: "#666666",
                }}
              >
                Exclusive of VAT
              </p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-6">
              <div className="form-row mb-4 mt-4">
                <div>
                  <label className="mr-3">
                    <input type="checkbox" /> data.name
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
                <button type="button" className="btn btn-danger">
                  Cancel
                </button>
              </div>
              <div className="btn-container float-right">
                <button className="btn btn-success" type="button">
                  Add to Way Bill
                </button>
                <button className="btn btn-success" type="button">
                  Clone
                </button>
                <button className="btn btn-success" type="button">
                  Update
                </button>
              </div>
              <div className="btn-container float-right mr-2 mb-4"></div>
              <div className="clearfix" />
              <small style={{ color: "#ec1c24 !important" }}>
                Prepaid means that you will be obliged to pay the shipping
                charges mentioned below Cash on Delivery (COD) are the total
                charges that will be collected from the receiver upon delivery.
                This includes the Shipping charges that are to be paid to
                Sarokh.
              </small>
            </div>
          </div>
        </form>
        <button className="btn btn-primary mt-3" type="button">
          Complete Way Bill List
        </button>
        <div className="col-sm-12" style={{ margin: "25px 0 00 0" }}>
          <table
            style={{ width: "100%" }}
            className="dataTable table-responsive pb-3"
          >
            <thead>
              <tr>
                <th scope="col">Actions</th>
                <th scope="col">Receiver Name</th>
                <th scope="col">Receiver Contact</th>
                <th scope="col">Reciver Address</th>
                <th scope="col">Shipment Type</th>
                <th scope="col">Shipment Weight</th>
                <th scope="col">Additional Services</th>
                <th scope="col">Payment Type</th>
                <th scope="col">COD Amount</th>
                <th scope="col">Shipment Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i
                    style={{ fontSize: 20, color: "#d9534f" }}
                    className="fa fa-trash-o"
                  />
                </td>
                <td>shipment.receiverName</td>
                <td>shipment.receiverMobileNumber</td>
                <td>shipment.receiverAddress</td>
                <td>shipment.shipmentType</td>
                <td>shipment.weight</td>
                <td>shipment.additionalServices</td>
                <td>shipment.paymentType</td>
                <td>shipment.codAmount</td>
                <td>shipment.billedAmount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
