import { useState } from "react";
import axios from "axios";
import cloudinaryConfig from "../cloudinaryConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";

const MAX_IMAGES = 4;

const buildOrderNumber = async (): Promise<string> => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const startOfDay = new Date(yyyy, now.getMonth(), now.getDate());

  const snapshot = await getDocs(
    query(collection(db, "orders"), where("timestamp", ">=", startOfDay))
  );
  const seq = String(snapshot.size + 1).padStart(4, "0");

  return `#BF-${yyyy}-${mm}${dd}-${seq}`;
};

interface OrderPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  files: File[];
}

export const useOrderSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = async ({
    name,
    phone,
    email = "",
    message,
    files,
  }: OrderPayload): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      const customerImages: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          cloudinaryConfig.uploadPreset as string
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          formData
        );
        customerImages.push(response.data.secure_url);
      }

      const orderNumber = await buildOrderNumber();

      await addDoc(collection(db, "orders"), {
        customerName: name.trim(),
        customerPhone: phone,
        customerEmail: email.trim(),
        customerMessage: message.trim(),
        customerImages,
        orderNumber,
        status: "new",
        timestamp: serverTimestamp(),
      });

      toast.success("Заявка успешно отправлена, ожидайте от нас обратного звонка.");
      return true;
    } catch (error) {
      console.error("Ошибка при отправке заявки: ", error);
      toast.error("Произошла ошибка при отправке заявки. Попробуйте ещё раз.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitOrder, isSubmitting, maxImages: MAX_IMAGES };
};
