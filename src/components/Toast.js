import React from 'react'
import Toast from 'react-bootstrap/Toast';
import styles from '../styles/Toast.module.css'

const ToastMessage = () => {
  return (
    <Toast className={styles.Toast} delay={3000} autohide>
        <Toast.Header closeButton={true}>
            <strong className="mr-auto">Data update</strong>
        </Toast.Header>
        <Toast.Body>THIS IS A TEST</Toast.Body>
    </Toast>
  )
}

export default ToastMessage