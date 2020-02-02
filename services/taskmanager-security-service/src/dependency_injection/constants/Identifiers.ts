const SERVICE_IDENTIFIER = {
    DBConnection: Symbol.for('DBConnection'),
    MongoDbProvider: Symbol.for('MongoDbProvider'),
    UserController: Symbol.for('UserController'),
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService')
}

export default SERVICE_IDENTIFIER;