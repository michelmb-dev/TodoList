const form = document.querySelector("#task-form")
const listCards = document.querySelector("#tasks-list")
const filter = document.querySelector("#tasks-filter")

let tasks = []
const task = {
	title: null,
	checked: false,
}

/**
 * Save task in local storage
 *
 * @param {Object} value
 */
const saveLocalTasks = (value) => {
	if (localStorage.getItem("tasks") === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	tasks.push(value)
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

/**
 * Create HTML with class
 * @param {string} el Name of element html(Ex: div, ul , span ...)
 * @param {string} classname
 * @returns {HTMLElement}
 */
const createElementWithClass = (el, classname) => {
	let elementHTML = document.createElement(el)
	elementHTML.setAttribute("class", classname)
	return elementHTML
}

/**
 * Create task card
 *
 * @param {String} value
 * @param {Boolean} checked
 */
const taskCard = (value, checked) => {
	const taskCard = createElementWithClass("div", "task__card")
	const taskContent = createElementWithClass("div", "task__content")
	taskCard.appendChild(taskContent)
	const taskTitle = createElementWithClass("h3", "task__title")
	taskTitle.textContent = value
	taskContent.appendChild(taskTitle)
	const taskActions = createElementWithClass("div", "actions")
	const taskActionCheck = createElementWithClass("button", "check")
	taskActionCheck.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
	const taskActionDelete = createElementWithClass("button", "delete")
	taskActionDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`

	taskActions.appendChild(taskActionCheck)
	taskActions.appendChild(taskActionDelete)
	taskCard.appendChild(taskActions)
	listCards.appendChild(taskCard)

	if (checked) {
		taskCard.classList.add("is-checked")
		taskActionCheck.classList.add("is-checked")
	}
}

/**
 * Get Tasks registred in local storage
 */
const getLocalTasks = () => {
	if (localStorage.getItem("tasks") === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	tasks.forEach(function (task) {
		taskCard(task.title, task.description, task.checked)
	})
}

/**
 * Remove Element in local storage
 *
 * @param {HTMLElement} value
 */
const removeLocalTask = (value) => {
	if (localStorage.getItem("tasks") === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	let taskValue = value.children[0].value
	tasks.splice(tasks.indexOf(taskValue), 1)
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

/**
 * Actions for check and delete buttons
 *
 * @param {Event} e
 */
const actionsButtons = (e) => {
	const btn = e.target
	const currentTask = btn.parentElement.parentElement
	if (btn.classList[0] === "delete") {
		removeLocalTask(currentTask)
		currentTask.remove()
	}
	if (btn.classList[0] === "check") {
		const T = currentTask.children[0].firstChild.innerText.toLowerCase()
		tasks.forEach((task) => {
			if (task.title === T && !task.checked) {
				task.checked = true
				currentTask.classList.toggle("is-checked")
				btn.classList.toggle("is-checked")
			} else if (task.title === T && task.checked) {
				task.checked = false
				currentTask.classList.toggle("is-checked")
				btn.classList.toggle("is-checked")
			}
		})
		localStorage.setItem("tasks", JSON.stringify(tasks))
	}
}

/**
 * Filter for all / checked / unchecked tasks
 *
 * @param {Event} e
 */
const filterTasks = (e) => {
	const items = listCards.childNodes
	items.forEach((item) => {
		switch (e.target.value) {
			case "all":
				item.classList.remove("is-hidden")
				break
			case "checked":
				if (item.classList.contains("is-checked")) {
					item.classList.remove("is-hidden")
				} else {
					item.classList.add("is-hidden")
				}
				break
			case "unchecked":
				if (item.classList.contains("is-checked")) {
					item.classList.add("is-hidden")
				} else {
					item.classList.remove("is-hidden")
				}
				break
		}
	})
}

/**
 *  Listeners
 */

form.addEventListener("submit", (e) => {
	e.preventDefault()
	if (!form.title.value) {
		alert("Please enter a value !!!")
		return
	}

	task.title = form.title.value.toLowerCase()

	saveLocalTasks(task)

	taskCard(task.title)

	form.title.value = ""
})

document.addEventListener("DOMContentLoaded", getLocalTasks)
listCards.addEventListener("click", actionsButtons)
filter.addEventListener("input", filterTasks)
