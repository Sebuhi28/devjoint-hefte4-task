import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary xətanı tutdu:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px auto',
          maxWidth: '500px',
          border: '1px solid #ff4d4f',
          backgroundColor: '#fff2f0',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#cf1322' }}>Xəta Baş Verdi!</h3>
          <p style={{ color: '#434343' }}>Bu komponent yüklənərkən gözlənilməz xəta yarandı.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Yenidən Cəhd Et
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}