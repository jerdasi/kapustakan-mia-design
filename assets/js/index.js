var grid = document.querySelector('.grid')
var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true
})

document.querySelectorAll('.grid-item').forEach(elemen => {
    let description = elemen.firstElementChild
    elemen.addEventListener('mouseenter', () => {
        description.classList.remove('border-4', 'border-emas-keraton')
        description.classList.add('shadow-mia-style')
        elemen.classList.add('scale-110')
        elemen.lastElementChild.classList.remove('hidden')
            // elemen.add('scale-110')
            // description.classList.remove('hidden')
            // description.classList.add('rounded-b-lg')
    })
    elemen.addEventListener('mouseleave', () => {
        description.classList.add('border-4', 'border-emas-keraton')
        description.classList.remove('shadow-mia-style')
        elemen.classList.remove('scale-110')
        elemen.lastElementChild.classList.add('hidden')
            // elemen.remove('scale-110')
            // elemen.lastElementChild.classList.add('hidden')
            // description.classList.remove('rounded-b-lg')
    })
})

// border - 4 hover: border - none hover: scale - 110 hover: shadow - mia - style hover: rounded - lg border - emas - keraton rounded - lg

document.querySelector(".default_option").addEventListener('click', function() {
    document.querySelector(".select_ul").classList.toggle("hidden")
})

document.querySelectorAll(".select_ul li").forEach(elemen => {
    elemen.addEventListener("click", function() {
        var currentSelect = elemen.innerHTML

        document.querySelector(".default_option li").innerHTML = currentSelect
        document.querySelector(".select_ul").classList.toggle("hidden")
    })
})