class EmptyLogger implements LoggerInterface {
    log(message: string, priority: number): void {}
}

export {EmptyLogger}