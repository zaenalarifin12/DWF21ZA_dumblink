import React from "react";
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

  console.log(id);
  const {
    data: linkData,
    loading: linkLoading,
    error: linkError,
    refetch: linkRefetch,
  } = useQuery("userPartnerCache", async () => {
    const response = await API.get(`/link/show/${id}`);

    
    return response;
  });

  return (
    <>
    
      {linkData?.data?.data?.link?.template == 1 ? (
        <Preview1 linkData={linkData?.data?.data?.link} />
      ) : linkData?.data?.data?.link?.template == 2 ? (
        <Preview2 linkData={linkData?.data?.data?.link} />
      ) : linkData?.data?.data?.link?.template == 3 ? (
        <Preview3 linkData={linkData?.data?.data?.link} />
      ) : (
        <Preview4 linkData={linkData?.data?.data?.link} />
      )}
    </>
  );
}

export default PreviewLink;
