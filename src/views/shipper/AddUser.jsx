import React, { useState, useEffect } from "react";
import Container from "../../components/Containers/ListingContainer";
import AddUserForm from "../../components/Forms/AddUserForm";
import axios from "axios";
import { toast } from "react-toastify";
import {useHistory} from 'react-router-dom';

export default function AddUser(props) {
  const hist = useHistory();
  const [data, setdata] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(Object.keys(data).length !== 0)
    {
       axios.post(`${process.env.REACT_APP_API}/user/add-shipper-user/`,
      {
          fullName: data.fullName,
          designation: data.designation,
          userName: data.userName,
          userPassword: data.userPassword,
          email: data.email,
          contact: data.contact,
          gender: data.gender,
          dob: new Date(data.dob).toISOString(),
          userType: 'shipper',
          profilePicture: 'string',
          roleId: 2,
          parentTypeId: user.id
      })
      .then((response)=>{
        if(response.data.status === 200)
        {
          toast.success("user created");
          setTimeout(()=>{
            hist.go();
          },3000);
        }
        else{
          toast.error('username already taken');
        }
      })
      .catch((err)=>{
        window.alert(err.message);
      });
    }
  }, [data]);

  return(
    <Container>
     <AddUserForm form={setdata} formData={data} operation={"new"} designation={['Manager','Supervisor']}/>
    </Container>
  );
}
