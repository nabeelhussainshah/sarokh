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
    const [response, setresponse] = useState({loading: true});
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(loc.state);

    useEffect(()=>{
        async function fetchData()
        {
            return await axios.get(`${process.env.REACT_APP_API}/order/get-details/${loc.state.id}`)
            .then((response)=>{
                setresponse({loading: false,data: response.data.data});

            })
            .catch((err)=>{
                window.alert(err.message);
            });
        }
        fetchData();
    },[]);

    return response.loading ? <div>Loading...</div> :(
        <Container>
            <OrderDetails response={response.data}/>
            <RecieverDetails response = {response.data.shipmentOrderItems[0]}/>
            <ShipmentDetail response={response.data.shipmentOrderItems[0]}/>
            <PaymentDetails response={response.data.shipmentOrderItems[0]} />
            <ShipmentDelieveryStatus />
        </Container>
        );

}