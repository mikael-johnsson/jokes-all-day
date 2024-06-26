import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom'

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
    handleMount();
  }, [])

  return (
    <Row>
      <Col>
      {report?.results.map((report) => ( 
        <div key={report.id}>
          <div>This is a report: {report.content}, {report.author}</div>
          <Link to={`/admin/report/edit/${report.id}`}><Button>Edit report</Button></Link>
        </div>
      ))}
      </Col>
    </Row>
  )
}

export default ReportPage