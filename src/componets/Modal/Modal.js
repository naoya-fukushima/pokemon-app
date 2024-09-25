import React from "react";
import "./Modal.css";
export default function Modal(props) {
  const closeDetail = () => {
    props.closeModal();
  };
  return (
    <>
      {props.isShowModal ? (
        <div className="overlay" onClick={closeDetail}>
          <div id="content">
            <p>これがモーダルウィンドウです。</p>
            <button onClick={closeDetail}>閉じる</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
