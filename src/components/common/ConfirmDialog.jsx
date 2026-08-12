export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={onCancel}>Ləğv et</button>
          <button type="button" className="danger-button modal-confirm-btn" onClick={onConfirm}>Bəli, sil</button>
        </div>
      </div>
    </div>
  );
};