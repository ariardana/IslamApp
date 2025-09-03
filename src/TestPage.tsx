import React from 'react';
import Layout from './components/layout/Layout';
import { useAppStore } from './store/useAppStore';

const TestPage: React.FC = () => {
  const { theme } = useAppStore();
  
  return (
    <div className={theme.isDark ? 'dark' : ''}>
      <Layout />
    </div>
  );
};

export default TestPage;