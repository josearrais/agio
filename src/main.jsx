import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import { ChainProvider } from './contexts/ChainContext.jsx';
import { config } from './config/wagmiConfig.js';
import './styles/main.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ChainProvider>
          <App />
        </ChainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
