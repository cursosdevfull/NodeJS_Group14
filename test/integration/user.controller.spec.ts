import * as httpMock from "node-mocks-http";

import { RedisBootstrap } from "../../src/app/bootstrap/redis";
import { ExceptionApplicationMessage } from "../../src/app/modules/user/application/exceptions/exception";
import { UserCreate } from "../../src/app/modules/user/application/UserCreate";
import { UserDelete } from "../../src/app/modules/user/application/UserDelete";
import { UserGetAll } from "../../src/app/modules/user/application/UserGetAll";
import { UserGetAllByRole } from "../../src/app/modules/user/application/UserGetAllByRole";
import { UserGetByPage } from "../../src/app/modules/user/application/UserGetByPage";
import { UserGetImage } from "../../src/app/modules/user/application/UserGetImage";
import { UserGetOne } from "../../src/app/modules/user/application/UserGetOne";
import { UserUpdate } from "../../src/app/modules/user/application/UserUpdate";
import { Role } from "../../src/app/modules/user/domain/entities/Role";
import { User } from "../../src/app/modules/user/domain/roots/User";
import { UserInfrastructure } from "../../src/app/modules/user/infrastructure/UserInfrastructure";
import { UserController } from "../../src/app/modules/user/presentation/user.controller";
import mockUsers from "../mocks/users.json";

let repository: any;
let userCreate: UserCreate;
let userGetOne: UserGetOne;
let userGetAll: UserGetAll;
let userGetAllByRole: UserGetAllByRole;
let userUpdate: UserUpdate;
let userGetByPage: UserGetByPage;
let userDelete: UserDelete;
let userGetImage: UserGetImage;
let mockSet: jest.Mock;
let request: any;
let response: any;

const errorDatabase = {
  message: "Error in database",
  stack: "Error 500 generated",
};

describe("user.controller.ts", () => {
  beforeAll(() => {});

  beforeEach(() => {
    (UserCreate as jest.Mock) = jest.fn();
    (UserGetOne as jest.Mock) = jest.fn().mockReturnValue({
      getOne: jest.fn().mockResolvedValue({
        isErr: jest.fn().mockReturnValue(false),
        value: mockUsers[0],
      }),
    });
    (UserUpdate as jest.Mock) = jest.fn();
    (UserGetByPage as jest.Mock) = jest.fn();
    (UserDelete as jest.Mock) = jest.fn();
    (UserGetAllByRole as jest.Mock) = jest.fn();
    (UserGetImage as jest.Mock) = jest.fn();

    userCreate = new UserCreate(repository);
    userGetOne = new UserGetOne(repository);
    userGetAllByRole = new UserGetAllByRole(repository);
    userUpdate = new UserUpdate(repository);
    userGetByPage = new UserGetByPage(repository);
    userDelete = new UserDelete(repository);
    userGetImage = new UserGetImage(repository);

    mockSet = jest.fn();
    RedisBootstrap.set = mockSet;

    request = httpMock.createRequest();
    response = httpMock.createResponse();
  });

  it("list ok", async () => {
    // Arrange
    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: jest.fn().mockReturnValue(false),
        value: mockUsers.map(
          (user) =>
            new User({
              id: user.id,
              name: user.name,
              lastname: user.lastname,
              email: user.email,
              password: user.password,
              roles: user.roles.map((role) => new Role(role.id, role.name)),
            })
        ),
      }),
    });

    repository = new UserInfrastructure();

    userGetAll = new UserGetAll(repository);

    const userController = new UserController(
      userCreate,
      userGetOne,
      userGetAll,
      userGetAllByRole,
      userUpdate,
      userGetByPage,
      userDelete,
      userGetImage
    );

    // Act
    await userController.list(request, response);

    // Assert
    //expect(response._getJSONData()).toEqual(mockUsers);
    expect(response.statusCode).toBe(200);
    expect(mockSet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it("list error", async () => {
    // Arrange

    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: jest.fn().mockReturnValue(true),
      }),
    });

    repository = new UserInfrastructure();

    userGetAll = new UserGetAll(repository);

    const userController = new UserController(
      userCreate,
      userGetOne,
      userGetAll,
      userGetAllByRole,
      userUpdate,
      userGetByPage,
      userDelete,
      userGetImage
    );

    // Act
    await userController.list(request, response);

    // Assert
    expect(response.statusCode).toBe(500);
    expect(response._getJSONData().message).toBe(
      ExceptionApplicationMessage.USERS_NOT_FOUND
    );
    //expect(response._getJSONData()).toEqual(errorDatabase);
  });
});
