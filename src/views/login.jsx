import React from "react";

function Login(props) {

  return (
    <div className="app-body login-testimonial-container">
      <main className="main d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 mx-auto">
              <div className="card-group">
                <div className="card p-5">
                  <div className="card-body">
                    <form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          formcontrolname="username"
                          placeholder="Username"
                          autoComplete="username"
                          required
                        />
                      </div>
                      <div className="input-group mb-4">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-lock" />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          formcontrolname="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button type="submit" className="btn btn-danger px-4">
                            Login
                          </button>
                        </div>
                        <div className="col-6 text-right">
                          <button type="button" className="btn btn-link px-0">
                            Forgot password?
                          </button>
                        </div>
                        <div className="col-12 text-right">
                          <label>Remeber me</label>
                          <input type="checkbox" className=" px-0" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;