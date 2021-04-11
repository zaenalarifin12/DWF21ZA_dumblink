import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { withRouter } from "react-router";
import SideBar from "../components/SideBar";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import SweetAlert from "react-bootstrap-sweetalert";

function MyLinkPage() {
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [idLink, setIdLink] = useState(0);

  const [search, setSearch] = useState("");

  const [successDelete, setSuccessDelete] = useState(false);

  const {
    data: linksData,
    loading: linksLoading,
    error: linksError,
    refetch: linksRefetch,
  } = useQuery(["myLinkCache", search], async () => {
    let response;
    if (search == "") {
      response = await API.get(`/links`);
    } else {
      response = await API.get(`/links?search=${search}`);
    }

    return response;
  });

  const onChange = (e) => {
    const value = e.target.value;

    setSearch(value);
  };

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

  const handleSearch = (e) => {
    linksRefetch(search);
  };

  const handleActive = async (e, id) => {
    try {
      await API.put(`/link/${id}/active`).then(() => {
        linksRefetch();
      });
    } catch (error) {}
  };

  const handleNonaktif = async (e, id) => {
    try {
      await API.put(`/link/${id}/nonaktif`).then(() => {
        linksRefetch();
      });
    } catch (error) {}
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "100vh" }}>
      <HeaderHome title="My Link" />

      <div class="container-fluid">
        <div class="row">
          <SideBar />

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-4">
            <Row className="d-flex justify-content-between align-items-center px-4 py-2">
              <Col sm={12} md={12} lg={2}>
                <h1 className="h4">
                  All Links{" "}
                  <span class="badge badge-primary-yellow text-white rounded-circle">
                    {linksData?.data?.data?.links.length}
                  </span>
                </h1>
              </Col>
              <Col sm={2} md={2} lg={8}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend
                    style={{
                      borderBottom: "1px solid #7E7A7A",
                    }}
                  >
                    <img src="/assets/icons/search.svg" />
                  </InputGroup.Prepend>
                  <FormControl
                    style={{
                      background: "transparent",
                      borderTop: "none",
                      borderRight: "none",
                      borderLeft: "none",
                      borderBottom: "1px solid #7E7A7A",
                      borderRadius: 0,
                    }}
                    placeholder="Find Your Link"
                    name="search"
                    onChange={(e) => onChange(e)}
                  />
                </InputGroup>
              </Col>
              <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
                <Button
                  onClick={(e) => handleSearch(e)}
                  className="btn btn-primary-yellow text-white font-weight-bold px-4 btn-md"
                >
                  Search
                </Button>
              </Col>
            </Row>

            <div className="px-4 mt-4">
              {console.log(linksData?.data?.data?.links)}
              {linksData?.data?.data?.links.length > 0 ? (
                <>
                  {linksData?.data?.data?.links.map((link) => {
                    return (
                      <div className="bg-white px-2 py-2">
                        <Row className={`my-2 rounded  `}>
                          <Col
                            sm={12}
                            md={12}
                            lg={2}
                            className="my-auto mx-auto"
                          >
                            <img
                              src={link.image}
                              style={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                              }}
                            />
                          </Col>
                          <Col
                            sm={12}
                            md={12}
                            lg={4}
                            className="my-auto d-flex flex-column "
                          >
                            <Row>
                              <p className="font-weight-bold h4 pl-3">
                                {link.title}
                              </p>
                            </Row>
                            <Row className="font-weight-normal pl-3">
                              <p className="text-secondary">
                                {`http://localhost:3000/${link.uniqueLink}`}
                              </p>
                            </Row>
                          </Col>
                          <Col sm={12} md={12} lg={2} className="my-auto">
                            <Row className="d-flex justify-content-center">
                              <p className="font-weight-bold h4">
                                {link.viewCount}
                              </p>
                            </Row>
                            <Row className="d-flex justify-content-center">
                              <p className="text-secondary">Visit</p>
                            </Row>
                          </Col>

                          <Col
                            sm={12}
                            md={12}
                            lg={4}
                            className="my-auto d-flex justify-content-center"
                          >
                            <Link
                              className="mr-4"
                              to={`/link/${link.uniqueLink}`}
                            >
                              <img src="/assets/icons/view.svg" />
                            </Link>
                            <Link to={`/edit-link/${link.id}`} className="mr-4">
                              <img src="/assets/icons/edit.svg" />
                            </Link>
                            <Button
                              className="bg-white border border-white p-0"
                              onClick={() =>
                                handleConfirmDelete(link.uniqueLink)
                              }
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
                        <Row>
                          <Col>
                            {link.active == 1 ? (
                              <>
                                <Button
                                  onClick={(e) => handleNonaktif(e, link.id)}
                                >
                                  Nonaktif
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={(e) => handleActive(e, link.id)}
                                >
                                  Aktif
                                </Button>
                              </>
                            )}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center">
                    <img src="assets/icons/no-data.svg" width="80%" />
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MyLinkPage;
