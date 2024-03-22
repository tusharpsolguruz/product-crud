let productDetails=[];
let isWeight = false;
let isCompany = false;
function onFormSubmit(event){
    if(event!=null && event!=undefined){
        event.preventDefault();
    }
    var productId=document.getElementById('productId');
    var productPartNo=document.getElementById('productPartNo');
    var productName=document.getElementById('productName');
    var productSize = document.querySelector( 'input[name="size"]:checked'); 
    var productSizeValue = productSize ? productSize.value : "";
    var productColor=document.getElementsByName('color');
    var productDescription=document.getElementById('productDescription');
    var productWeight=document.getElementById('productWeight');
    var weightDisplay=document.getElementById('weight');
    var productCompanyName=document.getElementById('productCompanyName');
    var productCompanyEstablishDate=document.getElementById('productCompanyEstablishDate');
    var productCompanyAddress=document.getElementById('productCompanyAddress');
    var addWeightBtn=document.getElementById('addWeight-btn');
    var hideWeightDetails=document.getElementById('hide-weightDetails');
    var companyDetailsDisplay=document.getElementById('companyDetails');
   // var doneBtn=document.getElementById('done-btn');
    var addCompanyBtn=document.getElementById('addCompany-btn');
   // var companyBtn=document.getElementById('company-btn');
    var hideCompanyDetails=document.getElementById('hide-companyDetails');

    let productIdError=document.getElementById('productIdError');
    let productPartNoError=document.getElementById('productPartNoError');
    let productNameError=document.getElementById('productNameError');
    let productSizeError=document.getElementById('productSizeError');
    let productColorError=document.getElementById('productColorError');
    let productWeightError=document.getElementById('productWeightError');
    let productCompanyNameError=document.getElementById('productComapanyNameError');
    let productCompanyEstablishDateError=document.getElementById('productCompanyEstablishDateError');
    let productCompanyAddressError=document.getElementById('productCompanyAddressError');
    let productDescriptionError=document.getElementById('productDescriptionError');
    let submitBtn=document.getElementById('submitBtn');
    var selectedColor="";
    for (var i = 0; i < productColor.length; i++) {
        if (productColor[i].type == "checkbox" && productColor[i].checked == true){
           selectedColor+=productColor[i].value+" ";
        }
    }
    const productObj={
        productId:+productId.value,
        productPartNo:+productPartNo.value,
        productName:productName.value,
        productSize:productSizeValue,
        productColor:selectedColor,
        productDescription:productDescription.value,
        productWeight:+productWeight.value,
        productCompanydetails:  {
            productCompanyName:productCompanyName.value,
            productCompanyEstablishDate:productCompanyEstablishDate.value,
            productCompanyAddress:productCompanyAddress.value
        }
    }
    console.log(productObj.productCompanydetails);
    let checkProductNameCond = checkStringEmpty(productName,productNameError,"Please Enter Product Name") && isSpace(productName.value, productNameError) && isLength(productName.value,productNameError) && isCharacter(productName.value, productNameError)

    if(checkProductNameCond){
        hideDiv(productNameError);
    }
    let checkProductIdCond=checkStringEmpty(productId,productIdError,"Please Enter Product Id")  && checkPositive(productId.value,productIdError) && checkFirstZero(productId.value,productIdError) && checkSize(productId.value,productIdError);
    if(checkProductIdCond){
        hideDiv(productIdError);
    }
    let checkProductPartNoCond=checkStringEmpty(productPartNo,productPartNoError,"Please Enter Product Part No")  && checkPositive(productPartNo.value,productPartNoError) && checkFirstZero(productPartNo.value,productPartNoError) && checkSize(productPartNo.value,productPartNoError);
    if(checkProductPartNoCond){
        hideDiv(productPartNoError);
    }
    let checkProductSizeCond=checkRadioButton(productSizeValue,productSizeError,"please select one size");
    if(checkProductSizeCond){
        hideDiv(productSizeError);
    }
    let checkProductColorCond=checkCheckbox(selectedColor,productColorError,"please select at least one color");
    if(checkProductColorCond){
        hideDiv(productColorError);
    }
    let checkProductDescriptionCond=checkStringEmpty(productDescription,productDescriptionError,"Please Enter Product Description")&& isSpace(productDescription.value,productDescriptionError);
    if (checkProductDescriptionCond) {
        hideDiv(productDescriptionError);
    }
    console.log("Above details")
    
    
    console.log("checking all Condition:"+checkProductIdCond && checkProductNameCond && checkProductPartNoCond && checkProductSizeCond && checkProductColorCond && checkProductDescriptionCond)
    if(checkProductIdCond && checkProductNameCond && checkProductPartNoCond && checkProductSizeCond && checkProductColorCond && checkProductDescriptionCond ){
        
        if (isWeight) {
            
            let isProductWeightValid = validateProductWeight();
            if (!isProductWeightValid) {
                return false; 
            }
        }
        console.log("Company 98:"+isCompany);
        if(isCompany){

            let isCompanyName=validateCompanyName(productCompanyName);
            if(!isCompanyName){
                return false;
            }
            else{
                hideDiv(productCompanyNameError);
            }
            let isCompanyAddress=validateCompanyAddress(productCompanyAddress);
            if(!isCompanyAddress){
                return false;
            }
            else{
                hideDiv(productCompanyAddressError);
            }
        }
        var isExistId = productDetails.find(product => product.productId === productObj.productId);
        
        // productId update matches the current product
        var isCurrentProduct = productDetails.find(product => product.productId === productObj.productId && product.productName === productObj.productName);
        
        //productId is the current product edited skip 
        if (!isCurrentProduct) {
            var isExistName = productDetails.find(product => product.productName === productObj.productName);
            
            productIdError.style.display = "none";
            productNameError.style.display = "none";
            
            if (isExistId) {
                displayError(productIdError,"Product Id already exists.");
            } 
            if (isExistName) {
                displayError(productNameError,"Product Name already exists.");
            } 
            if (isExistId || isExistName) {
                return; 
            }
        }
        
        var index = productDetails.findIndex(p => (p.productId) == +productId.value || (p.productName) ===productName.value);
        if (index == -1 ) {
          productDetails.push(productObj);
        } else {//update code
            updateBtn.style.display="none";
            submitBtn.style.display="block";
           
            document.getElementById('productId').disabled=false;
            document.getElementById('productName').disabled=false;
            productDetails[index] = productObj;
            
           
        }
        printData();
        clearData();
        weightDisplay.style.display="none";
        addWeightBtn.style.display="block";
        hideWeightDetails.style.display="none";
        // doneBtn.style.display="none";
        companyDetailsDisplay.style.display="none";
        addCompanyBtn.style.display="block";
        //companyBtn.style.display="none";
        hideCompanyDetails.style.display="none";
    }
            
}
function validateProductWeight() {
    let checkProductWeightCond = checkStringEmpty(productWeight, productWeightError, "Please Enter Product Weight") && checkPositive(productWeight.value, productWeightError) && checkFirstZero(productWeight.value, productWeightError) && checkSize(productWeight.value, productWeightError);
    if (!checkProductWeightCond) {
        return false;
    }
    return true; 
}
function validateCompanyName(productCompanyName){
    let productCompanyNameError=document.getElementById('productComapanyNameError');
   // let productCompanyEstablishDateError=document.getElementById('productCompanyEstablishDateError');
   // let productCompanyAddressError=document.getElementById('productCompanyAddressError');
    let checkProductCompanyNameCond= checkStringEmpty(productCompanyName,productCompanyNameError,"Please Enter Product Company Name") && isSpace(productCompanyName.value, productCompanyNameError) && isLength(productCompanyName.value,productCompanyNameError) && isCharacter(productCompanyName.value, productCompanyNameError)
    console.log("Company Error"+checkProductCompanyNameCond);
    if(!checkProductCompanyNameCond){
       return false;
    }
    
    return true;
}
function validateCompanyAddress(productCompanyAddress){
    let productCompanyAddressError=document.getElementById('productCompanyAddressError');
    let checkProductCompanyAddressCond=checkStringEmpty(productCompanyAddress,productCompanyAddressError,"Please Enter Product Company Address")&& isSpace(productCompanyAddress.value,productCompanyAddressError);
    if (!checkProductCompanyAddressCond) {
        return false;
    }
    return true;
}

