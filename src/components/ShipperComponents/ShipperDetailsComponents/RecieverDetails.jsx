import React from 'react';

export default function RecieverDetails({ response }) {
  return (
    <div>
      <h2 className="mt-3 mb-1 font20">Receiver Detail</h2>
      <table className="table table-resposive">
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Name</td>
            <td style={{ width: '30%' }}>{response.receiverName}</td>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Contact</td>
            <td style={{ width: '30%' }}>{response.contact}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Address</td>
            <td style={{ width: '30%' }}>{response.address}</td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}