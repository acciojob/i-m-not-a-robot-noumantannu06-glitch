 const imageContainer = document.getElementById("image-container");
    const buttonsDiv = document.getElementById("buttons");

    const classes = ["img1", "img2", "img3", "img4", "img5"];

    // Pick random duplicate
    const duplicate =
      classes[Math.floor(Math.random() * classes.length)];

    // Create array with duplicate
    let allImages = [...classes, duplicate];

    // Shuffle images
    allImages.sort(() => Math.random() - 0.5);

    let selectedImages = [];

    // Render images
    allImages.forEach((cls, index) => {
      const img = document.createElement("img");

      img.classList.add(cls);
      img.dataset.classname = cls;
      img.alt = "verification image";

      img.addEventListener("click", () => handleClick(img));

      imageContainer.appendChild(img);
    });

    function handleClick(img) {

      // Prevent double click on same image
      if (selectedImages.includes(img)) {
        return;
      }

      // Only allow 2 selections
      if (selectedImages.length < 2) {
        img.classList.add("selected");
        selectedImages.push(img);
      }

      renderButtons();
    }

    function renderButtons() {

      // Reset button
      if (
        selectedImages.length >= 1 &&
        !document.getElementById("reset")
      ) {
        const resetBtn = document.createElement("button");
        resetBtn.id = "reset";
        resetBtn.innerHTML = "Reset";

        resetBtn.addEventListener("click", resetState);

        buttonsDiv.appendChild(resetBtn);
      }

      // Verify button
      if (
        selectedImages.length === 2 &&
        !document.getElementById("verify")
      ) {
        const verifyBtn = document.createElement("button");
        verifyBtn.id = "verify";
        verifyBtn.innerHTML = "Verify";

        verifyBtn.addEventListener("click", verifyUser);

        buttonsDiv.appendChild(verifyBtn);
      }
    }

    function verifyUser() {

      // Remove verify button
      const verifyBtn = document.getElementById("verify");

      if (verifyBtn) {
        verifyBtn.remove();
      }

      const para = document.createElement("p");
      para.id = "para";

      if (
        selectedImages[0].dataset.classname ===
        selectedImages[1].dataset.classname
      ) {
        para.innerHTML = "You are a human. Congratulations!";
      } else {
        para.innerHTML =
          "We can't verify you as a human. You selected the non-identical tiles.";
      }

      // Remove previous para if exists
      const oldPara = document.getElementById("para");

      if (oldPara) {
        oldPara.remove();
      }

      buttonsDiv.appendChild(para);
    }

    function resetState() {

      selectedImages.forEach(img => {
        img.classList.remove("selected");
      });

      selectedImages = [];

      // Remove buttons
      const resetBtn = document.getElementById("reset");
      const verifyBtn = document.getElementById("verify");
      const para = document.getElementById("para");

      if (resetBtn) resetBtn.remove();
      if (verifyBtn) verifyBtn.remove();
      if (para) para.remove();
    }