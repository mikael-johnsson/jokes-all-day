import React from 'react'
import NoResults from '../assets/no-results.png'
import styles from '../styles/NotFound.module.css'
import { Image } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className={`${styles.MarginTop}`}>
        <Image src={NoResults}/>
        <p>sorry, no jokes on this page. it wasn't found!</p>
    </div>
  )
}

export default NotFound