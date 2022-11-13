const bug = document.querySelector(".bug");
bug.style.display = "none";

// Récupération des éléments

const searchBox = document.getElementById("nameOfTheNewTaskAreaInput");
let ListOfTasks = document.getElementById("listOfTasks");
const popUpTask = document.getElementById("popUpNewTask");
const popUpCategory = document.getElementById("popUpNewCategory");
const formCategory = document.getElementById("nameOfTheCategoryAreaInput");
const categoryList = document.getElementById("categoryList");
const popUpNewTaskBg = document.getElementById("popUpNewTaskBg");
const popUpNewCategoryBg = document.getElementById("popUpNewCategoryBg");
const newCategoryBtn = document.getElementById("newCategoryBtn");
const categoryListOfChangeTask = document.getElementById("categoryListOfChangeTask");
const popUpChangeTask = document.getElementById("popUpChangeTask");
const popUpChangeTaskBg = document.getElementById("popUpChangeTaskBg");
const insertChangeTask = document.getElementById("nameOfTheChangedTaskAreaInput");
let tasksNumber = document.getElementById("numberOfTasks");
const fontCategory = document.getElementById("fontOfTheCategorySelect");
const body = document.querySelector("body")

// Mise des champs de saisie vide

searchBox.value = "";
formCategory.value = "";

// Les pop-up sont-elles ouvertes ?

let taskPopUpOpen = false;
let categoryPopUpOpen = false;
let changeTaskPopUpOpen = false;

// Compteur du nombre de tâches

let tasksDone = 0;
let tasksLeft = 0;

// Categories
let categories = []

// Fonctions appelées
function findCategory(categoryName) {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].name === categoryName) {
            return categories[i];
        }
    }
}

/* Valider le formulaire pour créer une nouvelle tâche */
function createNewTask() {
    let newTask = searchBox.value;
    let categoryOfTheTask = categoryList.value;
    if (newTask === ""){
        alert("Vous ne pouvez pas créer une tâche sans nom.")
        searchBox.focus();
    } else if (categoryList.value === "") {
        alert("Veuillez chosir ou créer une catégorie.")
        newCategoryBtn.focus()
    } else {
        let category = findCategory(categoryOfTheTask);
        const newTaskHtml =`
        <li>
            <div class="taskName" onclick="listOnClick(this)">
                <input type="checkbox" class="checkbox">
                <label style="font-family: `+category.font+`;">` + newTask + `</label>
            </div>
            <i class="fa-sharp fa-solid fa-gear" onclick="popUpChangeTaskShow(this)"></i>
        </li>
        `
        let categoryToPutTask = document.getElementById(categoryOfTheTask);
        let categoryToPutTaskHtml = categoryToPutTask.innerHTML;
        categoryToPutTask.innerHTML = categoryToPutTaskHtml + newTaskHtml;
        tasksLeft++;
        showNumberOfTasks()
        searchBox.value="";
        cancel();
    }
}

/* Effectuer une tâche of deseffectuer une tâche*/ 
function listOnClick(e) {
    let li = e.parentElement;
    li.classList.toggle("checked");
    let p = li.childNodes[1].childNodes[3];
    p.classList.toggle("labelChecked");
    let checkbox = li.childNodes[1].childNodes[1];
    if (li.classList[0] != "checked") {
        tasksDone--;
        tasksLeft++;
        checkbox.checked = false;
    } else {
        tasksDone++;
        tasksLeft--;
        checkbox.checked = true;
    }
    showNumberOfTasks()
}

/* Supprimer une tâche */
function deleteTask() {
    let liToDelete = document.querySelector(".modify").parentElement.parentElement;
    liToDelete.classList.remove("modify");
    setTimeout(() => {
        liToDelete.remove();        
    }, 600);
    liToDelete.classList.add("delete");
    if (liToDelete.classList[0] === "checked") {
        tasksDone--;
    } else {
        tasksLeft--;
    }
    showNumberOfTasks();
    cancelChangeTask();
}

/* Ouvrir la pop-up de nouvelle tâche */
function newTaskBtn() {
    popUpTask.style.display = "block";
    popUpNewTaskBg.classList.add("active")
    searchBox.focus();
    taskPopUpOpen = true;
    body.style.overflowY = "hidden";
    window.scroll(0, 0);
}

