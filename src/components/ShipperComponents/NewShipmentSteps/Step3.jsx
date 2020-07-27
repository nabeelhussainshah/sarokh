import React from "react";
import StepIndicator from "./StepIndicator";
import { useHistory } from "react-router-dom";

export default function Step3(props) {
  const hist = useHistory();
  console.log(hist.location.state);
  return (
    <>
      <StepIndicator />
      <div className="order-step-detail">
        <div className="form-row">
          <div className="col-sm-12">
            <h2>Receiver Information</h2>
          </div>
        </div>
        <form>
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
            <div className="form-group col-md-12">
              <label htmlFor="receiverAddress">Receiver Address</label>
              <div className="input-group">
                <input type="text" class="form-control" placeholder="Your Email" />
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
                placeholder="Shipment Title"
              />
            </div>
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
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="weight">Shipment Weight</label>
              <select className="form-control" id="sel1">
                <option value>Shipment Weight</option>
                <option value="Upto 5 kg">Upto 5 kg</option>
                <option value="5 kg to 10 kg"> 5 kg to 10 kg</option>
                <option value="Above 15 kg">Above 15 kg</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="shipmentName">Shipment Value</label>
              <input
                type="text"
                className="form-control"
                id="shipmentName"
                placeholder="Shipment Title"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-12">
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
            <div className="col-md-6">
              <h2>Shipper Bill</h2>
              <h3>Additional Services</h3>
              <table className="table">
                <tr>
                  <td className="bordertop font14" align="left">
                    <input type="checkbox" />Normal Packaging
                </td>
                  <td className="bordertop font14" align="right">SAR 0/-</td>
                </tr>
                <tr>
                  <td className="font14" align="left">
                    <input type="checkbox" />Gift Packaging
                </td>
                  <td className="font14" align="right">SAR 5/-</td>
                </tr>
                <tr>
                  <td className="font14" align="left">
                    <input type="checkbox" />Insurance (2% of Shipment Value)
                </td>
                  <td className="font14" align="right">SAR 15/-</td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td className="bordertop" align="left">
                    Additional Services Total:
                </td>
                  <td className="bordertop" align="right">SAR 20/-</td>
                </tr>
                <tr>
                  <td>
                    Services Charges:
                </td>
                  <td align="right">SAR 35/-</td>
                </tr>
                <tr>
                  <td>
                    Receiver Address Surcharge:
                  </td>
                  <td align="right">SAR 10/-</td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td className="bordertop" align="left">
                    Sub Total:
                </td>
                  <td className="bordertop" align="right">SAR 65/-</td>
                </tr>
                <tr>
                  <td align="left">
                    VAT: (15%)
                </td>
                  <td align="right">SAR 20/-</td>
                </tr>
              </table>
              <table className="table">
                <tr>
                  <td className="font18" align="left">
                    Total: (VAT Incusive)
                </td>
                  <td className="font18" align="right">SAR 85/-</td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <h2>Receiver Bill</h2>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="weight">Shipment Bill</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipmentName"
                    placeholder="Shipment Title"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="shipmentName">Cash On Delivery (COD)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipmentName"
                    placeholder="Shipment Title"
                  />
                </div>
              </div>
              <table className="table bordernone mb-3">
                <tr>
                  <td className="font18 bordernone redcolor" align="left">
                    Cash to be collected by Receiver
                </td>
                  <td className="font18 bordernone redcolor" align="right">SAR 200/-</td>
                </tr>
              </table>
              <div class="form-row">
                <div className="col-sm-12">
                  <p>Note: COD does not include delivery charges and shipper is liable to pay all delivery and additional service changes</p>
                </div>
              </div>
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
                <button type="button" className="btn btn-danger canclebtn">
                  Cancel
                </button>
              </div>
              <div className="btn-container float-right">
                <button className="btn btn-success" type="button">
                  Clone
                </button>
                <button className="btn btn-success" type="button">
                  Add to Way Bill
                </button>
                <div className="clearfix"></div>
                <button className="btn btn-success mt-3 width206 finishbtn" type="button">
                  Finish
                </button>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </form>
        <div className="clearfix"></div>
        <div class="col-sm-12 margintop30">
          <table>
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
                  <i class="fa fa-trash-o"></i>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table >
        </div >
      </div >
    </>
  );
}
