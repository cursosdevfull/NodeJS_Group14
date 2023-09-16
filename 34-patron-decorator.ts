interface IMessage {
  name: string;
  email: string;
  mobile: string;
  text: string;
}

abstract class NotificationProcess {
  message!: IMessage;
  abstract send(): void;
}

class NotificationEmail extends NotificationProcess {
  constructor(public message: IMessage) {
    super();
  }

  send() {
    console.log(`Notification by email: ${JSON.stringify(this.message)}`);
  }
}

class NotificationSMS extends NotificationProcess {
  constructor(public notificationProcess: NotificationProcess) {
    super();
    this.message = notificationProcess.message;
  }

  send() {
    this.notificationProcess.send();
    console.log(`Notification by SMS: ${JSON.stringify(this.message)}`);
  }
}

class NotificationWhatsApp extends NotificationProcess {
  constructor(public notificationProcess: NotificationProcess) {
    super();
    this.message = notificationProcess.message;
  }

  send() {
    this.notificationProcess.send();
    console.log(`Notification by WhatsApp: ${JSON.stringify(this.message)}`);
  }
}

const notification1 = new NotificationWhatsApp(
  new NotificationSMS(
    new NotificationEmail({
      name: "Juan",
      email: "juan@correo.com",
      mobile: "999-999-999",
      text: "Registro completo",
    })
  )
);

notification1.send();

const notification2 = new NotificationSMS(
  new NotificationWhatsApp(
    new NotificationEmail({
      name: "Juan",
      email: "juan@correo.com",
      mobile: "999-999-999",
      text: "Registro completo",
    })
  )
);

notification2.send();

/*const notificationEmail = new NotificationEmail({ name: "Juan", email: "juan@correo.com", mobile: "999-999-999", text: "Registro completo" })
const notificationSMS = new NotificationSMS(notificationEmail)
const notificationWhatsApp = new NotificationWhatsApp(notificationSMS)
notificationWhatsApp.send()*/
//notificationSMS.send()
//notificationEmail.send()
