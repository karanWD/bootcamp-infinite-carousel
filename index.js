const getDom = (selector) => document.querySelector(selector)
const getAllDom = (selector) => document.querySelectorAll(selector)
const carousel = getDom(".carousel")
const items = getAllDom(".slide")
const nextBtn = getDom(".next-btn")
const prevBtn = getDom(".prev-btn")

const itemsLength = items.length

const lastItemClone = items[itemsLength - 1].cloneNode(true)
const firstItemClone = items[0].cloneNode(true)



const initialSize = 400
let currentIndex = 0
let offsetLeft = -400
let shiftable = true
let posX1, posX2, posFinal, posInitial

carousel.appendChild(firstItemClone);
carousel.insertBefore(lastItemClone, carousel.children[0])

const dragStart = (event) => {
    console.log("strt")
    e = event || window.event;
    e.preventDefault()
    posInitial = offsetLeft
    if (e.type === "touchstart") {
        posX1 = e.touches[0].clientX

    } else {
        posX1 = e.clientX
        document.onmouseup = dragEnd
        document.onmousemove = dragMove
    }
}
const dragMove = (e) => {
    if (e.type === "touchmove") {
        posX2 = posX1 - e.touches[0].clientX
        posX1 = e.touches[0].clientX
    } else {
        posX2 = posX1 - e.clientX
        posX1 = e.clientX
    }
    offsetLeft=offsetLeft - posX2
    carousel.style.transform = `translate(${offsetLeft}px,0)`
}
const dragEnd = () => {
    posFinal = offsetLeft;
    if (posFinal - posInitial < -100) {
        if (shiftable) {
            carousel.classList.add("transition")
            currentIndex++
            offsetLeft = -(currentIndex*initialSize) - initialSize
            carousel.style.transform = `translate(${offsetLeft}px,0)`
        }
    } else if (posFinal - posInitial > 100) {
        if (shiftable) {
            carousel.classList.add("transition")
            currentIndex--
            offsetLeft = -(currentIndex*initialSize) - initialSize
            carousel.style.transform = `translate(${offsetLeft}px,0)`
        }
    } else {
        carousel.style.transform = `translate(${-(currentIndex*initialSize) - initialSize}px,0)`
    }
    document.onmouseup = null;
    document.onmousemove = null;
}

carousel.addEventListener("touchstart", dragStart)
carousel.addEventListener("touchmove", dragMove)
carousel.addEventListener("touchend", dragEnd)

nextBtn.addEventListener("click", () => {
    if (shiftable) {
        carousel.classList.add("transition")
        currentIndex++
        offsetLeft = offsetLeft - initialSize
        carousel.style.transform = `translate(${offsetLeft}px,0)`
    }
    shiftable = false
})

prevBtn.addEventListener("click", () => {
    if (shiftable) {
        carousel.classList.add("transition")
        currentIndex--
        offsetLeft = offsetLeft + initialSize
        carousel.style.transform = `translate(${offsetLeft}px,0)`
    }
    shiftable = false
})

const checkIndex = () => {
    carousel.classList.remove("transition")
    if (currentIndex >= itemsLength) {
        currentIndex = 0
            offsetLeft = -400
        carousel.style.transform = `translate(${offsetLeft}px,0)`
    }
    if (currentIndex <= -1) {
        currentIndex = itemsLength - 1
        offsetLeft = -400 * (currentIndex + 1)
        carousel.style.transform = `translate(${offsetLeft}px,0)`
    }
    shiftable = true
}

carousel.addEventListener("transitionend", checkIndex)

