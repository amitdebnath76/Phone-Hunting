const phoneHunt = async (result = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${result}`
  );
  const data = await res.json();
  const phonse = data.data;
  displayPhones(phonse, isShowAll);
};
phoneHunt();

const displayPhones = (phones, isShowAll) => {
  const phoneContener = document.getElementById("phone-Contener");
  // For clearing previous data from content page
  phoneContener.innerHTML = "";
  // Show all button implementation
  const showButton = document.getElementById("showAllButton");
  if (phones.length > 12 && !isShowAll) {
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone)
    const phoneInfo = document.createElement("div");
    phoneInfo.classList = `card w-full  bg-base-100 shadow-xl`;
    phoneInfo.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">"${phone.phone_name}"</h2>
          <p>If you want to see all information of this phone. Click on the Show details button!</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    phoneContener.appendChild(phoneInfo);
    lodderIcon(false);
  });
};

const hendelButton = (isShowAll) => {
  const inputField = document.getElementById("inputField");
  const inputText = inputField.value;
  // console.log(inputText)
  lodderIcon(true);
  phoneHunt(inputText, isShowAll);
  // inputText.value = ''
};

// Lodder icon utility
const lodderIcon = (showIcon) => {
  const loading = document.getElementById("lodder-icon");
  if (showIcon) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

// Show All button and its functionality
const showAll = () => {
  hendelButton(true);
};

// Show details information
const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetail = data.data;
  showModal(phoneDetail);
  console.log(phoneDetail);

  // phoneName.innerText`${phoneDetail.}`
};
// <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
const showModal = (phoneDetail) => {
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phoneDetail.name;

  const aboutPhone = document.getElementById("phone-details");
  aboutPhone.innerHTML = `
    <img src="${phoneDetail.image}" alt="">
    <p>Chipset :<span> ${phoneDetail.mainFeatures.chipSet}</span></p>
    <p>Displaysize :<span>${phoneDetail.mainFeatures.displaySize}</span></p>
    <p>Memory :<span></span>${phoneDetail.mainFeatures.memory}</p>
    <p>Storage :<span>${phoneDetail.mainFeatures.storage}</span></p>

    `;
  my_modal_1.showModal();
};
