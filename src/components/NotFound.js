import React from 'react'
import SadFace from '../assets/sad_face.png'
import styles from '../styles/NotFound.module.css'
import { Image } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className={`${styles.MarginTop}`}>
        <Image className={styles.SadFace} src={SadFace}/>
        <p>sorry, no jokes on this page. it wasn't found!</p>
    </div>
  )
}

export default NotFound