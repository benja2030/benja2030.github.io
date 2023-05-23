// Import the mockData array
import mockData from './mockData.js';

// Function to create the product elements
function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.dataset.gender = product.gender; // Set data-gender attribute
  productElement.dataset.chest = product.chest; // Set data-chest attribute
  productElement.dataset.height = product.height; // Set data-height attribute
  productElement.dataset.waist = product.waist; // Set data-waist attribute

  const imageElement = document.createElement('img');
  imageElement.src = product.image;
  imageElement.alt = product.title;
  productElement.appendChild(imageElement);

  const titleElement = document.createElement('h2');
  titleElement.textContent = product.title;
  productElement.appendChild(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = product.description;
  productElement.appendChild(descriptionElement);

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Link';
  buttonElement.addEventListener('click', function() {
    window.open(product.link, '_blank');
  });
  productElement.appendChild(buttonElement);

  return productElement;
}


// Function to populate the product list with data
function populateProductList(data) {
  const productContainer = document.querySelector('.product-list');

  data.forEach(function(product) {
    const productElement = createProductElement(product);
    productContainer.appendChild(productElement);
  });
}

// Function to filter the products based on search input and gender selection
function filterProducts(searchText, genderFilter) {
  const searchTitle = document.querySelector('#search-title').value.toLowerCase();
  const searchDescription = document.querySelector('#search-description').value.toLowerCase();
  
  const productElements = document.querySelectorAll('.product');
  
  productElements.forEach(function(productElement) {
    const titleElement = productElement.querySelector('h2');
    const descriptionElement = productElement.querySelector('p');
    
    const title = titleElement.textContent.toLowerCase();
    const description = descriptionElement.textContent.toLowerCase();
    const gender = productElement.dataset.gender;
    
    const isTitleMatch = title.includes(searchTitle);
    const isDescriptionMatch = description.includes(searchDescription);
    const isGenderMatch = genderFilter === '' || gender === genderFilter;
    
    if (isTitleMatch && isDescriptionMatch && isGenderMatch) {
      productElement.style.display = 'block';
    } else {
      productElement.style.display = 'none';
    }
  });
}



// Function to filter the products based on size
function filterBySize(chestSize, heightSize, waistSize) {
  const productElements = document.querySelectorAll('.product');

  productElements.forEach(function (productElement) {
    const chest = parseInt(productElement.dataset.chest);
    const height = parseInt(productElement.dataset.height);
    const waist = parseInt(productElement.dataset.waist);

    const isChestMatch = chestSize === '' || Math.abs(chest - parseInt(chestSize)) <= 3;
    const isHeightMatch = heightSize === '' || Math.abs(height - parseInt(heightSize)) <= 3;
    const isWaistMatch = waistSize === '' || Math.abs(waist - parseInt(waistSize)) <= 3;

    if (isChestMatch && isHeightMatch && isWaistMatch) {
      productElement.style.display = 'block';
    } else {
      productElement.style.display = 'none';
    }
  });
}






// Function to handle gender filter selection
function handleGenderFilter(event) {
  const genderFilter = event.target.dataset.gender;
  filterProducts('', genderFilter);
}

// Function to handle size filter button click
function handleSizeFilter() {
  const chestSize = prompt('Ingresa tus medidas de Pecho [cm]:');
  const heightSize = prompt('Ingresa tus medidas de Largo [cm]:');
  const waistSize = prompt('Ingresa tus medidas de Cintura [cm]:');

  filterBySize(chestSize, heightSize, waistSize);
}

// Add event listeners for search input changes
document.querySelector('#search-title').addEventListener('input', function() {
  const searchText = document.querySelector('#search-title').value.toLowerCase();
  const genderFilter = document.querySelector('.filter-container .active')?.dataset.gender || '';
  filterProducts(searchText, genderFilter);
});

document.querySelector('#search-description').addEventListener('input', function() {
  const searchText = document.querySelector('#search-description').value.toLowerCase();
  const genderFilter = document.querySelector('.filter-container .active')?.dataset.gender || '';
  filterProducts(searchText, genderFilter);
});

// Add event listener for gender filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    // Remove active class from all buttons
    filterButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    
    // Add active class to the clicked button
    event.target.classList.add('active');
    
    const genderFilter = event.target.dataset.gender;
    const searchText = document.querySelector('#search-title').value.toLowerCase();
    filterProducts(searchText, genderFilter);
  });
});

// Add event listener for size filter button
document.querySelector('#filter-size-button').addEventListener('click', handleSizeFilter);

// Call the functions to populate the product list and filter initially
populateProductList(mockData);
filterProducts('', '');
