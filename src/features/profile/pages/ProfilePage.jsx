import { useState } from 'react';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    if (!user?.id) return;
    try {
      await navigator.clipboard.writeText(user.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
    : user?.email?.[0]?.toUpperCase();

  return (
    <section className="page-section">
      <div className="page-header">
        <h2>Profil</h2>
        <p className="page-description">İstifadəçi məlumatlarınız burada saxlanır.</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div>
            <h3 className="profile-name">{user?.name || 'İstifadəçi'}</h3>
            <span className="profile-badge">Aktiv hesab</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-row">
            <span className="profile-detail-label">Ad</span>
            <span className="profile-detail-value">{user?.name || '—'}</span>
          </div>
          <div className="profile-detail-row">
            <span className="profile-detail-label">Email</span>
            <span className="profile-detail-value">{user?.email}</span>
          </div>
          <div className="profile-detail-row">
            <span className="profile-detail-label">İstifadəçi ID</span>
            <span className="profile-detail-value profile-id">
              {user?.id}
              <button type="button" className="profile-copy-btn" onClick={handleCopyId}>
                {copied ? 'Kopyalandı ✓' : 'Kopyala'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};