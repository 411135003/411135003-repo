const chatBox = document.getElementById("chat");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage("你", userMsg, "user");
  input.value = "";

  const aiMsg = await getAIResponse(userMsg);
  appendMessage("AI", aiMsg, "ai");
}

function appendMessage(sender, text, role) {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  msg.innerHTML = `<strong>${sender}：</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // ⚠️ 把這裡換成你的 OpenAI API 金鑰
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    return "發生錯誤，請稍後再試。";
  }
}
