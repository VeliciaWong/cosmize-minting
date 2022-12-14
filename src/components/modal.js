import {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import styles from "../styles/modal.module.css";

export default function Modal({show, onClose, children}){
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() =>{
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if(isBrowser) {
    return ReactDom.createPortal(
      modalContent, document.getElementById("modal-root")
    )
  } else{
    return null;
  }
}