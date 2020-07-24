import React from "react";

export default function ShipmentDelieveryStatus(props) {
  return (
<div classname="shipper-detail-container mt-3">
  <h2>Shipment Delivery Status</h2>
  <label classname="customise-radio-btn">
    Shipper Warehouse
    <input type="radio" defaultChecked={false} name="radio" />
    <span classname="checkmark">
    </span></label>
  <label classname="customise-radio-btn">
    In Process
    <input type="radio" defaultChecked={false} name="radio" />
    <span classname="checkmark">
    </span></label>
  <label classname="customise-radio-btn">
    Delivered
    <input type="radio" defaultChecked={true} name="radio" />
    <span classname="checkmark">
    </span></label>
  <div classname="clearfix">
  </div>
</div>

  );
}
