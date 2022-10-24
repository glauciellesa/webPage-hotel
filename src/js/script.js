const navList = document.querySelector(".nav_list")
const btnToggle = document.querySelector(".mobile_nav_toggle")

btnToggle.addEventListener("click", () => {
  const visibility = navList.getAttribute("data-visible")
  if (visibility === "false") {
    navList.setAttribute("data-visible", true)
    btnToggle.setAttribute("aria-expanded", true)
  } else {
    navList.setAttribute("data-visible", false)
    btnToggle.setAttribute("aria-expanded", false)
  }
})
