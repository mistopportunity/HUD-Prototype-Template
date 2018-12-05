
const backgroundImg = document.getElementById("background");
const foregroundImg = document.getElementById("screenshot");
const uiElements = document.getElementById("ui-elements");

const imageLoader = new Image();
imageLoader.onload = () => {
    
    backgroundImg.src = imageLoader.src;
    foregroundImg.src = imageLoader.src;
    
    const width = imageLoader.width;
    const height = imageLoader.height;
    
    const premultipledHeight = (height / width) * 100;
    const premultipledHeightHalf = premultipledHeight / 2;
    
    const premultipledWidth = (width / height) * 100;
    const premultipledWidthHalf = premultipledWidth / 2;
    
    const ratio = width / height;
    

    
    let updateBoxedMode = width > height ? () => {

        const actualRatio = window.innerWidth / window.innerHeight;

        if(actualRatio > ratio) {
            uiElements.style.top = 0;
            uiElements.style.height = "100%";
            uiElements.style.width = premultipledWidth + "vh";
            uiElements.style.left = `calc(50vw - ${premultipledWidthHalf}vh`;
        } else {
            uiElements.style.height = premultipledHeight + "vw";
            uiElements.style.top = `calc(50vh - ${premultipledHeightHalf}vw)`;
            uiElements.style.width = "100%";
            uiElements.style.left = 0;
        }

        console.log(((uiElements.clientWidth / width) * 10) / window.devicePixelRatio + "px");

        uiElements.style.fontSize = ((uiElements.clientWidth / width) * 10) / window.devicePixelRatio + "px";

    }:() => {

        const actualRatio = window.innerWidth / window.innerHeight;

        if(actualRatio > ratio) {
            uiElements.style.height = "100%";
            uiElements.style.width = premultipledWidth + "vh";
            uiElements.style.left = `calc(50vw - ${premultipledWidthHalf}vh)`;
            uiElements.style.top = 0;
        } else {
            uiElements.style.top = `calc(50vh - ${premultipledHeightHalf}vw)`;
            uiElements.style.left = 0;
            uiElements.style.width = "100%";
            uiElements.style.height = premultipledHeight + "vw";
        }

        uiElements.style.fontSize = ((uiElements.clientWidth / width) * 10) / window.devicePixelRatio + "px";
    };
    
    updateBoxedMode();
    window.addEventListener("resize",updateBoxedMode);

    document.getElementById("info").classList.add("hidden");
    uiElements.classList.remove("hidden");

    document.title = (()=>{
        const splitResult = imageLoader.src.split("/");
        return splitResult[splitResult.length - 1];
    })();

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
