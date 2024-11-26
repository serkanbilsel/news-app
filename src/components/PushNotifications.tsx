import React, { useEffect } from "react";
import {
  requestPermissionAndGetToken,
  listenForMessages,
} from "../services/firebaseMessaging";

const PushNotifications: React.FC = () => {
  // Component mount olduğunda bildirim izni iste ve token'ı al
  useEffect(() => {
    // Push bildirim izni iste ve token'ı al
    requestPermissionAndGetToken();

    // Mesajları dinle
    listenForMessages();
  }, []);

  return <div></div>;
};

export default PushNotifications;
