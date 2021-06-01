import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const existentUser = this.users.find((user) => user.id === id);

    return existentUser;
  }

  findByEmail(email: string): User | undefined {
    const existentUser = this.users.find((user) => user.email === email);

    return existentUser;
  }

  turnAdmin(receivedUser: User): User {
    const existentUserIndex = this.users.indexOf(receivedUser);

    const updatedUser = {
      id: receivedUser.id,
      name: receivedUser.name,
      admin: true,
      email: receivedUser.email,
      created_at: receivedUser.created_at,
      updated_at: new Date(),
    };

    this.users[existentUserIndex] = updatedUser;

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