function updateProduct(){
    
    onFormSubmit();
    // var weightDetailsDisplay=document.getElementById('weight');
    // weightDetailsDisplay.style.display='none';
}

function addWeightProduct(){
    isWeight = true;
    isCompany = false;
    
    submitBtn.style.display="block";
    const addWeightBtn=document.getElementById('addWeight-btn');
    const weightDetailsDisplay=document.getElementById('weight');
    const hideWeightDetails=document.getElementById('hide-weightDetails');
    if (isWeight) {
        weightDetailsDisplay.style.display = "block";
    }
   
    // doneBtn.style.display='block';
    addWeightBtn.style.display='none';
    hideWeightDetails.style.display='block'; 
    displaySubmitButton(isWeight,isCompany); 
    
}

function weightDone(){ 
    // var productWeight=document.getElementById('productWeight');
    // var productWeightError=document.getElementById('productWeightError');
    let checkProductWeightCond = checkStringEmpty(productWeight, productWeightError, "Please Enter Product Weight") && checkPositive(productWeight.value, productWeightError) && checkFirstZero(productWeight.value, productWeightError) && checkSize(productWeight.value, productWeightError);
    if (!checkProductWeightCond) {
        return ;
    }
    else{
        onFormSubmit();
        hideWeightDetails();
    }
    
   
}
function hideWeightDetails(){
    productWeight.value="";
    var weightDetailsDisplay=document.getElementById('weight');
    weightDetailsDisplay.style.display='none';
    submitBtn.style.display='block';
    var hideWeightDetails=document.getElementById('hide-weightDetails');
    hideWeightDetails.style.display="none";
    var addWeightBtn=document.getElementById('addWeight-btn');
    addWeightBtn.style.display='block';
    // var doneBtn=document.getElementById('done-btn');
    // doneBtn.style.display='none';
}

