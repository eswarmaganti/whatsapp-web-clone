// returns true if current user is not message sender else false
export const isUserSender = (sender, user) => {
  return sender._id !== user._id;
};

// return  the current user from chat users list
export const getCurrentSender = (chatUsers, user) => {
  const sender = chatUsers.filter((chatUser) => chatUser._id !== user._id);
  return sender[0];
};
