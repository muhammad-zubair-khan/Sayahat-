import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const ReusableModel = (props) => {
  return (
    <div>
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          {props.modalTitle && <Modal.Title>{props.modalTitle}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {props.buttons ? (
            props.buttons.map((btn, index) => (
              <Button key={index} variant={btn.color} onClick={btn.onClick}>
                {btn.label}
              </Button>
            ))
          ) : (
            <Button
              variant="success"
              onClick={props.onSubmit}
              style={{
                backgroundColor: "#999999",
                marginTop: "11px",
                float: "right",
                fontWeight: "bold",
              }}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReusableModel;
