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


    //It's a custom property that is being used to keep track of whether a list item(task) is completed or not. 
    listItem.completed = false; // Initialize the completed state

    /*
    if(inputText.value !== undefined){}  didn't work.

    The reason why the condition if (inputText.value !== undefined) does not work as expected is because the value property of an input element will always be defined, even if it's empty.

    */
    //checking if something has been entered by the user
    //if yes, add to the list 
    //else, show a Popup
    if(inputText.value !== ""){
        completeList.appendChild(listItem);
        inputText.value="";

    }
    else if(inputText.value === ""){
        const divElement= document.createElement('div');
        divElement.classList.add('alertBox')
        divElement.innerHTML = `<p class="warning-Text">Empty Item!</p>
        <div class="timedBar"></div>`
        document.body.appendChild(divElement)
        setTimeout(()=>{
            divElement.remove();
        }, 2000)
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

    //strike through the user entered text
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
        //adding the hover effect on, deleteIcon
        deleteIcon.addEventListener("mouseover", () => {
            // Code to execute when the mouse hovers over the element
            deleteIcon.style.color = "#f71e6a"; // Change color
        });

        deleteIcon.addEventListener("mouseout", () => {
            // Code to execute when the mouse hovers over the element
            deleteIcon.style.color = "#a8526d"; // Change color
        });

        //Delete the task, if user clicks on the trash/delete icon
        deleteIcon.onclick= (event) =>{
            if(listItem.completed){
                strikeItem.parentElement.remove();
            }
            listItem.completed= false;
        }
    }

    /*
        In JavaScript, `touchstart` and `touchend` are touch events that are triggered when a user interacts with a touch-enabled device, such as a smartphone or tablet, by touching the screen.

        `touchstart` event: This event is triggered when a user places their finger or touches the screen. It marks the beginning of a touch interaction.

        `touchend` event: This event is triggered when a user lifts their finger or removes contact with the screen. It marks the end of a touch interaction.

    */

    // Touchstart and touchend event listeners for mobile
    upBtn.addEventListener('touchstart', () => {
        upBtn.style.color = "#a8526d";
    });

    upBtn.addEventListener('touchend', () => {
        upBtn.style.color = "#b6c2cf";
    });

    downBtn.addEventListener('touchstart', () => {
        downBtn.style.color = "#a8526d";
    });

    downBtn.addEventListener('touchend', () => {
        downBtn.style.color = "#b6c2cf";
    });

    // deleteIcon.onclick= (event) =>{
    //     if(listItem.completed){
    //         strikeItem.parentElement.remove();
    //     }
    //     listItem.completed= false;
    // }

    //double-click to edit the list item
    userEntry.addEventListener('dblclick', () => {
        userEntry.setAttribute('contentEditable', 'true');
        userEntry.style.outline = 'none'; // Remove the outline, when in focus
        userEntry.focus();
    });

    userEntry.addEventListener('keydown', (event) => {

        //Making Shift + Enter for new line
        if (event.shiftKey && event.key === "Enter") {
            const lineBreak = userEntry.createTextNode("\n");
            userEntry.insertNode(lineBreak);
        }
        //if only 'Enter' key is pressed, while editing the task item, editing is disabled and changes saved
        else if (event.key === "Enter") {
            event.preventDefault();
            userEntry.setAttribute('contentEditable', 'false');
        }
    });

    // Handle blur (focus loss) event to disable editing, means when it goes out of focus, disable editing
    userEntry.addEventListener('blur', () => {
        userEntry.setAttribute('contentEditable', 'false');
    });


    //when upBtn is clicked, move the task up
    upBtn.onclick =(event) =>{
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            //place this
            event.target.parentElement.parentElement.parentElement,
            //before this
            event.target.parentElement.parentElement.parentElement.previousElementSibling
        )
        
    }


    //when downBtn is clicked, move the task down
    downBtn.onclick =(event) =>{
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            //place this
            event.target.parentElement.parentElement.parentElement.nextElementSibling,
            //Before this
            event.target.parentElement.parentElement.parentElement
        )
    }

}

addItem.addEventListener('click', addListItems);  //adding event istener to the Add(+) button

//when you enter text in input box and press 'Enter' it will get added to the todo
inputText.addEventListener('keydown', (event) =>{
    if(event.key === "Enter"){
        event.preventDefault();  //// Prevent the default form submission behavior
        addListItems();
    }
})
