const container = document.getElementById("container");
const btnContainer = document.getElementById("btn-container");

const imageData = [
  {
    className:"img1",
    src:"https://picsum.photos/id/101/200"
  },
  {
    className:"img2",
    src:"https://picsum.photos/id/102/200"
  },
  {
    className:"img3",
    src:"https://picsum.photos/id/103/200"
  },
  {
    className:"img4",
    src:"https://picsum.photos/id/104/200"
  },
  {
    className:"img5",
    src:"https://picsum.photos/id/105/200"
  }
];

// random duplicate
const duplicate =
imageData[Math.floor(Math.random()*imageData.length)];

const finalImages = [...imageData, duplicate];

// shuffle
finalImages.sort(()=>Math.random()-0.5);

let selectedImages = [];

// render images
finalImages.forEach((item,index)=>{

  const img = document.createElement("img");

  img.src = item.src;

  img.classList.add(item.className);

  // IMPORTANT FOR CYPRESS
  img.setAttribute("data-ns-test", item.className);

  img.alt = "verification-image";

  img.dataset.classname = item.className;

  img.addEventListener("click", ()=>handleClick(img));

  container.appendChild(img);

});

function handleClick(img){

  // prevent selecting same image twice
  if(selectedImages.includes(img)){
    return;
  }

  // only 2 selections
  if(selectedImages.length < 2){

    img.classList.add("selected");

    selectedImages.push(img);
  }

  showResetButton();

  if(selectedImages.length === 2){
    showVerifyButton();
  }
}

function showResetButton(){

  if(document.getElementById("reset")){
    return;
  }

  const resetBtn = document.createElement("button");

  resetBtn.id = "reset";

  resetBtn.innerText = "Reset";

  resetBtn.addEventListener("click", resetGame);

  btnContainer.appendChild(resetBtn);
}

function showVerifyButton(){

  if(document.getElementById("verify")){
    return;
  }

  const verifyBtn = document.createElement("button");

  verifyBtn.id = "verify";

  verifyBtn.innerText = "Verify";

  verifyBtn.addEventListener("click", verifyImages);

  btnContainer.appendChild(verifyBtn);
}

function verifyImages(){

  const verifyBtn = document.getElementById("verify");

  if(verifyBtn){
    verifyBtn.remove();
  }

  const oldPara = document.getElementById("para");

  if(oldPara){
    oldPara.remove();
  }

  const para = document.createElement("p");

  para.id = "para";

  if(
    selectedImages[0].dataset.classname ===
    selectedImages[1].dataset.classname
  ){

    para.innerText =
    "You are a human. Congratulations!";

  }else{

    para.innerText =
    "We can't verify you as a human. You selected the non-identical tiles.";
  }

  btnContainer.appendChild(para);
}

function resetGame(){

  selectedImages.forEach(img=>{
    img.classList.remove("selected");
  });

  selectedImages = [];

  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const para = document.getElementById("para");

  if(resetBtn) resetBtn.remove();
  if(verifyBtn) verifyBtn.remove();
  if(para) para.remove();
}
