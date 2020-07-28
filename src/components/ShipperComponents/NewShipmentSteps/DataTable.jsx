import React from "react";
import Table from "../../Generictable/generatictable";

export default function DataTable(props)
{
    const columns = [
        {
            Header: 'Action',
            Cell: (row)=>{
                return(
                <> <i className="fa fa-trash"></i>
                <i className="fa fa-edit"></i>
                </>
                );
            }
        },
        {
            Header: 'Reciever Name',
            accessor: 'receiverName'
        },
        {
            Header: 'Reciever Contact',
            accessor: 'receiverContact'
        },
        {
            Header: 'Reciever Address',
            accessor: ''
        },
        {
            Header: 'Shipment Type',
            accessor: 'shipmentType'
        },
        {
            Header: 'Shipment Weight',
            accessor: 'shipmentWeight'
        },
        {
            Header: 'Additional Services',
            accessor: 'additionalCharges'
        },
        {
            Header: 'Payment Type',
            accessor: 'billingType'
        },
        {
            Header: 'COD Amount',
            accessor: 'CodValue'
        },
        {
            Header: 'Shipment Cost',
            accessor: 'shipmentCost'
        }
    ];

    return <Table data={props.data} columns={columns} />

}