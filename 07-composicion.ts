class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary {
  totalTasks = 0;

  getSalary() {
    const userActivity = new UserActivity();
    this.totalTasks = userActivity.tasks.length;
    return this.totalTasks * 100;
  }
}

const userSalary = new UserSalary();
console.log(userSalary.getSalary());
