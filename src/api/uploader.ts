export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET ?? '';
  const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL ?? '';
  const url = new URL(uploadUrl);
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  return await fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(async (response) => await response.json())
    .then((data) => data.url);
};
