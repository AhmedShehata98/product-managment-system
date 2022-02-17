
// Get inputs variables

const pricingForm = document.querySelector('#mainPriceingForm'),
    ProductTitle  = document.getElementById('title'),
    ProductCategory = document.getElementById('Category'),
    ProductPrice    = document.getElementById('price'),
    ProductTaxes    = document.getElementById('tax'),
    ProductAds      = document.getElementById('ads'),
    ProductDiscount    = document.getElementById('discount'),
    ProductCount       = document.getElementById('count'),
    ProductInnerTotal  = document.getElementById('innerTotal'),
    CreateBTN          = document.getElementById('CreateBtn'),
    SearchField        = document.getElementById('searchFaild'),
    SearchBTN_category = document.getElementById('search_Category'),
    SearchBTN_Title    = document.getElementById('search_title');
    TableOutData    = document.getElementById('myoutputArea');

    // Array store all the Products 
    // retrive data that saved in the localstorage to rhe array
    let ALL_THE_PRODUCTS=[];
    if (window.localStorage.getItem('product') !== null) {
        ALL_THE_PRODUCTS = JSON.parse(window.localStorage.getItem('product'));
        
        ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS)
    }
    let counter = document.getElementById('product_count').textContent = ALL_THE_PRODUCTS.length;

// Create events
// 
window.addEventListener('load',()=>{
    ProductTitle.focus()
})

pricingForm.addEventListener('change',(e)=>{
    
    if(pricingForm.checkValidity() === false){
        pricingForm.classList.add('was-validated')
    }
})

pricingForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})

ProductPrice.addEventListener('input',GET_TOTAL_PRICE);
ProductTaxes.addEventListener('input',GET_TOTAL_PRICE);
ProductAds.addEventListener('input',GET_TOTAL_PRICE);
ProductDiscount.addEventListener('input',GET_TOTAL_PRICE);

CreateBTN.addEventListener('click',()=>{
    CREATE_PRODCT();
    pricingForm.reset()
    REST_FIELD_PARAMETERS();
    counter.textContent = ALL_THE_PRODUCTS.length
})



// create functions
// 
function REST_FIELD_PARAMETERS(){
    ProductInnerTotal.classList.remove('bg-warning');
    ProductInnerTotal.classList.remove('fw-bold');
    ProductInnerTotal.textContent = '0.00';
}


function GET_TOTAL_PRICE(){
    
    const result = +(ProductPrice.value) + +(ProductTaxes.value) + +(ProductAds.value);
    if (ProductDiscount.value !== '') {
        const resultWithDiscount = result - +(ProductDiscount.value);
        ProductInnerTotal.textContent = resultWithDiscount;
    }else{
        ProductInnerTotal.textContent = result;
    }

    if(ProductInnerTotal.textContent !== '0.00'){
        ProductInnerTotal.classList.add('bg-warning');
        ProductInnerTotal.classList.add('fw-bold');
    }
}

function CREATE_PRODCT(){
    productObject={
        product_name            : (ProductTitle.value).toUpperCase(),
        product_price_amount    : +(ProductPrice.value),
        product_taxes_amount    : +(ProductTaxes.value),
        product_ads_amount      : +(ProductAds.value),
        product_discount_amount : +(ProductDiscount.value),
        product_total_amount    : +(ProductInnerTotal.textContent),
        product_count           : +(ProductCount.value),
        product_category        : (ProductCategory.value).toUpperCase(),
        
    }

    ALL_THE_PRODUCTS.push(productObject);
    window.localStorage.setItem('product',JSON.stringify(ALL_THE_PRODUCTS));
    ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS)
}

function ADD_PRODCT_TO_TABLE(product){
    TableOutData.innerHTML = '';
    for(let i=0 ; i < product.length ; i++){
        console.log(product[i]);

        const tableData =`
        <tr>
            <th scope="row">${i+1}</th>
            <td>${product[i].product_name }</td>
            <td>${product[i].product_category }</td>
            <td>${product[i].product_price_amount }</td>
            <td>${product[i].product_taxes_amount }</td>
            <td>${product[i].product_ads_amount }</td>
            <td>${product[i].product_discount_amount }</td>
            <td>${product[i].product_count }</td>
            <td>${product[i].product_total_amount }</td>
            <td class="me-0 p-1 pe-0"><button type="button" class="btn btn-dark ">Update</button></td>
            <td class="ms-0 p-1 ps-0"><button type="button" class="btn btn-danger " onclick="deleteIT(${i})" >Delete</button></td>
        </tr>
        `

        TableOutData.innerHTML += tableData;
    }
}

function deleteIT(index){
    ALL_THE_PRODUCTS.splice(index,1);
    window.localStorage.setItem('product',ALL_THE_PRODUCTS);
    ADD_PRODCT_TO_TABLE(ALL_THE_PRODUCTS);
}