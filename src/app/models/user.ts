// export class IUser {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
// }
// implements IUser
export class User {
  id?: number;
  name;
  email;
  password;

  init(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    return this;
  }
}
