import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Col, Row } from 'react-bootstrap'
import Report from './Report'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const ReportPage = () => {
  const [report, setReports] = useState({results: []})
  const history = useHistory();

  useEffect(() => {
    const fetchReports = async () => {
      try{
        const {data} = await axiosReq.get(`/report`)
        setReports(data)
      } catch(err){
        console.log(err)
        if (err?.response.status === 404){
          history.push('/pagenotfound')
        }
      }
    }
    fetchReports();
  }, [setReports])

  return (
    <Row>
      <Col>
        {report.results.length ? 
        (report?.results?.map((report, idx) => (
          <React.Fragment key={report.id}>
            <Report {...report} setReport={setReports}/>
            <br />
          </React.Fragment>
        ))) : (<h3>You haven't made any reports yet.</h3>)
      }
      </Col>
    </Row>
  )
}

export default ReportPage