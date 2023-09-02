class UserActivity {
  tasks: Array<string> = ["Task1", "Task2", "Task3"];
}

class UserSalary extends UserActivity {
  getSalary() {
    return this.tasks.length * 100;
  }
}

const userSalary = new UserSalary();
console.log(userSalary.getSalary());