/* Ouvrir la pop-up de nouvelle catégorie */
function popUpCategoryShow() {
    popUpCategory.style.display = "block";
    popUpNewCategoryBg.classList.add("active")
    formCategory.focus();
    categoryPopUpOpen = true;
}

/* Fermer la fenêtre de tâche */
function cancel() {
    popUpTask.style.display = "none";
    popUpNewTaskBg.classList.remove("active");
    searchBox.value = "";
    taskPopUpOpen = false;
    body.style.overflowY = "scroll"
}

/* Fermer la fenêtre de catégorie */
function cancelCategory() {
    popUpCategory.style.display = "none";
    popUpNewCategoryBg.classList.remove("active")
    formCategory.value="";
    categoryPopUpOpen = false;
    searchBox.focus();
}

/* Constructor d'objet */

class category {
    constructor(name, taskColor, font) {
        this.name = name;
        this.taskColor = taskColor;
        this.font = font;
    }
}

/* Valider le formulaire de création de catégorie */
let colorHexa;
let font;
function createNewCategory() {
    let categoryName = formCategory.value;
    if (categoryName === ""){
        alert("Vous ne pouvez pas créer une catégorie sans nom.")
        formCategory.focus()
    } else {     
        let colorTasks = document.querySelector(".selected");
        if (colorTasks === null) {
            alert("Veuillez choisir une couleur de fond pour la catégorie.");
        } else {
            if (colorTasks.id === "one") {
                colorHexa = "#FBF8CC"
            } else if (colorTasks.id === "two") {
                colorHexa = "#FDE4CF"
            } else if (colorTasks.id === "three") {
                colorHexa = "#FFCFD2"
            } else if (colorTasks.id === "four") {
                colorHexa = "#F1C0E8";
            } else if (colorTasks.id === "five") {
                colorHexa = "#CFBAF0";
            } else if (colorTasks.id === "six") {
                colorHexa = "#A3C4F3";
            } else if (colorTasks.id === "seven") {
                colorHexa = "#8EECF5";
            } else if (colorTasks.id === "eight") {
                colorHexa = "#B9FBC0";
            }
            let fontTexts = fontCategory.value
            if (fontTexts === "Poppins") {
                font = "poppinslight";
            } else if (fontTexts === "Roboto") {
                font = "robotolight"
            } else if (fontTexts === "Mukta") {
                font = "muktalight"
            } else if (fontTexts === "Lobster") {
                font = "lobster_tworegular";
            }
            let categoryUl = `
            <ul id="`+ categoryName +`" class="Category" style="background-color: `+ colorHexa +`;">
                <h5 class="categoryName" style="font-family: "`+ font +`"">` + categoryName + `</h5>
            </ul>`
            const ListHtml = ListOfTasks.innerHTML;
            ListOfTasks.innerHTML = ListHtml + categoryUl;
            const categoryOption = `<option selected value="` + categoryName + `"> ` + categoryName + `</option>`;
            const listCategories = categoryList.innerHTML;
            categoryList.innerHTML = listCategories + categoryOption;
            categoryListOfChangeTask.innerHTML = listCategories + categoryOption;
            let object = new category(categoryName, colorHexa, font);
            categories.push(object);
            formCategory.value="";
            cancelCategory();
        }
    }
}

/* Valider avec la touche entrée ou fermer avec la touche échap*/
document.addEventListener("keydown", (touche) => {
    const valeur = touche.keyCode.toString();
    if (valeur === "13") {
        if (categoryPopUpOpen) {
            createNewCategory();
            searchBox.focus();
            insertChangeTask.focus();
        } else if (taskPopUpOpen) {
            createNewTask();
        } else if (changeTaskPopUpOpen) {
            changeTask();
        }
    } else if (valeur === "27") {
        if (categoryPopUpOpen) {
            cancelCategory();
        } else if (taskPopUpOpen) {
            cancel();
        } else if (changeTaskPopUpOpen) {
            cancelChangeTask();
        }
    }
})



/* Ouvrir la pop-up de modification de tâche */

function popUpChangeTaskShow(liTask) {
    popUpChangeTask.style.display = "block";
    popUpChangeTaskBg.classList.add("active");
    let pToModify = liTask.parentElement.childNodes[1].childNodes[3];
    insertChangeTask.value = pToModify.innerText;
    pToModify.classList.add("modify");
    insertChangeTask.focus();
    changeTaskPopUpOpen = true;
}

