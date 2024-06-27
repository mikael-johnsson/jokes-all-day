import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Col, Row } from 'react-bootstrap'
import Report from './Report'
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const ReportPage = () => {
  const [report, setReports] = useState({results: []})

  useEffect(() => {
    const fetchReports = async () => {
      try{
        const {data} = await axiosReq.get(`/report`)
        setReports(data)
      } catch(err){
        console.log(err)
      }
    }
    fetchReports();
  }, [])

  return (
    <Row>
      <Col>
      {report.results.length ? 
      (report?.results?.map(report => ( 
        <Report key={report.id} {...report} setReport={setReports}/>
      ))) : <h3>You haven't made any reports yet.</h3>
      }
      </Col>
    </Row>
  )
}

export default ReportPage