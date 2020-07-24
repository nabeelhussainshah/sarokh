import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';

export default function PendingShipment(props) {
    const [loading, setloading] = useState(true);
    const [response, setresponse] = useState();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API}/order/get-pending-orders/${user.id}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setresponse(response.data.data);
                        setloading(false);
                    }
                })
                .catch((err) => {
                    window.alert(err.message);
                });
        }
        fetchData();
    }, []);

    const columns = [
        {
            Header: 'Info',
            accessor: '',
            Cell: (row) => {
                return (<i className='fa fa-info-circle' ></i>)
            }
        },
        {
            Header: 'tracking No',
            accessor: 'orderId'
        },
        {
            Header: 'Date/Time',
            accessor: 'dateTime'
        },
        {
            Header: 'Reciever Name',
            accessor: 'receiverName'
        },
        {
            Header: 'Payment Type',
            accessor: 'paymentType'
        },
        {
            Header: 'COD Amount',
            accessor: 'codAmount'
        },
        {
            Header: 'status',
            accessor: 'status'
        }
    ];

    const data = [];
    return loading ? <div>loading...</div> : (
        <ListingContainer>
            <div className="card-header">
                <h2>COD Shipments</h2>
            </div>
            <div className="card-body">
                <Table
                    data={response}
                    columns={columns}
                    tableclass={"table-responsive custom-table"}
                    pagination={true}
                />
            </div>
        </ListingContainer>
    );
}