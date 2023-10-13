class ChatDBUtil {
  // method to check for poll
  isPoll(state: number) {
    return state == 10;
  }

  isNull(key: string) {
    if (key !== null && key !== "null") return true;
    return false;
  }
}

export default ChatDBUtil;
