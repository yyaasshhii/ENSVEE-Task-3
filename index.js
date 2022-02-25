 let sortBy = ["price", "delivery", "starRating", "name"]
 let starRating = ["fiveStar", "fourStar", "threeStar", "twoStar", "oneStar"]
 let shoeRating = ["fiveStarRating", "fourStarRating", "threeStarRating", "twoStarRating", "oneStarRating"]


 let sortSelector = 4
 let sortTick = "Sort by &nbsp"
 let sortId = ""

 

function core() {
    for(i=0; i< starRating.length; i++) {
        document.getElementById(starRating[i]).style.display = "none";
    }
    document.getElementById("all").style.display = "block";

    for(i=0; i< sortBy.length; i++) {
        document.getElementById(sortBy[i]).style.display = "none";
    }

    count = 0
    for (i=0; i<shoeRating.length; i++) {
        let elementList = document.getElementsByClassName(shoeRating[i]);
        for(j=0; j<elementList.length; j++) {
            count++
        }
    }
    document.getElementById("totalProducts").innerHTML = count;
}

function rating(btnText, className) {

    sortText = btnText
    sortName = className
    
    document.getElementById("filterRating").innerHTML = btnText;

    for(i=0; i< shoeRating.length; i++) {
        document.getElementById("all").style.display = "none";
        if(className == shoeRating[i]) {
            document.getElementById(starRating[i]).style.display = "block";
        }
        else {
            document.getElementById(starRating[i]).style.display = "none";
        }
    }

    count = 0

    for (i=0; i<shoeRating.length; i++) {
        if(shoeRating[i] == className){
            let visibleElementList = document.getElementsByClassName(shoeRating[i]);
            for(j=0; j<visibleElementList.length; j++) {
                visibleElementList[j].style.display = "flex"
                count++
            }
            continue
        }
        let elementList = document.getElementsByClassName(shoeRating[i]);
        for(j=0; j<elementList.length; j++) {
            elementList[j].style.display = "none"
        }
    }

    if(className == '') {
        document.getElementById("all").style.display = "block";
        for (i=0; i<shoeRating.length; i++) {
            document.getElementById(starRating[i]).style.display = "none";
            let elementList = document.getElementsByClassName(shoeRating[i]);
            for(j=0; j<elementList.length; j++) {
                elementList[j].style.display = "flex"
                count++
            }
        }
    }
    document.getElementById("totalProducts").innerHTML = count;

    sort(sortSelector, sortTick)
}

function sort(countSr, btnTick, btnId) {
    sortSelector = countSr
    sortTick = btnTick
    sortId = btnId

    document.getElementById("sortRating").innerHTML = btnTick
    for(i=0; i<sortBy.length; i++) {
        if(sortBy[i] == btnId) {
            document.getElementById(sortBy[i]).style.display = "block"
        }
        else {
            document.getElementById(sortBy[i]).style.display = "none"
        }
    }

    let shoeList = document.getElementsByClassName("shoeData")
    let finalShoe = []

    for(y=0; y<shoeList.length; y++) {
        if(window.getComputedStyle(shoeList[y]).display == "flex") {
            finalShoe.push(shoeList[y])
        }
    }

    let image = ""
    let nameAndrating = ""
    let price = ""
    let delivery = ""

    function swapData() {
        image = finalShoe[m].children[0].outerHTML
        finalShoe[m].children[0].outerHTML = finalShoe[n].children[0].outerHTML
        finalShoe[n].children[0].outerHTML = image

        nameAndrating = finalShoe[m].children[2].outerHTML
        finalShoe[m].children[2].outerHTML = finalShoe[n].children[2].outerHTML
        finalShoe[n].children[2].outerHTML = nameAndrating

        price = finalShoe[m].children[3].outerHTML
        finalShoe[m].children[3].outerHTML = finalShoe[n].children[3].outerHTML
        finalShoe[n].children[3].outerHTML = price

        delivery = finalShoe[m].children[4].outerHTML
        finalShoe[m].children[4].outerHTML = finalShoe[n].children[4].outerHTML
        finalShoe[n].children[4].outerHTML = delivery
    }

    if(countSr == 0) {
        for(m=0; m<finalShoe.length; m++) {
            for(n=0; n<finalShoe.length; n++) {
                if(Number.parseInt(finalShoe[m].children[3].outerHTML.split("₹ ")[1]) > Number.parseInt(finalShoe[n].children[3].outerHTML.split("₹ ")[1])) {
                    swapData()
                }
            }
        }
    }

    else if(countSr == 1) {
        for(m=0; m<finalShoe.length; m++) {
            for(n=0; n<finalShoe.length; n++) {
                if(new Date(finalShoe[m].children[4].outerHTML.split(": ")[1].slice(5,6)) < new Date(finalShoe[n].children[4].outerHTML.split(": ")[1].slice(5,6))) {
                    swapData()
                }
            }
        }
    }
    
    else if(countSr == 2) {
        for(m=0; m<finalShoe.length; m++) {
            for(n=0; n<finalShoe.length; n++) {
                if(finalShoe[m].children[2].children[1].outerHTML > finalShoe[n].children[2].children[1].outerHTML) {
                    swapData()
                }
            }
        }
    }

    else if(countSr == 3) {
        for(m=0; m<finalShoe.length; m++) {
            for(n=0; n<finalShoe.length; n++) {
                if(finalShoe[m].children[2].children[0].outerHTML < finalShoe[n].children[2].children[0].outerHTML) {
                    swapData()
                }
            }
        }
    }
}