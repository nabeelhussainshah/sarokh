import OrderDetails from '../../components/ShipperComponents/ShipperDetailsComponents/OrderDetails';
import PaymentDetails from '../../components/ShipperComponents/ShipperDetailsComponents/PaymentDetails';
import RecieverDetails from '../../components/ShipperComponents/ShipperDetailsComponents/RecieverDetails';
import ShipmentDelieveryStatus from '../../components/ShipperComponents/ShipperDetailsComponents/ShipmentDelieveryStatus';
import ShipmentDetail from '../../components/ShipperComponents/ShipperDetailsComponents/ShipmentDetail';
import Container from '../../components/Containers/OrderDetailsContainer';
import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';


export default function ShipmentDetails(props)
{
    const loc = useLocation();
    const [loading, setloading] = useState(true);
    const [response, setresponse] = useState();
    const user = localStorage.getItem('user');

    useEffect(()=>{
        async function fetchData()
        {
            await axios.get(`${process.env.REACT_APP_API}/order/get-details/${loc.state.id}`)
            .then((response)=>{
                setresponse(response.data.data);
                setloading(false)
            })
            .catch((err)=>{
                window.alert(err.message);
            });
        }
        fetchData();
    },[]);

    return loading ? <div>Loading...</div> :(
        <Container>
            <OrderDetails response={response}/>
            <RecieverDetails response = {response.shipmentOrderItems[0]}/>
            <ShipmentDetail response={response.shipmentOrderItems[0]}/>
            <PaymentDetails response={response.shipmentOrderItems[0]} />
            <ShipmentDelieveryStatus />
        </Container>
        );

}