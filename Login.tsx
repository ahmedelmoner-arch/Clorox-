import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Clorox_logo_2019.png" alt="Clorox" style={styles.logo} />
      <input 
        type="password" 
        placeholder="ادخل الكود السري" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        style={styles.input} 
      />
      <button style={styles.button} onClick={() => navigate('/archive')}>دخول</button>
    </div>
  );
};

const styles = { 
  container: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#E6F0F9' }, 
  logo: { width: '200px', marginBottom: '30px' }, 
  input: { width: '80%', padding: '15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', textAlign: 'center' as const }, 
  button: { width: '80%', padding: '15px', backgroundColor: '#1C74B4', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' } 
};

// السطر ده هو اللي كان عامل الشاشة البيضا!
export default Login;