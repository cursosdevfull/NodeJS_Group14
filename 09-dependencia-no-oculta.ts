class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  totalTasks = 0;
  userActivity: UserActivity;

  constructor(userActivity: UserActivity) {
    this.userActivity = userActivity;
  }

  getSalary() {
    this.totalTasks = this.userActivity.tasks.length;
    return this.totalTasks * 100;
  }
}

const userActivity = new UserActivity();
const userSalary = new UserSalary(userActivity);
console.log(userSalary.getSalary());
