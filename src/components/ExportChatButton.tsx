import React from 'react';

interface ExportChatButtonProps {
  onExport: () => void;
}

const ExportChatButton: React.FC<ExportChatButtonProps> = ({ onExport }) => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '16px 0 0 0' }}>
    <button className="chat-export-btn" onClick={onExport}>
      Export Chat
    </button>
  </div>
);

export default ExportChatButton;
