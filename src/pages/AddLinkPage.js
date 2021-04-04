import React, { Fragment, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { withRouter } from "react-router";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";

import Hero from "../components/Hero";
import Preview1 from "../components/PreviewPhone/Preview1";
import SideBar from "../components/SideBar";
import { API } from "../config/api";

function AddLink() {
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
    setForm({
      ...form,
      links: form.links.concat([initialLink]),
    });
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
    const config = {
      headers: {
        "Content-Type": "mutipart/form-data",
      },
    };

    const body = new FormData();

    body.append("title", form.title);
    body.append("description", form.description);
    body.append("image", form.image);

    let newLinks = [];
    for (let index = 0; index < form.links.length; index++) {
      const bodyLink = new FormData();

      bodyLink.append("imageLink", links[index].imageLink);
      const responseImage = await API.post("/imageLink", bodyLink, config);

      const thisLink = {
        ...links[index],
        imageLink: responseImage.data.data.image,
      };
      newLinks.push(thisLink);
    }

    body.append("links", JSON.stringify(newLinks));

    const response = await API.post("/link", body, config);
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
          <Col xs={3}>
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
          <Col className="d-flex align-items-end p-0">
            <Row>
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
        {index > 1 ? (
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
        class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light pt-5"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Row className="d-flex justify-content-between px-4 py-4">
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
              <Col className="bg-white rounded">
                <div className="p-3">
                  <Row>
                    <Col xs={3}>
                      <img
                        src={
                          imagePreviewUrl != ""
                            ? imagePreviewUrl
                            : "/assets/images/preview-image.png"
                        }
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    </Col>
                    <Col className="d-flex align-items-end mb-3">
                      <div class="image-upload">
                        <input
                          id="file-input"
                          type="file"
                          name="image"
                          onChange={(e) => onChange(e)}
                          // style={{
                          //   display: "none",
                          // }}
                        />
                      </div>

                      {/* <Button className="btn btn-primary-yellow text-white btn-sm px-3">
                      Upload
                    </Button> */}
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

                  <Row className="mt-4 d-flex justify-content-end">
                    <Button
                      onClick={() => addLinkForm()}
                      className="btn btn-primary-yellow btn-md text-white font-weight-bold"
                    >
                      Add Link
                    </Button>
                  </Row>
                </div>
              </Col>
              <Col>
                <div
                  className="d-flex justify-content-center position-fixed"
                  style={{ maxWidth: 400 }}
                >
                  {/* <div className="position-relative"> */}
                  <img
                    className="position-absolute"
                    src="/assets/images/framer-phone.png"
                    style={{ width: 400, zIndex: 2, left:0 }}
                  />
                  {/* </div> */}
                  <Preview1
                    linkData={form}
                  />
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
