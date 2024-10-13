import React, { useState, useEffect, useRef } from 'react';
import logo from '../../Assets/Chat bot-pana (1).svg'; // Ensure logo path is correct

function CameraSearch() {
    const [userInput, setUserInput] = useState(''); // State to track user input
    const [messages, setMessages] = useState([]); // State to store messages in chat
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track chat window visibility
    const [isTTSEnabled, setIsTTSEnabled] = useState(false); // State to toggle TTS
    const chatContainerRef = useRef(null); // Ref to manage scroll

    // CCTV service packages and camera data
    const data = {
        basicPackage: {
            cameras: "2 - 4 basic HD/Full Color Cameras",
            installation: "Basic cabling, connectors, and configuration",
            storage: "500GB – 1TB hard drive",
            priceRange: "LKR 40,000 – 75,000",
            cameraModels: [
                { brand: "Hikvision", model: "3K Full Time Color Audio 4 Camera", price: "110,100 LKR" },
                { brand: "TVT", model: "2MP IP POE 4 Camera", price: "59,290 LKR" },
                { brand: "CP Plus", model: "2MP Full HD Bullet Camera", price: "45,000 LKR" },
                { brand: "Uniview", model: "2MP IP Camera", price: "50,000 LKR" }
            ]
        },
        intermediatePackage: {
            cameras: "4 - 8 HD/Full Color/Night Vision Cameras",
            installation: "Improved cabling, conduits, connectors, and configuration",
            storage: "1TB – 2TB hard drive",
            priceRange: "LKR 100,000 – 200,000",
            cameraModels: [
                { brand: "Hikvision", model: "3K HD Color Night Vision 7 Camera", price: "187,000 LKR" },
                { brand: "Dahua", model: "4MP Starlight IP Camera", price: "125,000 LKR" },
                { brand: "Uniview", model: "4MP IP Camera", price: "70,000 LKR" },
                { brand: "CP Plus", model: "4MP Full HD Dome Camera", price: "65,000 LKR" },
                { brand: "Bosch", model: "4MP Starlight IP Camera", price: "150,000 LKR" }
            ]
        },
        advancedPackage: {
            cameras: "8 - 16 Full HD/4K Cameras with advanced features like motion detection, human/vehicle alerts",
            installation: "Complete wiring, conduits, and high-quality connectors",
            storage: "4TB+ hard drive",
            priceRange: "LKR 250,000 – 500,000+",
            cameraModels: [
                { brand: "Hikvision", model: "3K ColorVU 8 Security Camera", price: "205,800 LKR" },
                { brand: "Dahua", model: "8MP 4K IP Camera", price: "150,000 LKR" },
                { brand: "Samsung", model: "8MP 4K IP Camera", price: "230,000 LKR" },
                { brand: "Bosch", model: "8MP 4K Starlight IP Camera", price: "200,000 LKR" },
                { brand: "Sony", model: "8MP 4K IP Camera", price: "235,000 LKR" },
                { brand: "Vivotek", model: "8MP 4K IP Camera", price: "240,000 LKR" }
            ]
        }
    };

    const formatMessageText = (text) => {
        let formattedText = text.replace(/#/g, '');

    // Regex to find bold text (**text**) and replace with <b>text</b>
        const boldTextRegex = /\*\*(.*?)\*\*/g;
        formattedText = formattedText.replace(boldTextRegex, (match, boldText) => {
            return `<b>${boldText}</b>`;
        });
        // Regex to find links, words in square brackets, and email addresses
        const regex = /(\[([^\]]+)\])?\s*(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

        return formattedText.split('\n').map((line, index) => {
            return line.replace(regex, (match, p1, p2, p3) => {
                let finalLink;

                // Determine if p3 is an email or a link
                if (p3.includes('@')) {
                    // If it's an email, create a mailto link
                    finalLink = `mailto:${p3.trim()}`;
                    // Use the email directly as clickable text
                    return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${p3.trim()}</a>`;
                } else {
                    // Clean the link by removing any leading/trailing brackets or symbols
                    const cleanLink = p3.replace(/^[^\w]+|[^\w]+$/g, '');

                    // Check if the link starts with http or www; if not, prepend http
                    finalLink = cleanLink.startsWith('http') || cleanLink.startsWith('www') ? cleanLink : `http://${cleanLink}`;

                    if (p1) {
                        // If there's a word in brackets, create a hyperlink using that word
                        return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${p2}</a>`;
                    }
                    // If there's no word in brackets, just return the clickable link
                    return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${finalLink}</a>`;
                }
            });
        }).join('<br/>'); // Join lines with <br/> for new lines
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add the user's input to the chat before sending to the API
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: userInput }
        ]);

        // Combine the table with the user's input (here, we'll just format the data object)
        const finalInput = `User Input: ${userInput}\n\nPackages:\n${JSON.stringify(data, null, 2)}`;

        try {
            // Send request to the API
            const response = await fetch('https://api.aphroheragames.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_key: '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',
                    user_input: finalInput,
                }),
            });

            const dataResponse = await response.json();
            console.log('API Response:', dataResponse); // Log the full response to inspect it

            // Assume the response contains 'bot_response' key for the chatbot's reply
            if (dataResponse.response) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: formatMessageText(dataResponse.response) }
                ]);
                
                // Speak the response only if TTS is enabled
                if (isTTSEnabled) {
                    speakText(dataResponse.response);
                }
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: 'No response from chatbot.' }
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: 'Error: Unable to get a response from the chatbot.' }
            ]);
        }

        // Clear the user input field after submitting
        setUserInput('');
    };

    // Function to convert text to speech
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        } else {
            console.log('Text-to-Speech not supported in this browser.');
        }
    };

    // Scroll to the bottom of the chat whenever messages are updated
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium z-50">
            {/* Button to toggle chat visibility */}
            <button
                className="inline-flex items-center justify-center w-12 h-12 bg-maincolor rounded-full cursor-pointer border-none"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isChatOpen}
                onClick={() => setIsChatOpen(!isChatOpen)} // Toggle chat visibility
            >
                <div className="flex items-center justify-center w-full h-full">
                    <img src={logo} alt="VNS Service Station Logo" className="w-24 h-24 pl-2" />
                </div>
            </button>

            {/* Conditionally render the chat window based on isChatOpen */}
            {isChatOpen && (
                <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[535px]">

                    {/* Heading */}
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight text-maincolor">VNS Service Station</h2> {/* Chatbot name */}
                        <p className="text-sm text-[#6b7280] leading-3">Powered by aphroheragames</p>
                    </div>

                    {/* Chat Container */}
                    <div
    ref={chatContainerRef} // Ref to scroll the chat
    className="pr-4 h-[310px] overflow-y-auto bg-gray-50 p-4 rounded-lg"
    style={{ minWidth: '100%' }}>
    {messages.map((message, index) => (
        <div
            key={index}
            className={`flex gap-3 my-4 text-sm transition-opacity duration-300 ${message.sender === 'user' ? 'justify-end opacity-100' : 'justify-start opacity-100'
                }`}
        >
            <div
                className={`flex items-center shadow-sm ${message.sender === 'user' ? 'bg-maincolor text-white' : 'bg-gray-200 text-black'
                    } p-3 rounded-xl max-w-[75%]`}
            >
                <span className="block font-semibold mr-2">
                    {message.sender === 'user' ? 'You' : 'AI'}
                </span>
                {message.sender === 'bot' ? (
                    <span
                        dangerouslySetInnerHTML={{ __html: message.text }} // Render rich text or HTML
                    />
                ) : (
                    <span>{message.text}</span> // Render plain text for user messages
                )}
            </div>
        </div>
    ))}
</div>


                    {/* Input box */}
                    <div className="flex items-center pt-2">
                        <form onSubmit={handleSubmit} className="flex items-center justify-center w-full space-x-2">
                            <input
                                className="flex h-12 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-maincolor text-gray-900"
                                placeholder="Type your message"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                            <button
                                className="inline-flex items-center justify-center rounded-lg text-sm font-medium text-white disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-maincolor to-subcolor hover:from-red-300 hover:to-red-500 transition-all ease-in-out duration-200 h-12 px-6 py-2 shadow-md"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Button to toggle TTS */}
                    <div className="pt-4">
                        <button
                            className={`w-full h-10 text-sm font-medium rounded-lg transition-colors ease-in-out ${isTTSEnabled ? 'bg-maincolor text-white' : 'bg-gray-300 text-gray-900'}`}
                            onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                        >
                            {isTTSEnabled ? 'Disable Voice' : 'Enable Voice'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CameraSearch;
