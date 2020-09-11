import { notification } from "antd";
import { ArgsProps } from "antd/es/notification";

export const addNotification = (args: ArgsProps) => {
  notification.open(args);
};