function addCompanyDetails(){
    isCompany = true;
    isWeight = false;
    
    submitBtn.style.display="block";
    const addCompanyBtn=document.getElementById('addCompany-btn');
    // const companyBtn=document.getElementById('company-btn');
    const companyDetailsDisplay=document.getElementById('companyDetails');
    const hideCompanyDetails=document.getElementById('hide-companyDetails');
    //companyDetailsDisplay.style.display="block";
    if (isCompany) {
        companyDetailsDisplay.style.display = "block";
    }
    // companyBtn.style.display='block';
    addCompanyBtn.style.display='none';
    hideCompanyDetails.style.display='block';  
    displaySubmitButton(isWeight,isCompany);
    
}
function submitCompanyDetails(){
    
    onFormSubmit();
    hideCompanyDetails();
}

function hideCompanyDetails(){
    productCompanyName.value="";
    productCompanyAddress.value="";
    productCompanyEstablishDate.value="";
    const companyDetailsDisplay=document.getElementById('companyDetails');
    companyDetailsDisplay.style.display='none';
    submitBtn.style.display='block';
    const hideCompanyDetails=document.getElementById('hide-companyDetails');
    hideCompanyDetails.style.display="none";
    const addCompanyBtn=document.getElementById('addCompany-btn');
    addCompanyBtn.style.display='block';
    // const companyBtn=document.getElementById('company-btn');
    // companyBtn.style.display='none';
}
function displaySubmitButton(isWeight, isCompany) {
   
    const submitBtn = document.getElementById('submitBtn');
    const weightDetailsDisplay = document.getElementById('weight');
    const companyDetailsDisplay = document.getElementById('companyDetails');
    const addWeightBtn = document.getElementById('addWeight-btn');
    const addCompanyBtn = document.getElementById('addCompany-btn');

    if (isWeight && isCompany) {
        submitBtn.style.display = 'block';
        weightDetailsDisplay.style.display = 'block';
        companyDetailsDisplay.style.display = 'block';
        addWeightBtn.style.display = 'none';
        addCompanyBtn.style.display = 'none';
    } else if (isWeight) {
        submitBtn.style.display = 'block';
        weightDetailsDisplay.style.display = 'block';
        addWeightBtn.style.display = 'none';
    } else if (isCompany) {
        submitBtn.style.display = 'block';
        companyDetailsDisplay.style.display = 'block';
        addCompanyBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'block';
    }
}

