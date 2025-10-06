// pages/index.js

import AnimatedCharacters from '@/components/AnimatedCharacters';

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Left Side - Animated Characters */}
      <div style={styles.left}>
        <AnimatedCharacters />
      </div>

      {/* Right Side - Login Form */}
      <div style={styles.right}>
        <form style={styles.form}>
          <h2 style={styles.title}>Welcome Back 👋</h2>
          <p style={styles.subtitle}>Please enter your credentials to login.</p>

          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="anna@gmail.com"
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
          />

          <div style={styles.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>

          <button type="submit" style={styles.primaryButton}>Log in</button>
          <button style={styles.secondaryButton}>
            <span role="img" aria-label="google">🔒</span> Log in with Google
          </button>

          <p style={styles.signup}>
            Don’t have an account? <a href="#" style={styles.link}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#fafafa',
  },
  left: {
    flex: 1.2,
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '40px'
  },
  right: {
    flex: 1,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-5px 0 20px rgba(0,0,0,0.05)'
  },
  form: {
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: '600'
  },
  subtitle: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#6b7280'
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    marginTop: '10px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    outline: 'none',
    marginBottom: '10px',
    fontSize: '14px'
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '13px'
  },
  link: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '500'
  },
  primaryButton: {
    backgroundColor: '#111827',
    color: '#fff',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    marginBottom: '10px'
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    color: '#111827',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    fontSize: '15px'
  },
  signup: {
    marginTop: '16px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#6b7280'
  }
};
