import { ComponentType } from 'react';

export const loadRemote = (scope: string, module: string) => {
  return async () => {
    // Inicializa o share scope
    // @ts-ignore
    await __webpack_init_sharing__('default');

    // @ts-ignore
    const container = window[scope];
    console.log('Container:', container);

    if (!container) {
      throw new Error(`Container ${scope} não encontrado`);
    }

    // Inicializa o container
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    // Carrega o módulo
    const factory = await container.get(module);
    const Module = factory();

    // Retorna um objeto com default export
    return { default: Module as ComponentType<any> };
  };
};