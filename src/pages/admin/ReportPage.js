import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";
import Report from "./Report";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { Alert } from "react-bootstrap";
import AlertStyles from "../../styles/Alert.module.css";

const ReportPage = () => {
  const [report, setReports] = useState({ results: [] });
  const history = useHistory();
  const [alertMessage, setAlertMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axiosReq.get(`/report`);
        setReports(data);
      } catch (err) {
        console.log(err);
        if (err?.response.status === 404) {
          history.push("/pagenotfound");
        }
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (location?.state && location?.state?.message) {
      setAlertMessage(location?.state?.message);
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      {alertMessage && (
        <Alert className={AlertStyles.alert}>{alertMessage}</Alert>
      )}
      <Row className="justify-content-center">
        <Col>
          {report.results.length ? (
            report?.results?.map((report) => (
              <React.Fragment key={report.id}>
                <Report {...report} setReports={setReports} />
                <br />
              </React.Fragment>
            ))
          ) : (
            <h3>You haven't made any reports yet.</h3>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ReportPage;
