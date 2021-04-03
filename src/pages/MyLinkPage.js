import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Col, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import SideBar from "../components/SideBar";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import SweetAlert from "react-bootstrap-sweetalert";

function MyLinkPage() {
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [idLink, setIdLink] = useState(0);

  const [successDelete, setSuccessDelete] = useState(false);

  const {
    data: linksData,
    loading: linksLoading,
    error: linksError,
    refetch: linksRefetch,
  } = useQuery("myLinkCache", async () => {
    const response = await API.get(`/links`);

    return response;
  });

  const deleteLink = useMutation(async (id) => {
    const response = await API.delete(`/link/${id}`);
    linksRefetch();
  });

  const handleDeleteLink = () => {
    deleteLink.mutate(idLink);

    setModalConfirmDelete(false);
    setSuccessDelete(true);
  };

  const handleConfirmDelete = (id) => {
    setIdLink(id);
    setModalConfirmDelete(true);
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <HeaderHome />

      <div class="container-fluid">
        <div class="row">
          <SideBar />

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-4">
            <Row className="d-flex justify-content-between px-4 py-2">
              <Col xs={2}>
                <h1 className="h4">
                  All Links{" "}
                  <span class="badge badge-primary-yellow text-white rounded-circle">
                    {linksData?.data?.data?.links.length}
                  </span>
                </h1>
              </Col>
              <Col xs={8}>
                <input className="col-12" />
              </Col>
              <Col xs={2}>
                <Button className="btn btn-primary-yellow text-white font-weight-bold px-4 btn-sm">
                  Search
                </Button>
              </Col>
            </Row>

            <div className="px-4 mt-4">
              {linksData?.data?.data?.links.map((link) => {
                return (
                  <Row>
                    <Col xs={2} className="my-auto">
                      <img src={link.image} width="80%" />
                    </Col>
                    <Col className="my-auto">
                      <Row>
                        <p className="font-weight-bold h4">{link.title}</p>
                      </Row>
                      <Row className="font-weight-normal">
                        <p className="text-secondary">
                          {`http://localhost:3000/${link.uniqueLink}`}
                        </p>
                      </Row>
                    </Col>
                    <Col className="my-auto">
                      <Row className="d-flex justify-content-center">
                        <p className="font-weight-bold h4">{link.viewCount}</p>
                      </Row>
                      <Row className="d-flex justify-content-center">
                        <p className="text-secondary">Visit</p>
                      </Row>
                    </Col>
                    <Col className="my-auto d-flex justify-content-center">
                      <Link className="mr-4" to={`/link/${link.uniqueLink}`}>
                        <img src="/assets/icons/view.svg" />
                      </Link>
                      <Link className="mr-4">
                        <img src="/assets/icons/edit.svg" />
                      </Link>
                      <Button
                        onClick={() => handleConfirmDelete(link.uniqueLink)}
                      >
                        <img src="/assets/icons/trash.svg" />
                      </Button>

                      {modalConfirmDelete ? (
                        <>
                          <SweetAlert
                            custom
                            showCancel
                            // showCloseButton
                            confirmBtnText="Yes"
                            cancelBtnText="No"
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="light"
                            customIcon="https://img.icons8.com/bubbles/500/000000/trash.png"
                            title="Are You Sure Want To Delete"
                            onConfirm={() => handleDeleteLink()}
                            onCancel={() => setModalConfirmDelete(false)}
                          ></SweetAlert>
                        </>
                      ) : (
                        <></>
                      )}

                      {successDelete ? (
                        <>
                          <SweetAlert
                            success
                            title="Link Deleted"
                            onConfirm={() => {
                              setSuccessDelete(false);
                            }}
                            timeout={5000}
                          ></SweetAlert>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MyLinkPage;
