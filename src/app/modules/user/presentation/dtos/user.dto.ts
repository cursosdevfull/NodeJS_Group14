import { User } from "../../domain/roots/User";

export class UserResponse {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: {
    id: string;
    name: string;
  }[];
}

export class UserDto {
  static fromDomainToResponse(user: User): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = user.properties().id;
    userResponse.email = user.properties().email;
    userResponse.name = user.properties().name;
    userResponse.lastname = user.properties().lastname;
    userResponse.roles = user.properties().roles.map((role) => ({
      id: role.id,
      name: role.name,
    }));

    return userResponse;
  }
}
