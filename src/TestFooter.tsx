import React from 'react';
import { Heart } from 'lucide-react';

const TestFooter: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', textAlign: 'center' }}>
      <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
        Made with 
        <Heart style={{ margin: '0 0.25rem', height: '1rem', width: '1rem', color: '#ef4444', fill: 'currentColor' }} /> 
        by Ari - 
        <a 
          href="https://github.com/ariardana" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ marginLeft: '0.25rem', color: '#059669', textDecoration: 'underline' }}
        >
          @ariardana
        </a>
      </p>
    </div>
  );
};

export default TestFooter;