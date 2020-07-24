import React, { useState, useEffect } from 'react';
import MainContainer from '../../components/Containers/MainContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';

export default function CodShipment(props) {
    const [loading, setloading] = useState(true);
    const [response, setresponse] = useState();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API}/order/get-COD-shipments/${user.id}`)
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
        <MainContainer>
            <div className="card-header">
                <h2>COD Shipments</h2>
            </div>
            <div className="card-body">
                <Table
                    data={response}
                    columns={columns}
                    tableclass={"table-responsive custom-table"}
                />
            </div>
        </MainContainer>
    );
}