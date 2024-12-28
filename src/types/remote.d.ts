declare module 'dashboard/Dashboard';

interface Window {
  dashboard: {
    get: (module: string) => Promise<any>;
    init: (options: any) => void;
  };
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}