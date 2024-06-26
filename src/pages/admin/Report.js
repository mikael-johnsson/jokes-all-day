import React, { useEffect, useState } from 'react'
import { Card, FormControl, Media } from 'react-bootstrap'
import { axiosRes } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const Report = () => {
    const [report, setReport] = useState({})
    const {
        id, 
        author, 
        content,
        reason,
        created_at,
        joke, 
        joke_title,
        handled
        } = report;
    
    const [reportJoke, setReportJoke] = useState({})
    
    const {urlId} = useParams();
    
    useEffect(() => {
        const handleMount = async () => {
            try{
                const {data: report} = await axiosRes.get(`/report/${urlId}`)
                setReport(report)
            } catch(err){
                console.log(err)
            }
        } 
        handleMount()
    }, [urlId])

  return (
    <Card>
        <Card.Body>
            <Media>
                <p>Report written by: {author}</p>
                <p>Created at: {created_at}</p>
            </Media>
        </Card.Body>
        <Card.Body>
            <Media>
                <p>Reason of report: {reason}</p>
                <p>report message:</p> 
                <br/>
                <p>{content}</p>
            </Media>
        </Card.Body>
        <Card.Body>
            <Media>
                <p>title of joke: {joke_title} </p>
                <p>content of joke:</p>
                <p>author of joke</p>
            </Media>
        </Card.Body>
    </Card>
  )
}

export default Report