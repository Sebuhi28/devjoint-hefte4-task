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
        <div className="error-card">
          <h3>Xəta Baş Verdi!</h3>
          <p>Bu komponent yüklənərkən gözlənilməz xəta yarandı.</p>
          <button
            className="danger-button"
            onClick={() => this.setState({ hasError: false })}
          >
            Yenidən Cəhd Et
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}