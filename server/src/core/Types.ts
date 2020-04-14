const TYPES = {
  App: Symbol('App'),
  UserService: Symbol('UserService'),
  ProfileService: Symbol('ProfileService'),

  UserRepository: Symbol('UserRepository'),
  ProfileRepository: Symbol('ProfileRepository'),
  RoleRepository: Symbol('RoleRepository'),

  HomeController: Symbol('HomeController'),
  UserController: Symbol('UserController'),
  ProfileController: Symbol('ProfileController'),
  Logger: Symbol('Logger'),
  DbConnection: Symbol('DbConnection'),
}

export default TYPES
