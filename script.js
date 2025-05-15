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
        "Authorization": "Bearer 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"  // 請把這裡換成你剛才複製的完整 API Key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API 回應錯誤：", data);
      return `錯誤：${data.error?.message || '未知錯誤'}`;
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("請求失敗：", error);
    return "發生錯誤，請稍後再試。";
  }
}


