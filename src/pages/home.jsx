import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidepannel from "../components/side-pannel";

function Home() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidepannel />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/chart-success.png"
                                alt="chart success"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt3"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  View More
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">
                            Profit
                          </span>
                          <h3 className="card-title mb-2">$12,628</h3>
                          <small className="text-success fw-semibold">
                            <i className="bx bx-up-arrow-alt" /> +72.80%
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  View More
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Sales</span>
                          <h3 className="card-title text-nowrap mb-1">
                            $4,679
                          </h3>
                          <small className="text-success fw-semibold">
                            <i className="bx bx-up-arrow-alt" /> +28.42%
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="row">
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/paypal.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt4"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  View More
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="d-block mb-1">Payments</span>
                          <h3 className="card-title text-nowrap mb-2">
                            $2,456
                          </h3>
                          <small className="text-danger fw-semibold">
                            <i className="bx bx-down-arrow-alt" /> -14.82%
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/cc-primary.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="cardOpt1"
                              >
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  View More
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="javascript:void(0);"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">
                            Transactions
                          </span>
                          <h3 className="card-title mb-2">$14,857</h3>
                          <small className="text-success fw-semibold">
                            <i className="bx bx-up-arrow-alt" /> +28.14%
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <div className="content-backdrop fade" />
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </div>
  );
}

export default Home;
