import React, { Fragment, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useMutation } from "react-query";
import { useHistory, useParams, withRouter } from "react-router";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";

import Hero from "../components/Hero";
import Preview1 from "../components/PreviewPhone/Preview1";
import Preview2 from "../components/PreviewPhone/Preview2";
import Preview3 from "../components/PreviewPhone/Preview3";
import Preview4 from "../components/PreviewPhone/Preview4";
import SideBar from "../components/SideBar";
import { API } from "../config/api";

function AddLink() {
  const params = useParams();

  const { id } = params;

  const history = useHistory();

  const [initialLink, setInitialLink] = useState({
    titleLink: "",
    imageLink: null,
    urlLink: "",
    imagePreviewUrl: "",
  });

  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    imagePreviewUrl: "",
    links: [initialLink, initialLink],
  });

  const { image, imagePreviewUrl, title, description, links } = form;

  const [modalError, setModalError] = useState(false);
  const [textError, settextError] = useState("");

  const [modalSuccess, setModalSuccess] = useState(false);

  const listLink = [];

  const onChange = (e) => {
    let tempForm = { ...form };

    if (e.target.type === "file") {
      tempForm[e.target.name] = e.target.files[0];

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setForm({
          ...tempForm,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      tempForm[e.target.name] = e.target.value;
    }

    setForm(tempForm);
  };

  const addLinkForm = () => {
    if (form.links.length < 5) {
      setForm({
        ...form,
        links: form.links.concat([initialLink]),
      });
    }
  };

  const removeLinkForm = (index) => {
    setForm({
      ...form,
      links: form.links.filter((l, sIndex) => index !== sIndex),
    });
  };

  const onChangeLink = (e, index) => {
    const newLinks = links.map((link, sIndex) => {
      if (index !== sIndex) {
        return form.links[sIndex];
      } else {
        let tempLink = { ...form.links[index] };

        if (e.target.type === "file") {
          tempLink[e.target.name] = e.target.files[0];

          let reader = new FileReader();
          let file = e.target.files[0];

          reader.onloadend = () => {
            tempLink["imagePreviewUrl"] = reader.result;
            setForm({
              ...form,
              links: links.map((object, i) => {
                if (index !== i) {
                  return form.links[i];
                } else {
                  return { ...tempLink, imagePreviewUrl: reader.result };
                }
              }),
            });
          };
          reader.readAsDataURL(file);
        } else {
          tempLink[e.target.name] = e.target.value;
        }

        return tempLink;
      }
    });

    setForm({
      ...form,
      links: newLinks,
    });
  };

  const addLink = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      };

      // upload image one by one
      let newLinks = [];

      for (let index = 0; index < form.links.length; index++) {
        const bodyLink = new FormData();

        bodyLink.append("imageLink", links[index].imageLink);

        const result = await API.post("/imageLink", bodyLink, config);
        const thisLink = {
          ...links[index],
          imageLink: result.data.data.image,
        };
        newLinks.push(thisLink);
      }

      const body = new FormData();

      body.append("title", form.title);

      body.append("template", id);

      body.append("description", form.description);
      body.append("image", form.image);
      body.append("links", JSON.stringify(newLinks));

      const response = await API.post("/link", body, config)
        .catch((err) => {
          if (err.response.status == 400) {
            settextError(err.response.data.error.message);
            setModalError(true);
          }
        })
        .then((res) => {
          setModalSuccess(true);

          setForm(form);
        });
    } catch (error) {
      console.log(error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink.mutate();
  };

  ///////////////////////////////////////////
  form.links.map((link, index) => {
    listLink.push(
      <>
        <Row className="mt-4 d-flex align-items-center bg-primary-gray p-2">
          <Col sm={6} md={6} lg={4}>
            <div class="image-upload">
              <label for={`file-input-${index}`}>
                <img
                  src={
                    link.imagePreviewUrl != ""
                      ? link.imagePreviewUrl
                      : "/assets/images/preview-image.png"
                  }
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </label>

              <input
                id={`file-input-${index}`}
                type="file"
                name="imageLink"
                onChange={(e) => onChangeLink(e, index)}
                style={{
                  display: "none",
                }}
              />
            </div>
          </Col>
          <Col sm={6} md={6} lg={8} className="d-flex align-items-end px-sm-2  p-lg-0">
            <Row className="py-sm-4">
              <div class="form-group col-12">
                <label>Title Link</label>
                <input
                  type="text"
                  name="titleLink"
                  onChange={(e) => onChangeLink(e, index)}
                  class="form-control form-custom bg-primary-gray"
                />
                {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
              </div>
              <div class="form-group col-12">
                <label>Url Link</label>
                <input
                  type="text"
                  name="urlLink"
                  onChange={(e) => onChangeLink(e, index)}
                  class="form-control form-custom bg-primary-gray"
                />
                {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
              </div>
            </Row>
          </Col>
        </Row>
        {form.links.length - 1 == index && form.links.length != 2 ? (
          <Row className="mt-2 d-flex justify-content-end">
            <Button
              onClick={() => removeLinkForm(index)}
              className="btn btn-primary-danger btn-sm text-white font-weight-bold"
            >
              Remove
            </Button>
          </Row>
        ) : (
          <></>
        )}
      </>
    );
  });
  ///////////////////////////////////////////

  return (
    <Body title="Template">
      <main
        role="main"
        class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light pt-3"
      >
        {modalError ? (
          <>
            <SweetAlert
              danger
              title={textError}
              onConfirm={() => setModalError(false)}
              timeout={100000}
              style={{ position: "absolute", zIndex: 101 }}
            ></SweetAlert>
          </>
        ) : (
          <></>
        )}

        {modalSuccess ? (
          <>
            <SweetAlert
              success
              title="add link successfully"
              onConfirm={() => {
                history.push("/my-link");
              }}
              timeout={100000}
              style={{ position: "absolute", zIndex: 101 }}
            ></SweetAlert>
          </>
        ) : (
          <></>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <Row className="d-flex justify-content-between px-4 py-2">
            <h1 className="h4">Create Link</h1>

            <Button
              type="submit"
              className="btn btn-primary-yellow btn-md text-white font-weight-bold"
            >
              Publish Link
            </Button>
          </Row>

          <div className="m-4">
            <Row>
              <Col sm={12} md={12} lg={6} className="bg-white rounded">
                <div className="p-3">
                  <Row>
                    <Col sm={3} md={3} lg={3} className="mb-3">
                      <img
                        src={
                          imagePreviewUrl != ""
                            ? imagePreviewUrl
                            : "/assets/images/preview-image.png"
                        }
                        style={{ maxWidth: 100, maxHeight: 100, objectFit: "cover" }}
                      />
                    </Col>
                    <Col sm={3} md={6} lg={3} className="d-flex align-items-end mb-3">
                      <label
                        class="btn btn-sm btn-primary-yellow text-white"
                        for="customFile"
                      >
                        <span>Upload</span>
                      </label>
                      <div class="image-upload">
                        <input
                          id=""
                          type="file"
                          className="custom-file-input"
                          name="image"
                          id="customFile"
                          onChange={(e) => onChange(e)}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <div class="form-group mt-4 col-12">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        onChange={(e) => onChange(e)}
                        class="form-control form-custom"
                      />
                      {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                    </div>
                  </Row>
                  <Row>
                    <div class="form-group mt-2 col-12">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description"
                        onChange={(e) => onChange(e)}
                        class="form-control form-custom"
                      />
                      {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                    </div>
                  </Row>

                  {listLink}

                  {form.links.length < 5 ? (
                    <Row className="mt-4 d-flex justify-content-end">
                      <Button
                        onClick={() => addLinkForm()}
                        className="btn btn-primary-yellow btn-md text-white font-weight-bold"
                      >
                        Add Link
                      </Button>
                    </Row>
                  ) : (
                    <></>
                  )}
                </div>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <div
                  className="d-flex justify-content-center position-fixed"
                  style={{ maxWidth: 400 }}
                >
                  {/* <div className="position-relative"> */}
                  <img
                    className="position-absolute"
                    src="/assets/images/framer-phone.png"
                    style={{ width: 400, zIndex: 2, left: 0 }}
                  />
                  {/* </div> */}
                  {id == 1 ? (
                    <Preview1 linkData={form} />
                  ) : id == 2 ? (
                    <Preview2 linkData={form} />
                  ) : id == 3 ? (
                    <Preview3 linkData={form} />
                  ) : (
                    <Preview4 linkData={form} />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </main>
    </Body>
  );
}

export default AddLink;
