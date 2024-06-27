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
    console.log("about to run fetchReports")
    fetchReports();
  }, [])

  return (
    <Row>
      {console.log(report.results)}
      <Col>
      {report?.results?.map(report => ( 
        <Report key={report.id} {...report} setReport={setReports}/>
      ))}
      </Col>
    </Row>
  )
}

export default ReportPage