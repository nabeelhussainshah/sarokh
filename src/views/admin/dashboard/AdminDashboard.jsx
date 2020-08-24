import React from 'react';


export default function AdminDashboard(props) {
    console.log(JSON.parse(localStorage.getItem('user')));
    return (
        <>
            <div className="pr-3 pl-3">
                <div className="row mt-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-white bg-info">
                            <div className="card-body pb-4">
                                <div className="text-value">2133</div>
                                <div>Total Orders</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-white bg-primary">
                            <div className="card-body pb-4">
                                <div className="text-value">23123</div>
                                <div>Order in Progress</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-white bg-warning">
                            <div className="card-body pb-4">
                                <div className="text-value">2313</div>
                                <div>Pending Delivery</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-white bg-danger">
                            <div className="card-body pb-4">
                                <div className="text-value">23123</div>
                                <div>Pending Pickups</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-9">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <h4 className="card-title mb-0">Traffic</h4>
                                        <div className="small text-muted">November 2017</div>
                                    </div>
                                </div>
                                <div className="chart-wrapper">

                                </div>
                            </div>
                        </div >
                    </div >
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="card text-white bg-warning">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 213213</div>
                                        <div>Wallet Pickups</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-primary">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 23123</div>
                                        <div>COD Payable</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-info">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 213213</div>
                                        <div>Prepaid Order Receivable</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-primary">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 123213</div>
                                        <div>Agent's Payables</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-danger">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 213</div>
                                        <div>Agent's Recieveables</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-warning">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 21313</div>
                                        <div>Driver Recieveables</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card text-white bg-primary">
                                    <div className="card-body pb-4">
                                        <div className="text-value">Rial 2133</div>
                                        <div>Driver Payable</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
}