import React from 'react'
import Modal from 'react-modal'

/**
 * react portals, react-usePortal
 * react-modal, react-tooltip
 */

export default function ({ item, isOpen, toggleModal }) {
  const { company, title, location, type, description } = item || {}
  return (
    <div className="Modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Description"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
        ariaHideApp={false}
      >
        <h4>
          🌟{company} - {title} - {location} - {type}✨
        </h4>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: description }} style={{ overflowY: 'scroll', maxHeight: '90vh' }} />
        <button type="button" onClick={toggleModal} className="button">
          Close
        </button>
      </Modal>
    </div>
  )
}
