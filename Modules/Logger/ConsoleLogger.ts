class ConsoleLogger implements LoggerInterface {
    log(message: string, priority: number): void {
        switch(priority) {
            case LoggerPriority.ERROR:
                console.error(message);
                break;
            case LoggerPriority.LOG:
                console.log(message);
                break;
            default:
                console.info(message);
        }
    }
}

export {ConsoleLogger}