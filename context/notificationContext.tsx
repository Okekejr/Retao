import { createContext, useContext, useState } from "react";

export type NotificationT = {
  messages: number;
};

const NotificationContext = createContext<{
  notifications: NotificationT;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationT>>;
}>({
  notifications: { messages: 0 },
  setNotifications: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationT>({
    messages: 0,
  });

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
