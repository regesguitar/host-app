import { createRoot } from 'react-dom/client';
import App from './App';

const mount = (el: Element) => {
  if (!el) return;

  const root = createRoot(el);
  root.render(<App />);

  return () => root.unmount();
};

// No ambiente de desenvolvimento, monte imediatamente
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };