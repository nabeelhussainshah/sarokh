import React, { useState, useEffect } from "react";
import Container from "../../components/Containers/ListingContainer";
import Table from "../../components/Generictable/generatictable";
import AddUserForm from "../../components/Forms/AddUserForm";
import { useHistory, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import moment from 'moment';
import axios from "axios";

export default function AllUsers(props) {
  const [response, setresponse] = useState({ loading: true });
  const [formToggle, setformToggle] = useState({form: false});
  const [data, setdata] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(data);

  useEffect(() => {
    async function fetchData() {
      return await axios
        .get(`${process.env.REACT_APP_API}/user/get-shipper-users-list/${user.id}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setresponse({ loading: false, data: response.data });
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
    fetchData();
  }, [formToggle]);

  useEffect(()=>{
    if(data !== undefined)
    {
        if(data.userPassword !== '')
        {
       axios.patch(`${process.env.REACT_APP_API}/user/update`,
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
          userId: formToggle.userId,
          roleId: 2,
          parentTypeId: user.id
      })
      .then((response)=>{
          console.log(response);
        if(response.status === 200)
        {
          toast.success('User updated successfully');
          setformToggle({form: false});
        }
      })
      .catch((err)=>{
        window.alert(err.message);
      });
    }
    }
  },[data]);

  const handleClick = (row) => {
      let data = row.row.original;
      let date = data.dob.split('-');
      date = new Date(date[0],date[1],date[2]);
      console.log(date);
      console.log(moment(data.dob).format(moment.HTML5_FMT.DATE));
      setformToggle({form: true, userId: data.userId});
    setdata({
          fullName: data.fullName,
          designation: data.designation,
          userName: data.userName,
          userPassword: '',
          email: data.email,
          contact: data.contact,
          gender: data.gender,
          dob: moment(date).format(moment.HTML5_FMT.DATE),
    });

  };

  const handleDelete = async (id)=>{

    console.log("this is called");
    await axios.delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
    .then((response)=>{
      console.log(response);
      if(response.data.status === 200)
      {
        toast.success(response.data.data);
        setformToggle({form: false});
      }
      else{
        toast.error('something went wrong');
      }
    })
    .catch((err)=>{
      toast.error(err.message);
    });
  };

  const columns = [
    {
      Header: "Action",
      accessor: "",
      Cell: (row) => {
        return (
          <>
            <i className="fa fa-edit" onClick={() => handleClick(row)}></i>
            &nbsp;
            <i className="fa fa-trash" onClick={() => handleDelete(row.row.original.userId)}></i>
          </>
        );
      },
    },
    {
      Header: "User ID",
      accessor: "userId",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Contact",
      accessor: "contact",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "DOB",
      accessor: "dob",
    },
    {
      Header: "Designation",
      accessor: "designation",
    },
  ];


  if(formToggle.form === false)
  {

  return response.loading ? (
    <div>Loading ...</div>
  ) : (
    <Container>
      <div className="card-header">
        <h2 className="float-left">All Users</h2>
        <Link to="/shipper/users/adduser">
          <button className="btn btn-primary float-right">Add Users</button>
        </Link>
      </div>
      <div className="card-body">
        <Table
          data={response.data}
          columns={columns}
          tableclass={"table-responsive custom-table"}
          pagination={true}
        />
      </div>
    </Container>
  );
}
else{
    return(
        <Container>
        <AddUserForm form={setdata} formData={data} formToggle={setformToggle} operation={"update"} designation={['Manager','Supervisor']}/>
        </Container>
    );
}
}
