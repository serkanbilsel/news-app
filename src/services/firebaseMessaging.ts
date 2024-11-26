import { messaging, getToken, onMessage } from './firebaseConfig'; // Firebase yapılandırmasından gerekli fonksiyonları import ediyoruz

// Push bildirimleri almak
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Bildirim alındı:", payload);
    // Burada bildirimi kullanıcıya gösterebilirsiniz (örneğin, bir alert veya UI'de gösterim)
  });
};

// Kullanıcının token'ını alıyoruz
export const requestPermissionAndGetToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "yMzt7ny-aLFDYQmnGjhVvJwiQzHGFBSt1jny_VKxnok", // Firebase Console'dan aldığınız VAPID Key
    });
    if (currentToken) {
      console.log("Token alındı:", currentToken);
      // Token'ı backend'e kaydedebilirsiniz veya bir veritabanında saklayabilirsiniz
      return currentToken;
    } else {
      console.log("Token alınamadı.");
    }
  } catch (err) {
    console.error("Token alma hatası:", err);
  }
};
