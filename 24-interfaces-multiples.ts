interface INotificationEmail {
  sentEmail(email: string, subject: string, body: string): void;
}

interface INotificationWhatsApp {
  sentMessage(phone: string, message: string): void;
}

class NotificationApplicant
  implements INotificationEmail, INotificationWhatsApp
{
  sentEmail(email: string, subject: string, body: string): void {
    console.log("Email send to " + email);
  }

  sentMessage(phone: string, message: string): void {
    console.log("Message send to ", phone);
  }
}

class NotificationPlanner implements INotificationWhatsApp {
  sentMessage(phone: string, message: string): void {
    console.log("Message send to ", phone);
  }
}

const notificationApplicant = new NotificationApplicant();
notificationApplicant.sentEmail(
  "sergio@correo.com",
  "Hola",
  "Mensaje de prueba"
);
notificationApplicant.sentMessage("999999999", "Hola");

const notificationPlanner = new NotificationPlanner();
notificationPlanner.sentMessage("5464655", "Hola");
