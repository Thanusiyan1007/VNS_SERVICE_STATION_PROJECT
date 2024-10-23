import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import logo from '../../Assets/Chat bot-pana (1).svg'; // Ensure logo path is correct

function CameraSearch() {
    const [userInput, setUserInput] = useState(''); // State to track user input
    const [messages, setMessages] = useState([]); // State to store messages in chat
    const [isChatOpen, setIsChatOpen] = useState(false); // State to track chat window visibility
    const [isTTSEnabled, setIsTTSEnabled] = useState(false); // State to toggle TTS
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage profile picture modal visibility
    const [profilePic, setProfilePic] = useState("https://via.placeholder.com/40"); // State to track user profile picture
    const [newProfilePic, setNewProfilePic] = useState(null); // State to track the newly selected profile picture
    const chatContainerRef = useRef(null); // Ref to manage scroll
    const [selectedPackage, setSelectedPackage] = useState(null); // Track the selected package for PDF generation

    // CCTV service packages and camera data
    const data = {
        basicPackage: {
            name: "Basic Package",
            cameras: "2 - 4 basic HD/Full Color Cameras",
            installation: "Basic cabling, connectors, and configuration",
            storage: "500GB – 1TB hard drive",
            priceRange: "LKR 40,000 – 75,000",
            cameraModels: [
                { brand: "Hikvision", model: "3K Full Time Color Audio 4 Camera", price: "110,100 LKR" },
                { brand: "TVT", model: "2MP IP POE 4 Camera", price: "59,290 LKR" },
                { brand: "CP Plus", model: "2MP Full HD Bullet Camera", price: "45,000 LKR" },
            ]
        },
        intermediatePackage: {
            name: "Intermediate Package",
            cameras: "4 - 8 HD/Full Color/Night Vision Cameras",
            installation: "Improved cabling, conduits, connectors, and configuration",
            storage: "1TB – 2TB hard drive",
            priceRange: "LKR 100,000 – 200,000",
            cameraModels: [
                { brand: "Hikvision", model: "3K HD Color Night Vision 7 Camera", price: "187,000 LKR" },
                { brand: "Dahua", model: "4MP Starlight IP Camera", price: "125,000 LKR" },
                { brand: "Uniview", model: "4MP IP Camera", price: "70,000 LKR" },
            ]
        },
        advancedPackage: {
            name: "Advanced Package",
            cameras: "8 - 16 Full HD/4K Cameras with advanced features like motion detection, human/vehicle alerts",
            installation: "Complete wiring, conduits, and high-quality connectors",
            storage: "4TB+ hard drive",
            priceRange: "LKR 250,000 – 500,000+",
            cameraModels: [
                { brand: "Hikvision", model: "3K ColorVU 8 Security Camera", price: "205,800 LKR" },
                { brand: "Dahua", model: "8MP 4K IP Camera", price: "150,000 LKR" },
                { brand: "Samsung", model: "8MP 4K IP Camera", price: "230,000 LKR" },
            ]
        }
    };

    const formatMessageText = (text) => {
        let formattedText = text.replace(/#/g, '');

        const boldTextRegex = /\*\*(.*?)\*\*/g;
        formattedText = formattedText.replace(boldTextRegex, (match, boldText) => {
            return `<b>${boldText}</b>`;
        });
        const regex = /(\[([^\]]+)\])?\s*(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

        return formattedText.split('\n').map((line, index) => {
            return line.replace(regex, (match, p1, p2, p3) => {
                let finalLink;

                if (p3.includes('@')) {
                    finalLink = `mailto:${p3.trim()}`;
                    return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${p3.trim()}</a>`;
                } else {
                    const cleanLink = p3.replace(/^[^\w]+|[^\w]+$/g, '');
                    finalLink = cleanLink.startsWith('http') || cleanLink.startsWith('www') ? cleanLink : `http://${cleanLink}`;

                    if (p1) {
                        return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${p2}</a>`;
                    }
                    return `<a href="${finalLink}" style="color: #A9E4EF; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${finalLink}</a>`;
                }
            });
        }).join('<br/>');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Detect if the user is asking about a specific package and store the selection
        let detectedPackage = null;
        if (userInput.toLowerCase().includes("basic package")) {
            detectedPackage = data.basicPackage;
        } else if (userInput.toLowerCase().includes("intermediate package")) {
            detectedPackage = data.intermediatePackage;
        } else if (userInput.toLowerCase().includes("advanced package")) {
            detectedPackage = data.advancedPackage;
        }

        // If a package is detected, display its details in chat
        if (detectedPackage) {
            setSelectedPackage(detectedPackage);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', text: userInput },
                {
                    sender: 'bot', text: `Here are the details for the ${detectedPackage.name}: 
                    \nCameras: ${detectedPackage.cameras}
                    \nInstallation: ${detectedPackage.installation}
                    \nStorage: ${detectedPackage.storage}
                    \nPrice Range: ${detectedPackage.priceRange}`
                }
            ]);
        } else {
            // Handle normal chatbot interaction when no package is detected
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', text: userInput }
            ]);

            const finalInput = `you are a chatbot of service website, if a customer asks ${userInput} how you will answer only with below data \n\nPackages:\n${JSON.stringify(data, null, 2)}`;

            try {
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
                if (dataResponse.response) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { sender: 'bot', text: formatMessageText(dataResponse.response) }
                    ]);

                    if (isTTSEnabled) {
                        const cleanText = dataResponse.response
                            .replace(/<[^>]*>/g, '')
                            .replace(/[^\w\s]/gi, '')
                            .replace(/(\r\n|\n|\r)/gm, '')
                            .trim();

                        speakText(cleanText);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Error: Unable to get a response from the chatbot.' }
                ]);
            }
        }

        setUserInput(''); // Clear the user input after handling the message
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        } else {
            console.log('Text-to-Speech not supported in this browser.');
        }
    };

    const pauseSpeech = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel(); // Stops any current speech synthesis
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleProfilePicChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSaveProfilePic = () => {
        if (newProfilePic) {
            setProfilePic(newProfilePic);
            setIsModalOpen(false); // Close the modal after updating profile picture
        }
    };

    // Function to generate and download a PDF
    const generatePDF = () => {
        if (!selectedPackage) return; // Exit if no package is selected

        const doc = new jsPDF();

        // Add custom header
        const addHeader = (doc) => {
            // Add background color to header
            doc.setFillColor(230, 230, 250); // Light lavender background
            doc.rect(0, 0, 210, 25, 'F'); // Full width header

            // Add title in the header
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(40, 40, 40); // Dark gray text
            doc.text('CCTV Packages - VNS Service Station', 105, 15, null, null, 'center');
        };

        // Add custom footer with background color
        const addFooter = (doc, pageNum) => {
            // Add background color to footer
            doc.setFillColor(230, 230, 250); // Light lavender background
            doc.rect(0, 280, 210, 20, 'F'); // Full width footer

            // Add page number and contact details
            doc.setFontSize(10);
            doc.setTextColor(40, 40, 40); // Dark gray text
            doc.setFont('helvetica', 'normal');
            doc.text(`Page ${pageNum}`, 105, 290, null, null, 'center'); // Page number in the center
            doc.text('Contact: www.vnsservicestation.lk | +94 71 123 4567', 105, 295, null, null, 'center');
        };

        // Add package content
        const addContent = (doc) => {
            // Title
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(40, 40, 40);
            doc.text(selectedPackage.name, 10, 35);

            // Package Details
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0); // Black text
            doc.text(`Cameras: ${selectedPackage.cameras}`, 10, 45);
            doc.text(`Installation: ${selectedPackage.installation}`, 10, 55);
            doc.text(`Storage: ${selectedPackage.storage}`, 10, 65);
            doc.text(`Price Range: ${selectedPackage.priceRange}`, 10, 75);

            // Camera Models
            selectedPackage.cameraModels.forEach((model, index) => {
                doc.text(`Model ${index + 1}: ${model.brand} - ${model.model} - ${model.price}`, 10, 85 + (index * 10));
            });
        };

        // Generate the PDF with custom header, content, and footer
        let pageNum = 1;
        addHeader(doc);
        addContent(doc);
        addFooter(doc, pageNum);

        // Save the PDF
        doc.save(`${selectedPackage.name}_VNS.pdf`);
    };

    return (
        <div className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium z-50">
            <button
                className="inline-flex items-center justify-center w-12 h-12 bg-maincolor rounded-full cursor-pointer border-none"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isChatOpen}
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <div className="flex items-center justify-center w-full h-full">
                    <img src={logo} alt="VNS Service Station Logo" className="w-24 h-24 pl-2" />
                </div>
            </button>

            {isChatOpen && (
                <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[535px]">

                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight text-maincolor">VNS Service Station</h2>
                        <p className="text-sm text-[#6b7280] leading-3">Powered by aphroheragames</p>
                    </div>

                    <div
                        ref={chatContainerRef}
                        className="pr-4 h-[310px] overflow-y-auto bg-gray-50 p-4 rounded-lg"
                        style={{ minWidth: '100%' }}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-end gap-3 my-4 text-sm transition-opacity duration-300 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.sender === 'bot' && (
                                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                )}

                                <div
                                    className={`flex items-center shadow-sm ${message.sender === 'user' ? 'bg-maincolor text-white' : 'bg-gray-200 text-black'
                                        } p-3 rounded-xl max-w-[75%]`}
                                >
                                    {message.sender === 'bot' ? (
                                        <span
                                            dangerouslySetInnerHTML={{ __html: message.text }}
                                        />
                                    ) : (
                                        <span>{message.text}</span>
                                    )}
                                </div>

                                {message.sender === 'user' && (
                                    <img
                                        src={profilePic}
                                        alt="User Profile"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        onClick={() => setIsModalOpen(true)} // Open modal on profile pic click
                                    />
                                )}
                            </div>
                        ))}
                    </div>

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

                    <div className="pt-4 flex justify-between items-center space-x-2">
                        {/* Pause button */}
                        <button
                            className="w-1/3 h-10 text-sm font-medium bg-red-500 text-white rounded-lg transition-colors ease-in-out hover:bg-slate-400"
                            onClick={pauseSpeech}
                        >
                            Pause Voice
                        </button>

                        {/* Enable/Disable Voice button */}
                        <button
                            className={`w-1/3 h-10 text-sm font-medium rounded-lg transition-colors ease-in-out ${isTTSEnabled ? 'bg-maincolor text-white' : 'bg-gray-300 text-gray-900'}`}
                            onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                        >
                            {isTTSEnabled ? 'Disable Voice' : 'Enable Voice'}
                        </button>

                        {/* Download PDF button */}
                        {selectedPackage && (
                            <button
                                onClick={generatePDF}
                                className="w-1/3 h-10 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
                            >
                                Download {selectedPackage.name} PDF
                            </button>
                        )}
                    </div>

                </div>
            )}

            {/* Profile Picture Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 space-y-4 w-[400px]">
                        <h2 className="text-xl font-semibold">Update Profile Picture</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                        {newProfilePic && (
                            <div className="flex justify-center">
                                <img src={newProfilePic} alt="New Profile" className="w-24 h-24 rounded-full" />
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfilePic}
                                className="bg-maincolor text-white px-4 py-2 rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CameraSearch;
