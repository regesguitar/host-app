import React, { Suspense } from 'react';
import RemoteWrapper from './components/RemoteWrapper';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Host Application</h1>

      <Suspense fallback={<div>Carregando...</div>}>
        <RemoteWrapper
          module="./Dashboard"
          scope="dashboard"
          loading="Carregando Dashboard..."
          error="Erro ao carregar o Dashboard"
        />
      </Suspense>
    </div>
  );
};

export default App;