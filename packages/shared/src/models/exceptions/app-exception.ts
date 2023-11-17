export class AppException extends Error {
    code: string;
    message: string;
    source: 'user' | 'server' | 'unknown' = 'unknown';
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'AppException';
    }
}
