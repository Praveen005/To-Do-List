const inputText = document.getElementById("inputItem");
const addItem = document.querySelector("#addBtn");
const completeList= document.querySelector(".itemList");


function addListItems(event){
    const listItem= document.createElement("li");
    listItem.innerHTML= `<div class="workCompletedCheckbox">
    <i class="fa-solid fa-check"></i>
    </div>    

    <div class="userEntry">${inputText.value}</div>

    <div style="position: relative;" class="upDownControl">
        <span id="upBtn"><i class="fa-solid fa-angle-up"></i></span>
        <span id="downBtn"><i class="fa-solid fa-angle-down"></i></span>
        <i style="position:absolute; font-size:1.1rem; top:50%; left:50%; transform:translate(-50%, -50%); color:#a8526d; opacity:0;" class="fa-solid fa-trash"></i>
    </div>`;

    listItem.completed = false; // Initialize the completed state

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
    const strikeItem= document.querySelector('.workCompletedCheckbox');
    only deletes the first entry, because it points to the first entry when many have the same class name

    */
    const strikeItem= listItem.querySelector('.workCompletedCheckbox');
    const userEntry= listItem.querySelector(".userEntry")
    const upBtn= listItem.querySelector('#upBtn');
    const downBtn= listItem.querySelector('#downBtn');
    const deleteIcon= listItem.querySelector(".fa-trash");
    const checkIcon= listItem.querySelector(".fa-check");

    strikeItem.onclick = (event)=>{
        checkIcon.style.opacity= "1";
        if(!listItem.completed){
            userEntry.style.textDecoration= "line-through";
            listItem.completed= true;
            upBtn.style.opacity= "0";
            downBtn.style.opacity= "0";
            downBtn.style.pointerEvents= "none";
            upBtn.style.pointerEvents= "none";
            deleteIcon.style.opacity= "1";
            
            deleteIcon.style.pointerEvents= "auto";
        }
        else{
            userEntry.style.textDecoration= "none";
            checkIcon.style.opacity= "0";
            listItem.completed= false;
            deleteIcon.style.opacity= "0";

            upBtn.style.opacity= "1";
            downBtn.style.opacity= "1";
            downBtn.style.pointerEvents= "auto";
            upBtn.style.pointerEvents= "auto";
            deleteIcon.style.pointerEvents= "none";


        }
        deleteIcon.addEventListener("mouseover", () => {
            // Code to execute when the mouse hovers over the element
            deleteIcon.style.color = "#f71e6a"; // Change color
        });

        deleteIcon.addEventListener("mouseout", () => {
            // Code to execute when the mouse hovers over the element
            deleteIcon.style.color = "#a8526d"; // Change color
        });
    }

    deleteIcon.onclick= (event) =>{
        if(listItem.completed){
            strikeItem.parentElement.remove();
            // listItem.completed= false;
        }
        listItem.completed= false;

    }

    //double-click to edit the list item
    userEntry.addEventListener('dblclick', () => {
        userEntry.setAttribute('contentEditable', 'true');
        userEntry.style.outline = 'none'; // Remove the outline
        userEntry.focus();
      });

      userEntry.addEventListener('keydown', (event) => {

        //Making Shift + Enter for new line
        if (event.shiftKey && event.key === "Enter") {
            const lineBreak = userEntry.createTextNode("\n");
            userEntry.insertNode(lineBreak);
        }
        else if (event.key === "Enter") {
          event.preventDefault();
          userEntry.setAttribute('contentEditable', 'false');
        }
      });

    // Handle blur (focus loss) event to disable editing
    userEntry.addEventListener('blur', () => {
        userEntry.setAttribute('contentEditable', 'false');
    });


    // const upBtn= listItem.querySelector('#upBtn');
    upBtn.onclick =(event) =>{
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            //place this
            event.target.parentElement.parentElement.parentElement,
            //before this
            event.target.parentElement.parentElement.parentElement.previousElementSibling
        )
    }


    // const downBtn= listItem.querySelector('#downBtn');
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

    inputText.addEventListener('keydown', (event) =>{
         if(event.key === "Enter"){
            event.preventDefault();  //// Prevent the default form submission behavior
            addListItems();
        }
    })
