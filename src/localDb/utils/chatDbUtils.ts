class ChatDBUtil {
  // method to check for poll
  isPoll(state: number) {
    return state == 10;
  }
}

export default ChatDBUtil;
