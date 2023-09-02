class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  totalTasks = 0;
  userActivity: UserActivity;
  storeSalary: number = 0;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  get salary() {
    if (this.storeSalary === 0) {
      this.totalTasks = this.userActivity.tasks.length;
      return this.totalTasks * 100;
    }

    return this.storeSalary;
  }

  set salary(amount: number) {
    this.storeSalary = amount;
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);
console.log(userSalary.salary);
userSalary.salary = 3000;
console.log(userSalary.salary);
