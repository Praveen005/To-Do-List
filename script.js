const inputText = document.getElementById("inputItem");
const addItem = document.querySelector("#addBtn");
const completeList= document.querySelector(".itemList");


function addListItems(event){
    const listItem= document.createElement("li");
    listItem.innerHTML= `<div class="workCompletedCheckbox">
    <i class="fa-solid fa-check"></i>
    </div>    

    <div class="userEntry">${inputText.value}</div>

    <div class="upDownControl">
        <span id="upBtn"><i class="fa-solid fa-angle-up"></i></span>
        <span id="downBtn"><i class="fa-solid fa-angle-down"></i></span>
    </div>`;
    // completeList.appendChild(listItem);
    /*
    if(inputText.value !== undefined){}  didn't work.

    The reason why the condition if (inputText.value !== undefined) does not work as expected is because the value property of an input element will always be defined, even if it's empty.

    */
    if(inputText.value !== ""){
        completeList.appendChild(listItem);
        inputText.value="";

    }
    /*
    const deleteItem= document.querySelector('.workCompletedCheckbox');
    only deletes the first entry, because it points to the first entry when many have the same class name

    */
    const deleteItem= listItem.querySelector('.workCompletedCheckbox');

    const checkIcon= listItem.querySelector(".fa-check");

    deleteItem.onclick= (event)=>{
        checkIcon.style.opacity= "1";

        deleteItem.parentElement.remove();
        // const checkIcon= listItem.getElementById("fa-angle-down");
        // checkIcon.style.opacity= "1";

    }

    const upBtn= listItem.querySelector('#upBtn');
    upBtn.onclick =(event) =>{
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            //place this
            event.target.parentElement.parentElement.parentElement,
            //before this
            event.target.parentElement.parentElement.parentElement.previousElementSibling
        )
    }


    const downBtn= listItem.querySelector('#downBtn');
    downBtn.onclick =(event) =>{
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            //place this
            event.target.parentElement.parentElement.parentElement.nextElementSibling,
            //Before this
            event.target.parentElement.parentElement.parentElement
        )
    }

}

addItem.addEventListener('click', addListItems);