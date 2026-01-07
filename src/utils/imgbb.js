// src/utils/imgbb.js

export async function uploadToImgBB(file) {
  if (!file) throw new Error("No file provided for upload");

  const apiKey = "8afcd4c448324e1d6ec1fa624d2d7a48"; // replace with your actual key
  const formData = new FormData();

  // Convert file to Base64
  const base64 = await toBase64(file);
  formData.append("image", base64.split(",")[1]); // remove "data:image/..;base64,"
  formData.append("key", apiKey);

  try {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error.message || "Upload failed");

    return data.data.url; // Return the URL of the uploaded image
  } catch (err) {
    console.error("ImgBB upload error:", err);
    throw err;
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
