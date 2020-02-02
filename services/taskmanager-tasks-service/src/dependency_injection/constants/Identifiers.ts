const SERVICE_IDENTIFIER = {
    DBConnection: Symbol.for('DBConnection'),
    MongoDbProvider: Symbol.for('MongoDbProvider'),
    TaskController: Symbol.for('TaskController'),
    TaskRepository: Symbol.for('TaskRepository'),
    TaskService: Symbol.for('TaskService')
}

export default SERVICE_IDENTIFIER;