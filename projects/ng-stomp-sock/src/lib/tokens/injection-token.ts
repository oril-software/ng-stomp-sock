import { InjectionToken } from '@angular/core';

export const config: InjectionToken<string> = new InjectionToken('websocket');

// Polyfills
(window as any).global = window;
