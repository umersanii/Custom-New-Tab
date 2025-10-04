let customLinks = []

// Default icon as a data URI (simple link/globe icon)
function getDefaultIcon() {
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4MWExYzEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGxpbmUgeDE9IjIiIHkxPSIxMiIgeDI9IjIyIiB5Mj0iMTIiPjwvbGluZT48cGF0aCBkPSJNMTIgMmExNSAxNSAwIDAgMSA0IDEwIDE1IDE1IDAgMCAxLTQgMTAgMTUgMTUgMCAwIDEtNC0xMCAxNSAxNSAwIDAgMSA0LTEweiI+PC9wYXRoPjwvc3ZnPg=='
}

function loadCustomLinks() {
  const container = document.querySelector(".dynamic-links-menu")

  const storedLinks = localStorage.getItem("customLinks")

  if (storedLinks) {
    customLinks = JSON.parse(storedLinks)
    renderLinks(container)
  } else {
    loadLinksFromFile("links.json")
  }
}

function renderLinks(container) {
  container.innerHTML = ""

  customLinks.forEach((link, index) => {
    const div = document.createElement("div")
    div.classList.add("link-item")

    const a = document.createElement("a")
    a.href = link.url
    a.target = "_blank"

    const img = document.createElement("img")
    
    // Set default icon immediately to prevent flickering
    img.src = getDefaultIcon()
    img.alt = link.name
    
    if (link.icon) {
      const iconSrc = link.icon.startsWith("http") ? link.icon : `Icons/${link.icon}`
      img.src = iconSrc
      img.onerror = () => {
        fetchFavicon(link.url, img)
      }
    } else {
      fetchFavicon(link.url, img)
    }
    
    a.appendChild(img)
    
    const nameSpan = document.createElement("span")
    nameSpan.textContent = link.name
    a.appendChild(nameSpan)

    const removeButton = document.createElement("span")
    removeButton.classList.add("remove-link")
    removeButton.setAttribute("data-index", index)
    removeButton.innerHTML = "×"

    div.appendChild(a)
    div.appendChild(removeButton)

    container.appendChild(div)
  })

  document.querySelectorAll(".remove-link").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index")
      removeCustomLink(index)
    })
  })
}

function fetchFavicon(url, imgElement) {
  try {
    let domain = url.replace(/^https?:\/\//, '')
    domain = domain.split('/')[0]
    
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    
    // Create a new image to test if the favicon loads
    const testImg = new Image()
    testImg.onload = () => {
      imgElement.src = googleFaviconUrl
    }
    testImg.onerror = () => {
      const directFaviconUrl = `https://${domain}/favicon.ico`
      const testImg2 = new Image()
      testImg2.onload = () => {
        imgElement.src = directFaviconUrl
      }
      testImg2.onerror = () => {
        // Keep the default icon if all else fails
      }
      testImg2.src = directFaviconUrl
    }
    testImg.src = googleFaviconUrl
  } catch (error) {
    console.error("Error fetching favicon:", error)
    // Keep the default icon on error
  }
}

function removeCustomLink(index) {
  customLinks.splice(index, 1)
  saveLinks()
  renderLinks(document.querySelector(".dynamic-links-menu"))
}

function saveLinks() {
  localStorage.setItem("customLinks", JSON.stringify(customLinks))
}

function addCustomLink(url, name, icon) {
  if (!url || !name) return false

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url
  }

  const newLink = {
    url: url,
    name: name,
    icon: icon || "",
  }

  customLinks.push(newLink)
  saveLinks()
  renderLinks(document.querySelector(".dynamic-links-menu"))
  return true
}

function loadLinksFromFile(file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      if (Array.isArray(data)) {
        customLinks = data
        saveLinks()
        renderLinks(document.querySelector(".dynamic-links-menu"))
      }
    })
    .catch((error) => {
      console.error("Error loading links file:", error)
      customLinks = []
      renderLinks(document.querySelector(".dynamic-links-menu"))
    })
}

function exportLinksToFile() {
  const dataStr = JSON.stringify(customLinks, null, 2)
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

  const exportFileDefaultName = "links.json"

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()
}

function importLinksFromFile(fileInput) {
  const file = fileInput.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      if (Array.isArray(data)) {
        customLinks = data
        saveLinks()
        renderLinks(document.querySelector(".dynamic-links-menu"))

        document.getElementById("file-name").textContent = file.name
      } else {
        alert("Invalid file format. Expected an array of links.")
      }
    } catch (error) {
      alert("Error parsing file: " + error.message)
    }
  }
  reader.readAsText(file)
}

window.addEventListener("DOMContentLoaded", () => {
  loadCustomLinks()

  document.getElementById("open-link-form").addEventListener("click", () => {
    document.getElementById("link-form-popup").style.display = "block"
  })

  document.getElementById("close-link-form").addEventListener("click", () => {
    document.getElementById("link-form-popup").style.display = "none"
  })

  document.getElementById("add-custom-link").addEventListener("click", () => {
    const url = document.getElementById("custom-link-url").value.trim()
    const name = document.getElementById("custom-link-name").value.trim()
    const icon = document.getElementById("custom-link-icon").value.trim()

    if (addCustomLink(url, name, icon)) {
      document.getElementById("custom-link-url").value = ""
      document.getElementById("custom-link-name").value = ""
      document.getElementById("custom-link-icon").value = ""
      document.getElementById("link-form-popup").style.display = "none"
    } else {
      alert("Please fill in both URL and name fields.")
    }
  })

  document.getElementById("export-links").addEventListener("click", exportLinksToFile)

  document.getElementById("import-file").addEventListener("change", function () {
    importLinksFromFile(this)
  })
})
