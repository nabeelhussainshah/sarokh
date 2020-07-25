import React from "react";

export default function ShipmentDelieveryStatus(props) {
  return (
<div className="shipper-detail-container mt-3">
  <h2>Shipment Delivery Status</h2>
  <label className="customise-radio-btn">
    Shipper Warehouse
    <input type="radio" defaultChecked={false} name="radio" />
    <span className="checkmark">
    </span></label>
  <label className="customise-radio-btn">
    In Process
    <input type="radio" defaultChecked={false} name="radio" />
    <span className="checkmark">
    </span></label>
  <label className="customise-radio-btn">
    Delivered
    <input type="radio" defaultChecked={true} name="radio" />
    <span className="checkmark">
    </span></label>
  <div className="clearfix">
  </div>
</div>

  );
}
