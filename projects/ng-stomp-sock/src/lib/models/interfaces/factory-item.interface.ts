import { IStompSockWebsocket } from './websocket.interface';


export class FactoryItem<T> {
    constructor(
        public name: string,
        public value: IStompSockWebsocket
    ) { }
}