function displayError(element, message) {
    element.innerHTML = message;
    element.style.display = "block";
    element.style.color = "red";
}
function removeProduct(){
    var productDelete = prompt("Please enter Product Name or Product Id");
    if (productDelete != null) {
        
        var index = productDetails.findIndex(product => (product.productId) === +productDelete || (product.productName) ===productDelete);
        console.log(index);
        if(index !== -1) {
            productDetails.splice(index, 1); 
            alert("Sucessfully data deleted");
            printData(); 
            clearData();
        } 
        else{
            alert("No Data found");
        }
  }
}

function removeCompanyDetails(){
    var productDelete = prompt("Please enter Product Name or Product Id");
    if (productDelete != null) {
        
        var index = productDetails.findIndex(product => (product.productId) === +productDelete || (product.productName) ===productDelete);
        console.log(index);
        if(index !== -1) {
            console.log(productDetails);
            productDetails.splice(7, 1); 
            
            alert("Sucessfully data deleted");
            printData(); 
            clearData();
        } 
        else{
            alert("No Data found");
        }
  }
}
function deleteProduct(id){
    console.log(id);
    var index = productDetails.findIndex(product => (product.productId) === id);
    console.log(index);
    if(index !== -1) {
        productDetails.splice(index, 1); 
        alert("Sucessfully data deleted");
        printData(); 
        clearData();
    } 
}
function modifyProduct(isWeight,isCompany){
    
    var modifyProduct = prompt("Please Enter Product Name or Product Id");
    var index = productDetails.findIndex(product => (product.productWeight) === 0);
    var weightDisplay=document.getElementById('weight');
    var companyDetailsDisplay=document.getElementById('companyDetails');
   
    var updateBtn=document.getElementById('updateBtn');
   
    submitBtn.style.display="none";
    updateBtn.style.display="block";
    var addWeightBtn=document.getElementById('addWeight-btn');
    var hideWeightDetails=document.getElementById('hide-weightDetails');
    var addCompanyBtn=document.getElementById('addCompany-btn');
    var hideCompanyDetails=document.getElementById('hide-companyDetails');
    var index = productDetails.findIndex(product => (product.productId) === +modifyProduct);
    if(index==-1){
        alert("No data for this ");
        submitBtn.style.display = "block"; 
        updateBtn.style.display="none";
        printData();
        
    }
    else{
    
    if (modifyProduct !== null) {
        var data = productDetails.find(product => (product.productId) === +modifyProduct || (product.productName) === modifyProduct);
        if(data !== null && data !== undefined) {
            document.getElementById('productId').value= data.productId;
            document.getElementById('productPartNo').value = data.productPartNo;
            document.getElementById('productName').value = data.productName;
            
            var sizeRadios = document.querySelectorAll('input[name="size"]');
            console.log("retrive: "+sizeRadios);
            sizeRadios.forEach(radio => {
                if(radio.value === data.productSize) {
                    radio.checked = true;
                }
            });

            var colorCheckboxes = document.getElementsByName('color');
            colorCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            console.log(data.productColor.split(' '));
            data.productColor.split(' ').forEach(color => {
                colorCheckboxes.forEach(checkbox => {
                    if(checkbox.value === color) {
                        checkbox.checked = true;
                    }
                });
            });
            document.getElementById('productDescription').value = data.productDescription;
            if (isWeight && isCompany) {
                hideWeightDetails.style.display = 'block';
                hideCompanyDetails.style.display = 'block';
                addWeightBtn.style.display = 'none';
                addCompanyBtn.style.display = 'none';
                submitBtn.style.display = 'none';
            } else if (isWeight) {
                hideWeightDetails.style.display = 'block';
                addWeightBtn.style.display = 'none';
            } else if (isCompany) {
                hideCompanyDetails.style.display = 'block';
                addCompanyBtn.style.display = 'none';
            }
            if(data.productWeight==0){
                alert("You have not field Product Weight");
            }
            else{
                isWeight = true;
                isCompany = false;
                weightDisplay.style.display = "block";
                document.getElementById('productWeight').value = data.productWeight;
                hideWeightDetails.style.display = 'block';
                addWeightBtn.style.display = 'none';
                updateBtn.style.display = "block";

            }
            console.log(data);
            
            if(data.productCompanydetails.productCompanyName!=""){
                isCompany = true;
                isWeight = false;
                companyDetailsDisplay.style.display = 'block';
                document.getElementById('productCompanyName').value = data.productCompanydetails.productCompanyName;
                document.getElementById('productCompanyEstablishDate').value = data.productCompanydetails.productCompanyEstablishDate;
                document.getElementById('productCompanyAddress').value = data.productCompanydetails.productCompanyAddress;
                updateBtn.style.display = "block"; 
            }
            else{
                alert('you have not field product Company Details');
            }
            if (data.productWeight !== 0 && data.productCompanydetails.productCompanyName !== "") {
                isCompany = true;
                isWeight = true;
                hideCompanyDetails.style.display = 'block';
                hideWeightDetails.style.display = 'block';
                addWeightBtn.style.display = 'none';
                addCompanyBtn.style.display = 'none';
                updateBtn.style.display = "block";
            }
            
            document.getElementById('productId').disabled=true;
            document.getElementById('productName').disabled=true;
            submitBtn.style.display = "none";
        } 
        if (!isWeight && !isCompany) {
            submitBtn.style.display = "block"; 
        }
        
    }
}
}
     

