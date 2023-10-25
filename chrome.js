let myLinks = [];
const inputBox = document.getElementById("input");
const save = document.getElementById("save-button");
const unOrderedList = document.getElementById("unordered-list")
const deleteButton = document.getElementById("delete") 
const tabButton = document.getElementById('tab')
//LOCAL STORAGE
//by setting it with setItem, it is already in our localStorage until we clear it
//localStorage.setItem("myLinks","www.myLinksExample.com")
//localStorage.setItem("mySecondLink","wwwe.example.com")
//console.log(localStorage.getItem("mySecondLink"))//when you console the key out, we would get the value of that key
//localStorage.clear()//this would clear the key-value pairs in the local storage
//json is a very common way of storing data in web development.

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

//using this if we refresh the page our saved links would still be there until we clear the local storage
if (leadsFromLocalStorage){
    myLinks = leadsFromLocalStorage;
    render(myLinks) 
}

//save tabs
//saved links
/* const tabs = [
    {url : "https://www.linkedin.com/in/olawale-hassan-7b360821b/"} we won't be using this anymore because we want the direct link from chrome.
] */

tabButton.addEventListener("click", function(){ //this code would run in the context of a chrome extension.
    //console.log(tabs[0].url)//this is how you access something from an object when its an array format, does that make sense?
    //we are grabbing the URL of the current tab, we can use json but currently we need to use javascript.
    //we have to manifest the permissions for the tabs so that it can work in our chrome.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){    
        //let saveTabs = tabs[0].url
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })
})

function render(Links){
    let listItems = ""
    for(let a=0; a < Links.length; a++){

    //template string
    listItems += `
    <li>
        <a target=_blank href='${Links[a]}' >${Links[a]} </a>
    </li>
    `
    }
    unOrderedList.innerHTML = listItems 
}


//delete button (dblclick) is an eventListener for double click.
deleteButton.addEventListener("dblclick", function(){
    localStorage.clear()
    myLinks = []
    render(myLinks) //we are rendering out the leads here because its is now an empty array.
    }
)

//Save button function
save.addEventListener("click", function(){
    let inputValue = inputBox.value;
    myLinks.push(inputValue)
    //we are going to clear out the input field here after it has been saved
    inputBox.value = ""
    localStorage.setItem("myLinks",JSON.stringify(myLinks))
  

   render(myLinks)  
}) 


