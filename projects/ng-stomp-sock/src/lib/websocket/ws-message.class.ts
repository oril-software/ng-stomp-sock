import { WsCommand } from '../models/enums/wsCommand';

export class WsMessage<T> {
    constructor(
        public event: WsCommand,
        public data: T
        ) {
    }
}
