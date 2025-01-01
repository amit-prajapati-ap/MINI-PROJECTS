const ApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImYwNTFhODIyYzhmNjUwYzFlZjMxYmE0M2FhOGQwMjIxIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDEtMDFUMTY6MjM6MzUuMzQxNDAwIn0.V4TkNv-ndQWDvlydoRyOEYWkBHCuhrDylQhUpezwUpo";

const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".generated-box");

async function generateAiImage(userPrompt, userImgQuantity) {
    // try {
    //     const response = await fetch("https://api.openai.com/v1/images/generations", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${ApiKey}`
    //         },
    //         body: JSON.stringify({
    //             // prompt: userPrompt,
    //             // n: parseInt(userImgQuantity),
    //             // size: "512x512",
    //             // response_format: "b64_json"
    //             "model": "dall-e-3",
    //             "prompt": "a white siamese cat",
    //             "n": 1,
    //             "size": "1024x1024"
    //         })
    //     });
    //     const data = await response.json();
    // }
    // catch (error) {
    //     alert(error.message);
    // }

    const url = 'https://api.monsterapi.ai/v1/generate/txt2img';
    const bearerToken = ApiKey;

    const formData = new FormData();
    formData.append('prompt', 'detailed sketch of lion by greg rutkowski, beautiful, intricate, ultra realistic, elegant, art by artgerm');
    formData.append('aspect_ratio', 'portrait');
    formData.append('guidance_scale', '12.5');

    fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${bearerToken}`
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Full response data:', data);

            // Try to extract the image URL or handle the response
            const imageUrl = data.image_url || data.image || data.result?.image_url;

            if (imageUrl) {
                // Create an <img> element and display the image
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Generated Image';
                imgElement.style.maxWidth = '100%';
                imgElement.style.height = 'auto';

                // Append the <img> to the document body or a specific container
                document.body.appendChild(imgElement);
            } else {
                console.error('Image URL not found in the response. Please check the response structure:', data);
            }
        })
        .catch(error => {
            console.error('Error generating image:', error);
        });

        
}

function handleFormSubmission(e) {
    e.preventDefault();
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    const ImgCardMarkup = Array.from({ length: userImgQuantity }, () =>
        `<div class="img-card loading">
                <img src="images/loader.svg">
                <a href="#">
                    <img src="images/download.svg">
                </a>
            </div>`
    ).join("");

    imageGallery.innerHTML = ImgCardMarkup;
    generateAiImage(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);