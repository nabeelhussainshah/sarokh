import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';
import { useTransition, animated } from "react-spring";

export default function AllShipments(props) {
    const [loading, setloading] = useState(true);
    const [response, setresponse] = useState();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API}/order/get-all-shipments/${user.id}`)
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
            Header: 'Action',
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
            Header: 'Location',
            accessor: 'pickType'
        },
        {
            Header: 'Delievery',
            accessor: 'deliveryType'
        },
        {
            Header: 'Date And Time',
            accessor: 'dateTime'
        },
        {
            Header: 'Reciever',
            accessor: 'receiverName'
        },
        {
            Header: 'Status',
            accessor: 'status'
        }
    ];

    const transitions = useTransition(!loading, null, {
        from: { opacity: 0, transform: "translate3d(-270px,0,0)" },
        enter: {
          opacity: 1,
          transform: "translate3d(0,0px,0)",
          transition: "ease-out 0.3s",
        },
      });

    return loading ? <div>loading...</div> : (
        transitions.map(
            ({ item, props, key }) =>
              item && (
                <animated.div key={key} style={props}>
        <ListingContainer>
            <div className="card-header">
                <h2>All Shipments</h2>
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
        </animated.div>
        )
    )
  );
}