import React from "react";

export default function PaymentDetails({ response }) {
  return (
    <div>
      <h2 className="mt-3 mb-1 font20 redcolor">Payment Detail</h2>
      <table className="table table-resposive">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>Payment Type</td>
            <td style={{ width: "30%" }}>{response.paymentType}</td>
            <td style={{ fontWeight: "bold", width: "20%" }}>Shipment Value</td>
            <td style={{ width: "30%" }}>{response.shipmentValue}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>
              Delivery Charges
            </td>
            <td style={{ width: "30%" }}>{response.shipmentDeliveryCharges}</td>
            <td style={{ fontWeight: "bold", width: "20%" }}>COD Amount</td>
            <td style={{ width: "30%" }}>{response.codAmount}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold", width: "20%" }}>
              response Billed Amount
            </td>
            <td style={{ width: "30%" }}>{response.shipmentBilledAmount}</td>
            <td style={{ fontWeight: "bold", width: "20%" }} />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
