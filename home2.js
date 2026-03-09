let allIssues = [];
let currentBtn = "all";
const btnActive = ["bg-[#4A00FF]", "border-none", "text-white"];
const btnInActive = ["bg-[#E4E4E7]", "border-none", "text-[#1F2937]"];


function switchBtn(btn){
    const buttons = ["all", "open", "closed"];

    for(const b of buttons){
        const btnName = document.getElementById("btn-" + b);
        if(b === btn){            
            btnName.classList.remove(...btnInActive);
            btnName.classList.add(...btnActive);
        }else{
            btnName.classList.remove(...btnActive);
            btnName.classList.add(...btnInActive);
        }
    }
}
switchBtn(currentBtn);



const allContainer = document.getElementById("card-container");
const openContainer = document.getElementById("open-container");
const closedContainer = document.getElementById("closed-container");


const loadingSpinner = document.getElementById("loading-spinner");


function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    allContainer.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

async function loadIssueCards () {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideLoading();
    allIssues = data.data;
    displayCards(allIssues);
}


// {
//     "id": 48,
//     "title": "Browser console shows warnings",
//     "description": "Multiple deprecation warnings appearing in browser console. Need to update deprecated code.",
//     "status": "open",
//     "labels": [
//         "bug"
//     ],
//     "priority": "low",
//     "author": "console_carol",
//     "assignee": "",
//     "createdAt": "2024-02-09T14:20:00Z",
//     "updatedAt": "2024-02-09T14:20:00Z"
// }

function displayCards (issues) {
    allContainer.innerHTML = "";
   issues.forEach((issue) => {  
    const card = document.createElement("div");
    card.className = "card bg-base-100 w-full shadow-sm border-t-4"
    

    if(issue.status == "open"){
        card.classList.add("border-t-[#00A96E]");
    }else if(issue.status == "closed"){
        card.classList.add("border-t-[#A855F7]");
    }

    card.innerHTML = `
        <div class="card-body cursor-pointer onclick="">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                        <div class="badge badge-secondary rounded-full align-top text-[#EF4444] bg-[#EF444420]">${issue.priority}</div>
                    </div>
                    <h2 class="card-title text-[#1F2937]">${issue.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
                    <div class="card-actions justify-start">
                        <div class="badge badge-outline rounded-full text-[#EF4444] bg-[#EF444420]"><i class="fa-solid fa-bug"></i> BUG</div>
                        <div class="badge badge-outline rounded-full text-[#D97706] bg-[#D9770620]"><i class="fa-solid fa-life-ring"></i> HELP WANTED</div>
                    </div>
                    <hr class="text-[#E4E4E7] w-full">
                    <p class="text-[#64748B]">${issue.author}</p>
                    <p class="text-[#64748B]">${issue.createdAt}</p>
                </div>
    `;
     allContainer.appendChild(card);
            
   })
   
   function filterIssues(mode){
    if(mode === "all"){
        return allIssues;
    }

    return allIssues.filter(issue => issue.status === mode);
}

document.getElementById("btn-all").addEventListener("click", () => {
    currentBtn = "all";
    switchBtn("all");
    displayCards(filterIssues("all"));
});

document.getElementById("btn-open").addEventListener("click", () => {
    currentBtn = "open";
    switchBtn("open");
    displayCards(filterIssues("open"));
});

document.getElementById("btn-closed").addEventListener("click", () => {
    currentBtn = "closed";
    switchBtn("closed");
    displayCards(filterIssues("closed"));
});
   

   
   let totalIssues = document.getElementById("count-issues");
   function calculateCount(){
       totalIssues.innerText = allContainer.children.length;
   }
   calculateCount();
   
}



loadIssueCards();

