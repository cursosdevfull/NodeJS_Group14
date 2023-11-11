import { RoleEntity } from "../../../role/infrastructure/entities/role.entity";
import { Role } from "../../domain/entities/Role";
import { GENDER, User, UserProperties } from "../../domain/roots/User";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(user: User): UserEntity {
    const userEntity: UserEntity = new UserEntity();
    userEntity.id = user.properties().id;
    userEntity.email = user.properties().email;
    userEntity.password = user.properties().password;
    userEntity.name = user.properties().name;
    userEntity.lastname = user.properties().lastname;
    userEntity.age = user.properties().age;
    userEntity.address = user.properties().address;
    userEntity.gender = user.properties().gender;
    userEntity.createdAt = user.properties().createdAt;
    userEntity.updatedAt = user.properties().updatedAt!;
    userEntity.deletedAt = user.properties().deletedAt!;
    userEntity.image = user.properties().image;
    userEntity.refreshToken = user.properties().refreshToken;
    userEntity.roles = user.properties().roles.map((role: Role) => {
      const roleEntity = new RoleEntity();
      roleEntity.id = role.id;
      roleEntity.name = role.name;

      return roleEntity;
    });

    return userEntity;
  }

  static fromDataToDomain(userEntity: UserEntity): User {
    const properties: UserProperties = {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      name: userEntity.name,
      lastname: userEntity.lastname,
      age: userEntity.age,
      address: userEntity.address,
      gender: userEntity.gender as GENDER,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      deletedAt: userEntity.deletedAt,
      roles: userEntity.roles.map((role) => new Role(role.id, role.name)),
      image: userEntity.image,
      refreshToken: userEntity.refreshToken,
    };
    return new User(properties);
  }
}
