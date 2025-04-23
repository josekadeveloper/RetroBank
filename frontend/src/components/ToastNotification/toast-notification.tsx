import { toast } from "react-toastify";

export enum Notification {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export function toastNotification(
  typeNotification: Notification,
  message: string
) {
  setTimeout(() => {
    if (typeNotification === Notification.ERROR) {
      return toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "terminal",
      });
    } else if (typeNotification === Notification.SUCCESS) {
      return toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "terminal",
      });
    }
  }, 500);
}
