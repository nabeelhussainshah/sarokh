import React from "react";
import Container from "../../components/Containers/ListingContainer";

export default function AddUserForm(props) {
  return (
    <Container>
        <div className="card-header">Add User</div>
        <div className="card-body">
          <form>
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  required
                />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="DOB"
                  required
                />
              </div>
              <div className="col">
                <select className="form-control" id="gender">
                  <option value>--- Select Gender ---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User Password"
                  required
                />
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col-6 pl-1 pr-2">
                <select className="form-control" id="roleId" required>
                  <option value>--- Select Role ---</option>
                  <option></option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <button type="button" className="btn btn-danger">
              Cancel
            </button>
            <button type="button" className="btn btn-warning">
              Update
            </button>
          </form>
        </div>
    </Container>
  );
}
