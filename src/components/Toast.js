import React from 'react'
import Toast from 'react-bootstrap/Toast';
import styles from '../styles/Toast.module.css'


export default function ToastMessage() {

  return (
    <Toast className={styles.Toast}>
        <Toast.Header>
            <strong className="mr-auto">Data update</strong>
        </Toast.Header>
        <Toast.Body>THIS IS A TEST</Toast.Body>
    </Toast>
  )
}
