let globalData = []
let filteredData = []
let searchValue = ""
let filterValue = "all"
var grid = document.querySelector(".gallery-container")
let loader = document.querySelector(".loader-container")
let toolsWebVersion = document.querySelector(".tools")
let toolsMobileVersion = document.querySelector(".nav-mobile")
let pagination = document.querySelector(".pagination-container")
let infoPagination = document.querySelector(".info-pagination")
let openMobileNav = document.querySelector(".open-nav")
let closeMobileNav = document.querySelector(".close-nav")

// Return HTML For Build Card
const buildCardGallery = (src, nama) => {
    return `
    <img src="${src}" alt="gallery-item" class="picture-style"/>
    <div class="item-description absolute w-full bottom-0 block md:hidden">
        <div class="bg-emas-keraton text-white font-bold h-full py-2 rounded-b-lg">
            <h1 class="text-lg text-center cursor-pointer"><a href="./details-collection.html">${nama.toUpperCase()}</h1></a>
        </div>
    </div>
    `
}

// Pagination Function To-Left
const toLeft = () => {
    let active = document.querySelector(".pagination-container li.active")
    if (active.innerText > 1) {
        if (active.previousSibling.innerText == 1) {
            active.previousSibling.previousSibling.classList.add("cursor-not-allowed")
        } else {
            document.querySelector(".to-right").classList.remove("cursor-not-allowed")
        }
        active.classList.toggle("active")
        active.previousSibling.classList.add("active")
        let result = paginationBuild(parseInt(active.innerText) - 1, [...filteredData])
        appendToContainer(result)
    } else {
        document.querySelector(".to-left").classList.remove("cursor-not-allowed")
    }
}

// Pagination Function To-Right
const toRight = () => {
    let active = document.querySelector(".pagination-container li.active")
    let banyak = document.querySelectorAll(".pagination-container li").length
    if (active.innerText < banyak - 2) {
        if (active.nextSibling.innerText == banyak - 2) {
            active.nextSibling.nextSibling.classList.add("cursor-not-allowed")
        } else {
            document.querySelector(".to-left").classList.remove("cursor-not-allowed")
        }
        active.classList.toggle("active")
        active.nextSibling.classList.add("active")
        let result = paginationBuild(parseInt(active.innerText) + 1, [...filteredData])
        appendToContainer(result)
    } else {
        document.querySelector(".to-right").classList.remove("cursor-not-allowed")
    }
}

