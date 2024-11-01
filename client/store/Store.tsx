import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// Interface pour l'état de l'utilisateur
interface UserState {
  Email: string;
  Numero: string;
  AdminID: string; // Ajouter AdminID

  setUserInfo: (Email: string, Numero: string, AdminID: string) => void; // Inclure AdminID dans setUserInfo
  Deconnecte: () => void; // Fonction pour déconnecter l'utilisateur
}

// Vérifier si localStorage est disponible
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Options de persistance pour Zustand
const persistOptions: PersistOptions<UserState> = {
  name: "user_store", // Nom de la clé de stockage
};

// Créer le store avec Zustand
export const useUserStore = create<UserState>()(
  isLocalStorageAvailable()
    ? persist(
        (set) => ({
          Email: "",
          Numero: "",
          AdminID: "", // Initialiser AdminID
          setUserInfo: (Email, Numero, AdminID) =>
            set({ Email, Numero, AdminID }), // Enregistrer AdminID
          Deconnecte: () => {
            set({ Email: "", Numero: "", AdminID: "" }); // Réinitialiser les valeurs dans Zustand
            localStorage.removeItem("user_store"); // Supprimer les données du localStorage
          },
        }),
        persistOptions
      )
    : (set) => ({
        Email: "",
        Numero: "",
        AdminID: "", // Initialiser AdminID
        setUserInfo: (Email, Numero, AdminID) =>
          set({ Email, Numero, AdminID }), // Enregistrer AdminID
        Deconnecte: () => set({ Email: "", Numero: "", AdminID: "" }),
      })
);

// import { create } from "zustand";
// import { persist, PersistOptions } from "zustand/middleware";

// interface UserState {
//   Email: string;
//   Numero: string;

//   setUserInfo: (Email: string, Numero: string) => void;
//   Deconnecte: () => void; // Fonction pour déconnecter l'utilisateur
// }

// // Vérifier si localStorage est disponible
// function isLocalStorageAvailable(): boolean {
//   try {
//     const testKey = "__test__";
//     localStorage.setItem(testKey, testKey);
//     localStorage.removeItem(testKey);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }

// const persistOptions: PersistOptions<UserState> = {
//   name: "user_store", // Nom de la clé de stockage
// };

// // Créer le store avec Zustand
// export const useUserStore = create<UserState>()(
//   isLocalStorageAvailable()
//     ? persist(
//         (set) => ({
//           Email: "",
//           Numero: "",
//           setUserInfo: (Email, Numero) => set({ Email, Numero }),
//           Deconnecte: () => {
//             set({ Email: "", Numero: "" }); // Réinitialise les valeurs dans Zustand
//             localStorage.removeItem("user_store"); // Supprime les données du localStorage
//           },
//         }),
//         persistOptions
//       )
//     : (set) => ({
//         Email: "",
//         Numero: "",
//         setUserInfo: (Email, Numero) => set({ Email, Numero }),
//         Deconnecte: () => set({ Email: "", Numero: "" }),
//       })
// );

// import { create } from "zustand";
// import { persist, PersistOptions } from "zustand/middleware";

// interface UserState {
//   Email: string;
//   Numero: string;
//   setUserInfo: (Email: string, Numero: string) => void;
// }

// // Définir les options de persistance pour Zustand
// const persistOptions: PersistOptions<UserState> = {
//   name: "user_store", // Nom de la clé de stockage persistant
// };

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       Email: "",
//       Numero: "",
//       setUserInfo: (Email, Numero) => set({ Email, Numero }),
//     }),
//     persistOptions
//   )
// );

// // import { create } from "zustand";
// // import { persist } from "zustand/middleware";

// // interface UserState {
// //   Email: string;
// //   Numero: string;
// //   setUserInfo: (Email: string, Numero: string) => void;
// // }

// // export const useUserStore = create<UserState>((set) => ({
// //   Email: "",
// //   Numero: "",
// //   setUserInfo: (Email, Numero) => set({ Email, Numero }),
// // }));
