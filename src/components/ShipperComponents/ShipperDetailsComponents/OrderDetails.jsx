import React from "react";

export default function OrderDetails({ response }) {
  return (
    <div>

      <h2 className="font20">Order Details</h2>
      <table className="table table-resposive">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>Order Id</td>
            <td style={{ width: "30%" }}>{response.orderId}</td>
            <td />
            <td />
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>Ship From City</td>
            <td style={{ width: "30%" }}>{response.shipFromCity}</td>
            <td style={{ fontWeight: "bold", width: "20%" }}>
              Pickup Location
            </td>
            <td style={{ width: "30%" }}>{response.pickupLocation}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>Ship To City</td>
            <td style={{ width: "30%" }}>{response.shipToCity}</td>
            <td style={{ fontWeight: "bold", width: "20%" }}>
              Delivery Location
            </td>
            <td style={{ width: "30%" }}>{response.deliverylocation}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>Assign To</td>
            <td style={{ width: "30%" }}>{response.assignToDetail}</td>
            <td style={{ fontWeight: "bold", width: "20%" }}>
              Order Date/Time
            </td>
            <td style={{ width: "30%" }}>{response.createdDatetime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