/* Fermer la pop-up de modification de tâche */

function cancelChangeTask() {
    popUpChangeTask.style.display = "none";
    popUpChangeTaskBg.classList.remove("active");
    changeTaskPopUpOpen = false;
}

/* Rennomer une tâche */
function changeTask() {
    if (insertChangeTask.value === "") {
        alert("Veuillez donner un nom à votre tâche.");
    } else {
        let pToModify = document.querySelector(".modify")
        pToModify.innerText = insertChangeTask.value;
        let liToModify = pToModify.parentElement.parentElement;
        liToModify.remove();
        let liToGo = document.getElementById(categoryListOfChangeTask.value);
        let categoryToPutTask = liToGo.innerHTML;
        let category = findCategory(categoryListOfChangeTask.value);
        liToGo.innerHTML = categoryToPutTask + `
        <li>
            <div class="taskName" onclick="listOnClick(this)">
                <input type="checkbox" class="checkbox">
                <label style="font-family: `+category.font+`;">` + pToModify.innerText + `</label>
            </div>
            <i class="fa-sharp fa-solid fa-gear" onclick="popUpChangeTaskShow(this)"></i>
        </li>
    `
        pToModify.classList.remove("modify")
        cancelChangeTask();
    }
}

/* Afficher le nombre de tâches */
function showNumberOfTasks() {
    tasksNumber.innerHTML = `
    <div id="numberOfTasks">
    <h5 id="tasksLeft">` + tasksDone + ` tâches effectuées<span id="tasksCompleted"> | ` + tasksLeft + ` tâches restantes</span> </h5>
    </div>`
}
showNumberOfTasks()

/* Couleurs de tâches */

const yellow = document.getElementById("one");
const orange = document.getElementById("two");
const beige = document.getElementById("three");
const pink = document.getElementById("four");
const purple = document.getElementById("five");
const darkblue = document.getElementById("six");
const lightblue = document.getElementById("seven");
const green = document.getElementById("eight")

function yellowCircle() {
    yellow.classList.add("selected")
    yellow.classList.remove("notSelected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function orangeCircle() {
    orange.classList.add("selected")
    orange.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function beigeCircle() {
    beige.classList.add("selected")
    beige.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function pinkCircle() {
    pink.classList.add("selected")
    pink.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function purpleCircle() {
    purple.classList.add("selected")
    purple.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function darkblueCircle() {
    darkblue.classList.add("selected")
    darkblue.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function lightblueCircle() {
    lightblue.classList.add("selected")
    lightblue.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    green.classList.add("notSelected")
    green.classList.remove("selected")
}
function greenCircle() {
    green.classList.add("selected")
    green.classList.remove("notSelected")
    yellow.classList.add("notSelected")
    yellow.classList.remove("selected")
    orange.classList.add("notSelected")
    orange.classList.remove("selected")
    beige.classList.add("notSelected")
    beige.classList.remove("selected")
    pink.classList.add("notSelected")
    pink.classList.remove("selected")
    purple.classList.add("notSelected")
    purple.classList.remove("selected")
    darkblue.classList.add("notSelected")
    darkblue.classList.remove("selected")
    lightblue.classList.add("notSelected")
    lightblue.classList.remove("selected")
}

/* Polices d'écritures */

const poppins = document.getElementById("poppins");
const roboto = document.getElementById("roboto");
const mukta = document.getElementById("mukta");
const lobster = document.getElementById("lobster");

function poppinsFont() {
    poppins.classList.add("selectedFont");
    roboto.classList.remove("selectedFont");
    mukta.classList.remove("selectedFont");
    lobster.classList.remove("selectedFont");
}
function robotoFont() {
    roboto.classList.add("selectedFont");
    poppins.classList.remove("selectedFont");
    mukta.classList.remove("selectedFont");
    lobster.classList.remove("selectedFont");
}
function muktaFont() {
    mukta.classList.add("selectedFont");
    poppins.classList.remove("selectedFont");
    roboto.classList.remove("selectedFont");
    lobster.classList.remove("selectedFont");
}
function lobsterFont() {
    lobster.classList.add("selectedFont");
    poppins.classList.remove("selectedFont");
    roboto.classList.remove("selectedFont");
    mukta.classList.remove("selectedFont");
}