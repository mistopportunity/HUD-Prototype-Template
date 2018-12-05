
const backgroundImg = document.getElementById("background");
const foregroundImg = document.getElementById("screenshot");
const uiElements = document.getElementById("ui-elements");

let updateBoxedMode;

const imageLoader = new Image();
imageLoader.onload = () => {
    
    backgroundImg.src = imageLoader.src;
    foregroundImg.src = imageLoader.src;
    
    const width = imageLoader.width;
    const height = imageLoader.height;

    const heightRatio = height / width;
    const widthRatio = width / height;
    
    const premultipledHeight = heightRatio * 100;
    const premultipledHeightHalf = premultipledHeight / 2;
    
    const premultipledWidth = widthRatio * 100;
    const premultipledWidthHalf = premultipledWidth / 2;
    
    const ratio = width / height;

    const updateFontSize = newWidth => {
        uiElements.style.fontSize = ((newWidth / width) * 10) + "px";
    }

    
    updateBoxedMode = width > height ? () => {

        const actualRatio = window.innerWidth / window.innerHeight;

        let newWidth;

        if(actualRatio > ratio) {
            uiElements.style.top = 0;
            uiElements.style.height = "100%";
            uiElements.style.width = premultipledWidth + "vh";
            uiElements.style.left = `calc(50vw - ${premultipledWidthHalf}vh`;

            newWidth = widthRatio * window.innerHeight;
        } else {
            uiElements.style.height = premultipledHeight + "vw";
            uiElements.style.top = `calc(50vh - ${premultipledHeightHalf}vw)`;
            uiElements.style.width = "100%";
            uiElements.style.left = 0;

            newWidth = window.innerWidth;
        }

        updateFontSize(newWidth);

    }:() => {

        const actualRatio = window.innerWidth / window.innerHeight;

        let newWidth;

        if(actualRatio > ratio) {

            uiElements.style.height = "100%";
            uiElements.style.width = premultipledWidth + "vh";
            uiElements.style.left = `calc(50vw - ${premultipledWidthHalf}vh)`;
            uiElements.style.top = 0;
            
            newWidth = widthRatio * window.innerHeight;
        } else {
            uiElements.style.height = premultipledHeight + "vw";
            uiElements.style.top = `calc(50vh - ${premultipledHeightHalf}vw)`;
            uiElements.style.left = 0;
            uiElements.style.width = "100%";

            newWidth = window.innerWidth;
        }

        updateFontSize(newWidth);
    };
    
    window.addEventListener("resize",updateBoxedMode);

    document.getElementById("info").classList.add("hidden");
    uiElements.classList.remove("hidden");

    document.title = (()=>{
        const splitResult = imageLoader.src.split("/");
        return splitResult[splitResult.length - 1];
    })();

    updateBoxedMode();

}
const updateImage = url => {
    imageLoader.src = url;
};

(()=>{
    const elements = document.getElementsByTagName("filePath");
    if(elements.length !== 1) {
        console.error("Error: Invalid file path element config");
        return;
    }
    const filePathElement = elements[0];
    if(filePathElement.textContent) {
        updateImage(filePathElement.textContent);
    }
})();
