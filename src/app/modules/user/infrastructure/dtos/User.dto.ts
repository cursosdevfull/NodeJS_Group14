import { User } from "../../domain/User";
import { UserData } from "../../domain/UserData";

export class UserDto {
  static fromDomainModelToDataModel(user: User): UserData {
    const userData = new UserData();
    userData.id = user.properties().id;
    userData.name = user.properties().name;
    userData.lastname = user.properties().lastname;
    userData.email = user.properties().email;
    userData.password = user.properties().password;
    userData.age = user.properties().age;
    userData.street = user.properties().address.street;
    userData.number = user.properties().address.number;
    userData.city = user.properties().address.city;
    userData.country = user.properties().address.country;
    userData.gender = user.properties().gender;

    return userData;
  }
}
