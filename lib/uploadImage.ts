import { ID, storage } from "@/appwrite"
const uploadImage = async (file: File) => {
  if (!file) {
    return;
  }
  const fileUploaded = await storage.createFile(
    "64b80cb7c571c68cec4d",
    ID.unique(),
    file
   
  );
  return fileUploaded;
};
export default uploadImage
