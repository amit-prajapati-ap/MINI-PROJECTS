const apiKey = "AIzaSyCF7PANnZWILQQ8c2LZdJtOrsnugOq-5yw";




const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-btn");
const initialInputHeight = messageInput.scrollHeight;
const chatHistory = [];
const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
};
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

// ----------------Section 1 - Handling User Messages------------------

//Adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = initialInputHeight + "px";
    messageInput.style.height = messageInput.scrollHeight + "px";
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
})

//Handling Send Button for sending messages
sendMessageButton.addEventListener("click", (e) => {
    handleOutgoingMessage(e);
});

//Handling outgoing user messages
function handleOutgoingMessage(e) {
    e.preventDefault();

    // create and display user message
    userData.message = messageInput.value.trim();
    const messageContent = `<div class="message-text"></div>
    ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" alt="file" class="attachment">` : ""}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    messageInput.value = "";
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));
    
    //Stimulate bot response with thinking indicator after a delay    
    setTimeout(() => {
        const messageContent = `
        <i class="fa-solid fa-robot bot-avatar"></i>
        <div class="message-text">
        <div class="thinking-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        </div>
        </div>
        `;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponse(incomingMessageDiv);
    }, 500);
}

//Create message element with dynamic classes and return it
function createMessageElement(content, ...classes) {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// ----------------Section 2 - Handling API------------------

async function generateBotResponse(incomingMessageDiv) {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    //Add user questions to chat history
    chatHistory.push({
        role: "user",
        "parts": [{ "text": userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])]
    });
    
    //Creating Options for POST request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "contents": chatHistory
        })
    };
    
    //POST request in try-catch block
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.error.message);
        }
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerHTML = apiResponseText;

        //Add bot response to chat history
        chatHistory.push({
            role: "model",
            "parts": [{ "text": apiResponseText }]
        });
    } catch (error) {
        messageElement.innerHTML = error.message;
        messageElement.style.color = "#ff0000";
    }
    finally {
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
    }
}


// ----------------Section 3 - UI Features------------------


//Handling file upload and preview the selected file
fileInput.addEventListener("change", (e) => {
    const file = fileInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const bas64String = e.target.result.split(",")[1];

        //Store file data in userData
        userData.file = {
            data: bas64String,
            mime_type: file.type
        }
        fileInput.value = "";
    }
    reader.readAsDataURL(file);
});

document.querySelector("#file-upload").addEventListener("click", () => {
    fileInput.click();
});

//Cancel File Upload
fileCancelButton.addEventListener("click", () => {
    fileUploadWrapper.classList.remove("file-uploaded");
    userData.file = {};
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});
closeChatbot.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
});