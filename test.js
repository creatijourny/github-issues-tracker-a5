let currentTab = 'all';
const tabActive = ["bg-blue-600", "text-white"];
const tabInactive = ["bg-transparent", "border-gray-400", "text-black"];

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectContainer = document.getElementById("reject-container");
const emptyState = document.getElementById("empty-state");

function switchTab (tab){
    const tabs = ["all", "interview", "rejected"];
    currentTab = tab;
    for(const t of tabs){
        const tabName = document.getElementById("tab-" + t);
        if(t === tab){
            
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }else{
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }

    const pages = [allContainer, interviewContainer, rejectContainer];

    for(const section of pages){
        section.classList.add("hidden");
    }

    emptyState.classList.add("hidden");

    if(tab == "all") {
        allContainer.classList.remove("hidden");
        if(allContainer.children.length < 1){
            emptyState.classList.remove("hidden");
        }
    } else if(tab == "interview"){
        interviewContainer.classList.remove("hidden");
        if(interviewContainer.children.length < 1){
            emptyState.classList.remove("hidden");
        }
    } else{
        rejectContainer.classList.remove("hidden");
        if(rejectContainer.children.length < 1){
            emptyState.classList.remove("hidden");
        }
    }
    updateCount();
}

// count update
const totalCount = document.getElementById("total-count")
const interviewCount = document.getElementById("interview-count")
const rejectCount = document.getElementById("reject-count")
const availableCount = document.getElementById("available");

// totalCount.innerText = allContainer.children.length;

switchTab(currentTab);

document.getElementById("jobs-container").addEventListener('click',
    function(event){
    const clickedElement = event.target;
    const card = clickedElement.closest(".card");
    const parent = card.parentNode;
    const status = card.querySelector(".status");
    // console.log(card);

    if(clickedElement.classList.contains("interview-btn")){
        status.innerText = "Interview";
        interviewContainer.appendChild(card);
        }    
    if(clickedElement.classList.contains("rejected-btn")){
        status.innerText = "Rejected";
        rejectContainer.appendChild(card);
        }
    if(clickedElement.classList.contains("delete-btn")){
        parent.removeChild(card);
    }
    updateCount();
});

function updateCount(){
    const counts = {
        all: allContainer.children.length,
        interview: interviewContainer.children.length,
        rejected: rejectContainer.children.length
    }
    
    totalCount.innerText = counts["all"];
    interviewCount.innerText = counts["interview"];
    rejectCount.innerText = counts["rejected"];

    availableCount.innerText = counts[currentTab];

    if(counts[currentTab] < 1){
        emptyState.classList.remove("hidden");
    }else{
        emptyState.classList.add("hidden");
    }

   
}
updateCount();

// to show available jobs irrespective of tabs
/* function updateCount(){
    const totalLen = allContainer.children.length;
    const interviewLen = interviewContainer.children.length;
    const rejectLen = rejectContainer.children.length;
    const totalNumJobs = totalLen + interviewLen + rejectLen;
    totalCount.innerText = totalNumJobs;
    interviewCount.innerText = interviewLen;
    rejectCount.innerText = rejectLen;

    availableCount.innerText = `${Number(totalNumJobs) - Number(interviewLen) - Number(rejectLen)}
    of ${Number(totalLen) + Number(interviewLen) + Number(rejectLen)} jobs`;
}
updateCount(); */