function modifyWeight(){
    isWeight=true;
    let productWeightError=document.getElementById('productWeightError');
    // var modifyProduct = prompt("Please Enter Product Id");
    var addWeightBtn=document.getElementById('addWeight-btn');
    addWeightBtn.style.display='none';
    // var weightDisplay=document.getElementById('weight');
    hideDiv(productWeightError);
    // weightDisplay.style.display="block";
    modifyProduct(isWeight);

    addWeightBtn.style.display='block';
    weightDisplay.style.display="none";
    submitBtn.style.display="block";
    updateBtn.style.display="none";
}

function modifyCompanyDetails(){
    var addCompanyBtn=document.getElementById('addCompany-btn');
    var companyDetailsDisplay=document.getElementById('companyDetails');
    addCompanyBtn.style.display='none';

    modifyProduct();
    addCompanyBtn.style.display='block';
    companyDetailsDisplay.style.display="none";
    submitBtn.style.display="block";
    updateBtn.style.display="none";
}
function sortingProduct(){
    var selectedValue=document.getElementById('sortProduct').value;
    
    switch (selectedValue) {
        case "productIdDESC":
            productDetails.sort((a, b) => b.productId - a.productId);
            break;
        case "productIdASC":
            productDetails.sort((a, b) => a.productId - b.productId);
            break;
        case "productPartNoASC":
            productDetails.sort((a, b) => a.productPartNo - b.productPartNo);
            break; 
        case "productPartNoDESC":
            productDetails.sort((a, b) => b.productPartNo - a.productPartNo);
            break;
        case "productNameASC":
            productDetails.sort((a, b) =>a.productName.localeCompare(b.productName));
            break;
        case "productNameDESC":
            productDetails.sort((a, b) =>b.productName.localeCompare(a.productName));
            break;
        case "productCompanyNameASC":
            productDetails.sort((a, b) => a.productCompanydetails.productCompanyName.localeCompare(b.productCompanydetails.productCompanyName));
            break;
            
        case "productCompanyNameDESC":
            productDetails.sort((a, b) => b.productCompanydetails.productCompanyName.localeCompare(a.productCompanydetails.productCompanyName));
            break;
        case "productCompanyEstablishDateASC":
            productDetails.sort((a, b) => new Date(a.productCompanydetails.productCompanyEstablishDate) - new Date(b.productCompanydetails.productCompanyEstablishDate));
            break;
        case "productCompanyEstablishDateDESC":
            productDetails.sort((a, b) => new Date(b.productCompanydetails.productCompanyEstablishDate) - new Date(a.productCompanydetails.productCompanyEstablishDate));
            break;      
    }
    printData();
}
function searchProduct(){
    var searchError = document.getElementById('searchData');
    var searchProduct = document.getElementById('searchProduct').value.toLowerCase();
    
    var search = productDetails.filter(function(product) {
        return (product.productName.toLowerCase().includes(searchProduct));
    });
    if (search.length != 0) {
        searchError.style.display = 'none';
    } else {
        searchError.style.display = 'block';
        searchError.style.color="red";
        searchError.innerText = 'No data found.';
    }
    printData(search);
}
function printData(searchData){
    var data=document.getElementById('data');
    data.innerHTML=" ";
    var products = searchData || productDetails;
    products.forEach((product)=>{
        const rowData=`<tr><td>${product.productId}</td>
        <td>${product.productPartNo}</td>
        <td>${product.productName}</td>
        <td>${product.productSize}</td>
        <td>${product.productColor}</td>
        <td>${product.productWeight}</td>
        <td>${product.productDescription}</td>
        
        <td><p>${product.productCompanydetails.productCompanyName===" "?" ":product.productCompanydetails.productCompanyName}</p>
        <p>${product.productCompanydetails.productCompanyEstablishDate===" "?" ":product.productCompanydetails.productCompanyEstablishDate}</p>
        <p>${product.productCompanydetails.productCompanyAddress===" "?" ":product.productCompanydetails.productCompanyAddress}</p>
       
        </tr>`
        data.innerHTML+=rowData; 
    });
}

