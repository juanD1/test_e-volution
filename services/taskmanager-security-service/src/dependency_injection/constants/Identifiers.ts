const SERVICE_IDENTIFIER = {
    DBConnection: Symbol.for('DBConnection'),
    HelloWorldController: Symbol.for('HelloWorldController'),
    ContactUsController: Symbol.for('ContactUsController'),
    ForgotPasswordController: Symbol.for('ForgotPasswordController'),
    MongoDbProvider: Symbol.for('MongoDbProvider'),
    ProviderRepository: Symbol.for('ProviderRepository'),
    ParentRepository: Symbol.for('ParentRepository'),
    LinksRecoverPasswordRepository: Symbol.for('LinksRecoverPasswordRepository'),
    ForgotPasswordService: Symbol.for('ForgotPasswordService'),
    ContactUsService: Symbol.for('ContactUsService'),
    EmailProcessor: Symbol.for('EmailProcessor'),
    CloudFileManager: Symbol.for('CloudFileManager')
}

export default SERVICE_IDENTIFIER;