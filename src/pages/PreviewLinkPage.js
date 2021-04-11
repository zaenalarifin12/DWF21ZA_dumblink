import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Preview1 from "./Template/Preview1";
import Preview2 from "./Template/Preview2";
import Preview3 from "./Template/Preview3";
import Preview4 from "./Template/Preview4";

function PreviewLink() {
  const params = useParams();
  const { id } = params;

  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLink = async () => {
    try {
      const response = await API.get(`/link/show/${id}`)
        .then((success) => {
          setLink(success.data.data.link);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.status == 404);
          setLoading(false);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getLink();
  }, []);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {link == null ? (
            <>
              <p className="text-center">Link tidak ditemukan</p>
            </>
          ) : (
            <>
              {link.template == 1 ? (
                <Preview1 linkData={link} />
              ) : link.template == 2 ? (
                <Preview2 linkData={link} />
              ) : link.template == 3 ? (
                <Preview3 linkData={link} />
              ) : (
                <Preview4 linkData={link} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default PreviewLink;
