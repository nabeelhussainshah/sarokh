import React from 'react';

export default function ShipmentDetails({ response }) {
  return (
    <div>

      <h2 className="mt-3 mb-1 font20">Shipment Detail</h2>
      <table className="table table-resposive">
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Tracking No</td>
            <td style={{ width: '30%' }}>{response.trackingNumber}</td>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Title</td>
            <td style={{ width: '30%' }}>{response.shipmentTitle}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Content</td>
            <td style={{ width: '30%' }}>{response.contact}</td>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Additonal Services</td>
            <td style={{ width: '30%' }}>{response.additionalServices}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Type</td>
            <td style={{ width: '30%' }}>{response.shipmentType}</td>
            <td style={{ fontWeight: 'bold' }}>Weight</td>
            <td style={{ width: '30%' }}>{response.weight}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Confirmation</td>
            <td>{response.receiverConfirmation}</td>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Delivered Date/Time</td>
            <td>{response.deliveryDate}</td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}