function hideDiv(error) {
    error.style.display = "none";
}
function checkStringEmpty(name,errorBlock,errorMessage){
    if(name.value.trim() === ""){
        displayError(errorBlock,errorMessage);
        return false;
    } 
    return true;
}
function isCharacter(name, errorMsg) {
    var alphabetRegEx = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (!name.match(alphabetRegEx)) {
        displayError(errorMsg,"Only Contain Alphabetic with one space between words");
        return false;
    }
    return true;
}
function isLength(name, errorMsg) {
    if (!(name.trim().length >= 1 && name.trim().length <= 10)) {
        displayError(errorMsg,"Please provide length between 1 to 10")
        return false;
    }
    return true;
}
function isSpace(name, errorMsg){
    if (name.startsWith(" ")) {
        displayError(errorMsg,"First Letter should not be space");
        return false;
    }
    return true;
}
function checkSize(name,errorMsg){
    if (!(name.trim().length >= 1 && name.trim().length <= 7)) {
        displayError(errorMsg,"minimum lenth should be 1 or maximum length should be 7");
        return false;
    }
    return true;
}
function checkPositive(name,errorMsg){
    if (name.toString()[0] === '-') {
        displayError(errorMsg,"Please Provide Positive Number")
        return false;
    }
    return true;
}
function checkFirstZero(name,errorMsg){
    if (name.toString()[0] === '0') {
        displayError(errorMsg,"The first digit of the number cannot be zero.")
        return false;
    }
    return true;
}
function checkRadioButton(name,errorBlock,errorMessage){
    if (!name) {
        displayError(errorBlock,errorMessage);
        return false;
    } 
    return true;
}
function checkCheckbox(name,errorBlock,errorMessage){
    if(!name){
        displayError(errorBlock,errorMessage);
        return false;
    }
    return true;
}
function clearData(){
    productId.value="";
    productPartNo.value="";
    productName.value="";
    var sizeRadios = document.querySelectorAll('input[name="size"]');
    sizeRadios.forEach(radio => {
        radio.checked = false;
    });
    var colorCheckboxes = document.getElementsByName('color');
    colorCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    productDescription.value = "";
    productWeight.value="";
    productCompanyName.value="";
    productCompanyAddress.value="";
    productCompanyEstablishDate.value="";
}
function checkCompanyName(name, errorBlock, errorMessage) {
    if (isCompany && name.value.trim() === "") {
        displayError(errorBlock, errorMessage);
        return false;
    }
    return true;
}