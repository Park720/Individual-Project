import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModeProvider } from './context/ModeContext';
import { PostsProvider } from './context/PostsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </ModeProvider>
  </StrictMode>,
)