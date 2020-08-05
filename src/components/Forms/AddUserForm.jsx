import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddUserForm(props) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: props.formData,
  });
  const onSubmit = (data) => props.form(data);

  return (
    <>
      <div className="card-header"><h2>Add User</h2></div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                defaultValue={""}
                ref={register({ minLength: 5, required: "A name is required" })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.fullName && errors.fullName.message}
              </span>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                defaultValue={""}
                ref={register({
                  required: "email is required",
                  pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.email && errors.email.message}
              </span>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="tel"
                name="contact"
                className="form-control"
                placeholder="Contact"
                defaultValue={""}
                ref={register({
                  required: "A contact is required",
                })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.contact && errors.contact.message}
              </span>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="designation"
                name="designation"
                ref={register({
                  required: true,
                  validate: (value) => value !== "true",
                })}
              >
                <option value="true">--- Select Designation ---</option>
                {props.designation.map((doc,i) => { //this will add designations that select field which will be passed from the parent component
                  return (
                    <option key={i} value={doc}>{doc}</option>
                  );
                })}
              </select>
              <span style={{ color: "red" }}>
                {" "}
                {errors.designation && errors.designation.message}
              </span>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="date"
                name="dob"
                className="form-control"
                placeholder="DOB"
                defaultValue={""}
                ref={register({
                  required: "date of birth is required",
                })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.dob && errors.dob.message}
              </span>
            </div>
            <div className="col">
              <select
                className="form-control"
                id="gender"
                name="gender"
                ref={register({
                  required: true,
                  validate: (value) => value !== "true",
                })}
              >
                <option value="true">--- Select Gender ---</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span style={{ color: "red" }}>
                {" "}
                {errors.gender && errors.gender.message}
              </span>
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col">
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="User Name"
                defaultValue={""}
                ref={register({
                  minLength: 5,
                  required: "username is required",
                })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.userName && errors.userName.message}
              </span>
            </div>
            <div className="col">
              <input
                type="password"
                name="userPassword"
                className="form-control"
                placeholder="User Password"
                ref={register({
                  // minLength: 5,
                  required: "password is required",
                })}
              />
              <span style={{ color: "red" }}>
                {" "}
                {errors.password && errors.password.message}
              </span>
            </div>
          </div>
          {props.userType === "Admin" ? ( //this will be only displayed for admin
            <div className="form-row mb-3">
              <div className="col-6 pl-1 pr-2">
                <select
                  name="role"
                  className="form-control"
                  id="roleId"
                  ref={register({
                    required: true,
                    validate: (value) => value !== "true",
                  })}
                >
                  <option value="true">--- Select Role ---</option>
                  {props.data.map((doc,i) => {
                    return <option key={i} value={doc.name}>{doc.name}</option>;
                  })}
                </select>
                <span style={{ color: "red" }}>
                  {" "}
                  {errors.role && errors.role.message}
                </span>
              </div>
            </div>
          ) : null}

          {props.operation === "new" ? (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          ) : null}

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              props.formToggle({ form: false }); //this will hide the form
            }}
          >
            Cancel
          </button>
          {props.operation === "update" ? (
            <button type="submit" className="btn btn-warning">
              Update
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
}
