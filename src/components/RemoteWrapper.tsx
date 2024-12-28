import React, { useEffect, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';

interface RemoteWrapperProps {
  error?: string;
  loading?: string;
  module: string;
  scope: string;
}

const RemoteWrapper: React.FC<RemoteWrapperProps> = ({
  error = 'Error loading module',
  loading = 'Loading module...',
  module,
  scope
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const rootRef = useRef<Root>();

  useEffect(() => {
    if (!ref.current) return;

    const loadRemote = async () => {
      try {
        setIsLoading(true);

        // Inicializa o share scope
        // @ts-ignore
        await __webpack_init_sharing__('default');

        // @ts-ignore
        const container = window[scope];
        console.log('Container:', container);

        if (!container) {
          throw new Error(`Cannot find container ${scope}`);
        }

        // Inicializa o container
        // @ts-ignore
        await container.init(__webpack_share_scopes__.default);

        const factory = await container.get(module);
        console.log('Factory:', factory);

        if (!factory) {
          throw new Error(`Cannot find module ${module} in container ${scope}`);
        }

        const Module = factory();
        if (ref.current) {
          rootRef.current = createRoot(ref.current);
          rootRef.current.render(<Module />);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading remote:', err);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadRemote();

    // Cleanup
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
      }
    };
  }, [module, scope]);

  if (isLoading) return <div>{loading}</div>;
  if (hasError) return <div>{error}</div>;

  return <div ref={ref} />;
};

export default RemoteWrapper;