import React, { useState, useEffect, useRef } from "react";
import ListingContainer from "../../components/Containers/ListingContainer";
import axios from 'axios';
import { toast } from "react-toastify";
import logo from "../../assets/images/sarokh-logo.png";

export default function PrintWayBill(props) {

  const [response, setresponse] = useState({ loading: true });

  const printBill = () => {
    var content = document.getElementById("print-section");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  const showBill = () => {
    var content = document.getElementById("print-section");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/order/get-all-shipments-trackingnumber`)
      .then((response) => {
        if (response.status === 200) {
          setresponse({ loading: false, list: response.data.data });
        }
        else {
          toast.error('Internal Server Error 500');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = async (value) => {

    if (value !== "true") {
      await axios.get(`${process.env.REACT_APP_API}/order/find-shipment-trackingno/${value}`)
        .then((res) => {
          console.log(res)
          setresponse({ ...response, content: true, data: res.data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(response);
  return response.loading ? <div>Loading...</div> : (
    <ListingContainer>
      <div>
        <div className="card-header"><h2>Print Way Bill</h2></div>
        <div className="card-body">
          <label>Select Tracking Numbers</label>
          <select className="form-control mb-5" id="status" onChange={(e) => { handleChange(e.target.value) }}>
            <option value="true">---Select Order id---</option>
            {response.list.map((doc, i) => {
              return (
                <option key={i} value={doc}>
                  {doc}
                </option>
              );
            })}
          </select>
          <ComponentToPrint response={response} />
          {response.content === undefined ? null :
            <>
              <button onClick={() => printBill()} className="btn btn-primary mt-4 float-right">print</button>
              {setTimeout(() => showBill(), 100)}
            </>
          }

        </div>
      </div>
    </ListingContainer>
  );
}

const ComponentToPrint = ({ response }) => {

  return (
    <>
      {response.content === undefined ? null :
        < iframe id="ifmcontentstoprint" style={{ width: '100%', height: "510px" }}>
          <div id="print-section" >
            <table className="margintop50" style={{ textAlign: 'center', width: '100%' }} border={1}>
              <tbody>
                <tr style={{ border: "none" }}>
                  <td style={{ width: "20%" }} />
                  <td style={{ width: "20%" }} />
                  <td style={{ width: "20%" }} />
                  <td style={{ width: "20%" }} />
                  <td style={{ width: "20%" }} />
                </tr>
                <tr>
                  <td style={{ padding: "10px 0" }} colSpan={2}>
                    <img src={logo} alt="Logo" />
                  </td>
                  <td colSpan={3}>
                    <img src={response.data.shipmentOrderItems[0].barCode} alt="Logo" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} rowSpan={4}>
                    From
                </td>
                  <td>
                    <strong>Company Name</strong>
                  </td>
                  <td>ABC</td>
                </tr>
                <tr>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>Shipper Address</td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>
                    {response.data.shipFromCity}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phone</strong>
                  </td>
                  <td>
                    {response.data.shipmentOrderItems[0].contact}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>&nbsp;</td>
                  <td style={{ fontSize: 18, fontWeight: "bold" }} rowSpan={4}>
                    To
                </td>
                  <td>
                    <strong>Customer Name</strong>
                  </td>
                  <td>
                    {response.data.shipmentOrderItems[0].receiverName}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ fontSize: 18, fontWeight: "bold" }}
                    rowSpan={2}
                    colSpan={2}
                  >

                    {response.data.orderId}

                  </td>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>
                    {response.data.shipmentOrderItems[0].address}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>
                    {response.data.shipToCity}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>&nbsp;</td>
                  <td>
                    <strong>Phone</strong>
                  </td>
                  <td>
                    {response.data.shipmentOrderItems[0].contact}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>&nbsp;</td>
                  <td style={{ fontSize: 15, fontWeight: "bold" }}>
                    {response.data.shipFromCity}
                  </td>
                  <td colSpan={2}>For Sender Only</td>
                </tr>
                <tr>
                  <td colSpan={2}>Clasification</td>
                  <td>To</td>
                  <td colSpan={2} rowSpan={2}>
                    <img src={response.data.shipmentOrderItems[0].qrcode} style={{ width: 80 }} alt="Logo" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>&nbsp;</td>
                  <td style={{ fontSize: 15, fontWeight: "bold" }}>
                    {response.data.shipToCity}

                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pickup Date</strong>
                  </td>
                  <td colSpan={2}>
                    {new Date(response.data.createdDatetime).toDateString()}
                  </td>
                  <td>
                    <strong>Service</strong>
                  </td>
                  <td colSpan={2}>
                    {response.data.shipmentOrderItems[0].paymentType}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pices</strong>
                  </td>
                  <td colSpan={2}>1 of 1</td>
                  <td>
                    <strong>Weight</strong>
                  </td>
                  <td colSpan={2}>
                    {response.data.shipmentOrderItems[0].weight}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Reference</strong>
                  </td>
                  <td colSpan={2}>xxxxx</td>
                  <td>
                    <strong>Notes</strong>
                  </td>
                  <td colSpan={2}>
                    {response.data.shipmentOrderItems[0].additionalServices}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </iframe>
      }
    </>
  );
}