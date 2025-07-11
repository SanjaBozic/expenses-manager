import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'; 
import './style/override.css';
import MainLayout from './components/main-layout/main-layout.tsx';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainLayout />
  </StrictMode>,
)
