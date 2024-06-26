import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Col, Row } from 'react-bootstrap'

const ReportPage = () => {
  const [report, setReports] = useState({results: []})

  useEffect(() => {
    const handleMount = async () => {
      try{
        const {data} = await axiosReq.get(`/report`)
        setReports(data)
      } catch(err){
        console.log(err)
      }
    }
  })

  return (
    <Row>
      <Col>
      {report?.results.map((report) => (
        <div>This is a report: {report}</div>
      ))}
      </Col>
    </Row>
  )
}

export default ReportPage