let select=document.querySelector(".select-heading");
let selecttext=document.querySelector(".select-heading span")
let arrow=document.querySelector(".select-heading img")
let options=document.querySelector(".options")
let option=document.querySelectorAll(".option")
let prompt=document.querySelector(".prompt")
let chatbtn=document.querySelector(".input-area button")
let chatContainer=document.querySelector(".chat-container")
let h1=document.querySelector(".h1")
let chatimg=document.querySelector("#chatbotimg")
let chatbox=document.querySelector(".chat-box ")
let userMessage=""
chatimg.addEventListener("click",()=>{
chatbox.classList.toggle("active-chat-box")
if(chatbox.classList.contains("active-chat-box"))
{
chatimg.src="cross.svg"
}
else{
    chatimg.src="chatbot.svg"
}
})




const Api_Url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyACvB0vS5RK8E1BnpR7zwtTZ5CELdwY64g`

select.addEventListener("click",()=>{
   options.classList.toggle("active-options");
   arrow.classList.toggle("rotate")
})

option.forEach((item)=>{
item.addEventListener("click",()=>{
    selecttext.innerText=item.innerText
})
})

//chat bot
async function generateApiResponse(aiChatBox)
{
    let textElement=aiChatBox.querySelector(".text")
    try{
        const response=await fetch(Api_Url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                contents:[{
                    "role":"user",
                    "parts":[{text:`${userMessage} in 10 words`}]
                }]
            })
        })
        const data=await response.json()
        const apiResponse=data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText=apiResponse
    }
    catch{
        console.log("Error")
    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none"
    }
   

}

function createChatBox(html,classes)
{
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList.add(classes)
    return div

}
function showLoading()
{
    const html=`<p class="text"></p>
    <img src="load.gif" class="loading" width="50px/>`
    let aiChatBox=createChatBox(html,"ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateApiResponse(aiChatBox)
}
chatbtn.addEventListener("click",()=>{
    h1.style.display="none"
    userMessage=prompt.value;
    const html=`<p class="text"></p>`
    let userChatBox=createChatBox(html,"user-chat-box")
    userChatBox.querySelector(".text").innerText=userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)

})

//virtual assistant

let ai=document.querySelector(".virtual-assistant img")
let speakpage=document.querySelector(".speak-page")
let content=document.querySelector(".speak-page h1")


ai.addEventListener("click",()=>{
speakpage.classList.toggle("active-speak-page");
})
function speak(text)
{
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="en-US";
    window.speechSynthesis.speak(text_speak)
}
let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(event)=>{
  speakpage.style.display="none";
  let currentIndex= event.resultIndex
 let transcript= event.results[currentIndex][0].transcript
 content.innerText=transcript;
 takeCommand(transcript.toLowerCase())
console.log(event);
}
function takeCommand(message)
{
    if(message.includes("open")&&message.includes("chat"))
    {
        speak("ok sir");
        chatbox.classList.add("active-chat-box")
    }
    else if(message.includes("close")&&message.includes("chat"))
        {
            speak("ok sir");
            chatbox.classList.remove("active-chat-box")
        }
        else if(message.includes("back"))
        {
            speak("ok sir")
            window.open("https://vickyfitness.netlify.app/back","_self")
        }
        else if(message.includes("chest"))
            {
                speak("ok sir")
                window.open("https://vickyfitness.netlify.app/chest","_self")
            }
            else if(message.includes("leg"))
                {
                    speak("ok sir")
                    window.open("https://vickyfitness.netlify.app/leg","_self")
                }
                else if(message.includes("shoulder"))
                    {
                        speak("ok sir")
                        window.open("https://vickyfitness.netlify.app/shoulder","_self")
                    }
                    else if(message.includes("biceps")||message.includes("triceps"))
                        {
                            speak("ok sir")
                            window.open("https://vickyfitness.netlify.app/biceps-triceps","_self")
                        }
                         else if(message.includes("workout"))
                        {
                            speak("ok sir")
                            window.open("https://vickyfitness.netlify.app/workout","_self")
                        }
                        else if(message.includes("home"))
                        {
                            speak("ok sir")
                            window.open("https://vickyfitness.netlify.app/","_self")
                        }
                       else if(message.includes('who are you'))
                            {
                                speak("I am your ai fitness assistant");
                            }
                         else if(message.includes('hello')||message.includes('hey'))
                         {
                             speak("hello how can i help you");
                         }
                         
                             else if(message.includes('who created you'))
                                 {
                                     speak("I am fitness assistant,created by vicky");
                                     window.open("https://github.com/Vimalnegi03","_blank")
                                 }
                        else
                        {
                       speak(`this is what i found on internet regarding ${message.replace("cutie","")}`);
                        window.open(`https://www.google.com/search?q=${message.replace("cutie","")||message}`,"_blank")
                        }
}
ai.addEventListener("click",()=>{
    recognition.start();
    speakpage.style.display="flex"
})
