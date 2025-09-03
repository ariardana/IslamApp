import React from 'react';
import { Heart } from 'lucide-react';

const SimpleFooter: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: '#f3f4f6', 
      padding: '1rem', 
      textAlign: 'center',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <p style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '0.875rem',
          margin: 0
        }}>
          Made with 
          <Heart style={{ margin: '0 0.25rem', height: '1rem', width: '1rem', color: '#ef4444' }} /> 
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
    </footer>
  );
};

export default SimpleFooter;