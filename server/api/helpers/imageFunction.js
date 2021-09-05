exports.returnUserImage = (savedImage) => {
  let userImage = ''
  if (!savedImage.user_image) userImage = ''
  else userImage = savedImage.user_image.url
  return userImage
}
