import React from 'react';
import { Heart } from 'lucide-react';

const IconTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Icon Test</h2>
      <p>
        Made with 
        <Heart style={{ margin: '0 5px', color: 'red', fill: 'currentColor' }} /> 
        by Ari
      </p>
      <a 
        href="https://github.com/ariardana" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        @ariardana
      </a>
    </div>
  );
};

export default IconTest;