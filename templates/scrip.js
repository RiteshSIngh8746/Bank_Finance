document.addEventListener("DOMContentLoaded", function () {
    const faq = {
        "What are the warning signs of potential fraud?": "Unexpected financial activity, unsolicited requests for personal info, sudden financial behavior changes, and discrepancies in financial records.",
        "What are the common types of fraud?": "Common types include identity theft, phishing, investment fraud, credit card fraud, insurance fraud, and online auction fraud.",
        "How to protect my company from becoming a victim of fraud?": "Implement strong internal controls, educate employees, secure IT systems, monitor transactions, conduct background checks, and stay updated on fraud trends.",
        "What should I do if I suspect that my company has been a victim of fraud?": "Secure evidence, notify authorities, engage legal counsel, conduct an internal investigation, notify insurance providers, and enhance internal controls.",
        "Are there any specific industries or sectors that are more susceptible to fraud?": "Industries like financial services, healthcare, retail, government, nonprofits, and construction are at higher risk.",
        "What can be done to combat fraud more effectively?": "Use AML compliance software, real-time monitoring, AI-based detection, rule-based alerts, data integration, and enhanced reporting.",
        "What is fraud detection in banking?": "Banking fraud detection involves using technologies and strategies to identify and prevent fraudulent activities in financial transactions.",
        "How does fraud detection work?": "Banks use real-time transaction monitoring, AI, behavioral biometrics, fraud scoring, and alert systems to detect fraudulent activities.",
        "What are some common types of banking fraud?": "Credit card fraud, account takeovers, phishing, identity theft, loan fraud, and check fraud are common banking frauds.",
        "What should I do if I suspect fraud?": "Immediately contact your bank, dispute the charge, monitor your accounts, set up alerts, and be cautious of phishing attempts."
    };

    const chatBox = document.getElementById("chatBox");
    const faqContainer = document.getElementById("faqOptions");
    let remainingQuestions = Object.keys(faq);

    function addMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "Bot" ? "chatbot-message" : "user-message");
        messageDiv.textContent = sender + ": " + message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleQuestionClick(event) {
        const question = event.target.textContent;
        addMessage("You", question);
        setTimeout(() => {
            addMessage("Bot", faq[question]);
            event.target.remove();
            remainingQuestions = remainingQuestions.filter(q => q !== question);
            loadNextQuestion();
        }, 500);
    }

    function loadNextQuestion() {
        if (remainingQuestions.length > 0) {
            const nextQuestion = remainingQuestions.shift();
            const questionButton = document.createElement("button");
            questionButton.textContent = nextQuestion;
            questionButton.classList.add("chatbot-faq-btn");
            questionButton.addEventListener("click", handleQuestionClick);
            faqContainer.appendChild(questionButton);
        }
    }

    function populateFaqOptions() {
        for (let i = 0; i < 3 && remainingQuestions.length > 0; i++) {
            loadNextQuestion();
        }
    }

    populateFaqOptions();
});
