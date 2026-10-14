import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, text, setText }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <textarea
          className="modal-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onConfirm}>
            Подтвердить
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;