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
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px' }}>
          <h2>Nəsə xəta baş verdi!</h2>
          <p>Komponent yüklənərkən xəta yarandı.</p>
          <button onClick={() => window.location.reload()}>Səhifəni Yenilə</button>
        </div>
      );
    }

    return this.props.children;
  }
}