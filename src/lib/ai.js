/**
 * Client-side AI utility — calls the server-side /api/chat route
 * which securely proxies to Groq (API key never exposed to browser)
 */

export async function sendMessageToGemini(message, history = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    const data = await response.json();

    if (data.response) {
      return data.response;
    } else {
      console.error('Chat API Error:', data);
      return "I encountered an error while processing your request. Please try again later.";
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return "I'm having trouble connecting to my brain right now. Please check your internet connection.";
  }
}