// Iniatilize Page Number For Pagination Based On Data Length
const initPageNumber = (total) => {
    let menu = document.createElement("ul")
    menu.classList.add("flex", "bg-white", "shadow")
    let list = document.createElement("li")
    menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-left cursor-not-allowed" onclick="toLeft()"><i class="fa-solid fa-angle-left"></i></li>`)
    let batasAkhir = Math.ceil(total / 10)
    for (let i = 1; i <= batasAkhir; i++) {
        let list = document.createElement("li")

        // Event Listener
        list.addEventListener("click", function() {
            let parent = this.parentNode.childNodes
            let onPage = this.innerText
            if (!this.classList.contains("active")) {
                if (onPage == batasAkhir || onPage == 1) {
                    if (onPage == 1) {
                        document.querySelector(".to-right").classList.remove("cursor-not-allowed")
                        this.previousSibling.classList.add("cursor-not-allowed")
                    } else {
                        document.querySelector(".to-left").classList.remove("cursor-not-allowed")
                        this.nextSibling.classList.add("cursor-not-allowed")
                    }
                } else {
                    document.querySelector(".to-left").classList.remove("cursor-not-allowed")
                    document.querySelector(".to-right").classList.remove("cursor-not-allowed")
                }

                parent.forEach(element => {
                    element.classList.remove("active")
                })
                this.classList.add("active")
                let result = paginationBuild(onPage, [...filteredData])
                appendToContainer(result)
            }
        })

        list.innerText = i

        i == 1 ? list.classList.add("px-3", "py-2", "active") : list.classList.add("px-3", "py-2")
        menu.insertAdjacentElement("beforeend", list)
    }
    batasAkhir == 1 ? menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-right cursor-not-allowed" onclick="toRight()"><i class="fa-solid fa-angle-right"></i></li>`) : menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-right" onclick="toRight()"><i class="fa-solid fa-angle-right"></i></li>`)
    return menu
}

// Insert to Container
const appendToContainer = (data) => {
    window.scrollTo(0, 0)
    loader.classList.remove("hidden")
    grid.classList.add("opacity-0")
    var elems = []
    var fragment = document.createDocumentFragment()
    // Iniatilize New Gallery
    document.querySelectorAll(".grid-item").forEach(element => element.remove())

    for (let i = 0; i < data.length; i++) {
        let elem = document.createElement('div')
        elem.classList.add("grid-item", "relative", "column-1", "sm:column-2", "md:column-3", "lg:column-4", "hover:md:z-50")
        elem.innerHTML = buildCardGallery(data[i].url, data[i].nama)
        elem.addEventListener("click", () => {
            window.location.href = "./details-collection.html"
        })
        fragment.appendChild(elem)
        elems.push(elem)
    }
    grid.appendChild(fragment)

    // Membentuk Layout setelah beberapa detik
    setTimeout(function() {
        var msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            percentPosition: true
        })
        initializeHover()
        loader.classList.add("hidden")
        grid.classList.remove("opacity-0")
    }, 500)
}

// To Fetch Data
fetch('./_data/gamelan.json').then(response => {
    return response.json()
}).then(data => {
    let result = paginationBuild(1, data)
    appendToContainer(result)
    globalData = [...data]
    filteredData = [...data]
    let pagination = document.querySelector(".pagination-container")
    pagination.appendChild(initPageNumber(data.length))
})

// Iniatialize Hover in Card
const initializeHover = () => {
    document.querySelectorAll('.grid-item').forEach(elemen => {
        let description = elemen.firstElementChild
        elemen.addEventListener('mouseenter', () => {
            description.classList.add('md:border-0', 'md:border-emas-keraton')
            description.classList.add('md:shadow-mia-style')
            elemen.classList.add('md:scale-110')
            elemen.lastElementChild.classList.remove('md:hidden')
        })
        elemen.addEventListener('mouseleave', () => {
            description.classList.remove('md:border-0', 'md:border-emas-keraton')
            description.classList.remove('md:shadow-mia-style')
            elemen.classList.remove('md:scale-110')
            elemen.lastElementChild.classList.add('md:hidden')
        })
    })
}

// Filter Collection By Tipe
const filterKategori = (tipe, data) => {
    let result = [...data]
    if (tipe == "all") {
        return result
    } else if (tipe == "hageng") {
        return result.filter(elemen => elemen.jenis == "hageng")
    } else if (tipe == "pakurmatan") {
        return result.filter(elemen => elemen.jenis == "pakurmatan")
    }
}
// const filterKategori = (tipe) => {
//     if (tipe == "all") {
//         filteredData = [...globalData]
//     } else if (tipe == "hageng") {
//         let result = [...globalData]
//         filteredData = result.filter(elemen => elemen.jenis == "hageng")
//     } else if (tipe == "pakurmatan") {
//         let result = [...globalData]
//         filteredData = result.filter(elemen => elemen.jenis == "pakurmatan")
//     }
// }

// SelectBox Option
let parentSelectBox = toolsWebVersion.querySelector(".select_ul")
parentSelectBox.querySelectorAll(".option").forEach(elemen => {
    elemen.parentElement.addEventListener("click", function() {
        let optionClass = Array.from(elemen.classList) //Mengubah nama nama kelas di elemen ini menjadi Array
        filterValue = optionClass.pop() //Mendapatkan tipe dengan mengambil nama kelas terakhir
        // filterKategori(tipe)
        // let result = paginationBuild(1, filteredData)
        // console.log(filteredData)
        // appendToContainer(result)
        // let pagination = document.querySelector(".pagination-container")
        // pagination.replaceChild(initPageNumber(filteredData.length), pagination.firstElementChild)
    })
})

// Web Version
toolsWebVersion.querySelector("button").addEventListener("click", function() {
    let searchBarValue = toolsWebVersion.querySelector(".search-bar").value
    let result = searchCollection(searchBarValue, [...globalData])
    result = filterKategori(filterValue, result)
    infoPagination.innerText = `${searchBarValue == ""? "": `${searchBarValue} dari `} ${filterValue == "all"? "semua kategori": `kategori ${filterValue}`}`
    console.log(result)
    appendToContainer(result)
    pagination.replaceChild(initPageNumber(result.length), pagination.firstElementChild)
})

// searchBarWebsite.addEventListener("focusin", (event) => {
//     let sibling = event.target.nextElementSibling
//     event.target.parentElement.classList.remove("pr-4")
//     sibling.classList.add("w-1/3", "bg-hijau-keraton", "px-2", "text-white", "flex-row-reverse")
//     sibling.addEventListener("click", () => {
//         searchFilter(event.target.value)
//         event.target.parentElement.classList.add("pr-4")
//         sibling.classList.remove("w-1/3", "bg-hijau-keraton", "px-2", "text-white", "flex-row-reverse")
//     })
// })


openMobileNav.addEventListener("click", function() {
    toolsMobileVersion.classList.remove("animate__animated", "animate__bounceOutRight", "hidden")
    toolsMobileVersion.classList.add("animate__animated", "animate__bounceInRight")
    setTimeout(() => {
        toolsMobileVersion.classList.add("bg-black", "bg-opacity-75")
    }, 1000)
})
closeMobileNav.addEventListener("click", function() {
    toolsMobileVersion.classList.remove("bg-black", "bg-opacity-75")
    setTimeout(() => {
        toolsMobileVersion.classList.remove("animate__animated", "animate__bounceInRight")
        toolsMobileVersion.classList.add("animate__animated", "animate__bounceOutRight")
        setTimeout(() => {
            toolsMobileVersion.classList.add("hidden")
        }, 300)
    }, 500)
})




const searchCollection = (key, data) => {
    let result = key == ""? [...data] : [...data].filter(element => element.nama.toLowerCase().includes(key.toString().toLowerCase()))
    // filteredData = key == "" ? [...filteredData] : [...filteredData].filter(element => element.nama.toLowerCase().includes(key.toLowerCase()))
    return result
}

// Function Search Collection
// const searchFilter = (key) => {
//     // grid.classList.add("opacity-0")
//     // document.querySelector(".loader-container").classList.add("hidden")
//     searchCollection(key); 
//     appendToContainer([...filteredData])
//     let pagination = document.querySelector(".pagination-container")
//     pagination.replaceChild(initPageNumber(filteredData.length), pagination.firstElementChild)
// }

// Mobile Version
const applyFilter = (node) => {
    let searchValue = toolsMobileVersion.querySelector(".search-bar").value
    let filterValue = toolsMobileVersion.querySelector(".option:checked").id
    // console.log(optionSelected)
    let result = searchCollection(searchValue, [...globalData])
    result = filterKategori(filterValue, result)
    infoPagination.innerText = `${searchValue == ""? "": `${searchValue} dari `} ${filterValue == "all"? "semua kategori": `kategori ${filterValue}`}`
    console.log(result)
    appendToContainer(result)
    pagination.replaceChild(initPageNumber(result.length), pagination.firstElementChild)
    closeMobileNav.click()

    // filterKategori(optionSelectedMobile)
    // search(searchValue.value)
    // appendToContainer([...filteredData])
    // let pagination = document.querySelector(".pagination-container")
    // pagination.replaceChild(initPageNumber(filteredData.length), pagination.firstElementChild)
    // document.querySelector(".nav-mobile").classList.remove("bg-black", "bg-opacity-75")
    // searchBarWebsite.value = searchValue.value
    // setTimeout(() => {
    //         document.querySelector(".nav-mobile").classList.remove("animate__animated", "animate__bounceInRight")
    //         document.querySelector(".nav-mobile").classList.add("animate__animated", "animate__bounceOutRight")
    //     }, 500)
        // let result = search(searchValue)
        // result = result.filter(element => element.jenis == optionSelectedMobile)
        // appendToContainer(result)
        // let pagination = document.querySelector(".pagination-container")
        // pagination.replaceChild(initPageNumber(result.length), pagination.firstElementChild)
}