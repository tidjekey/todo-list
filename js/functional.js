export const generateRandomId = () => {
    return (new Date()).getTime();
}

export const countTasksInCategory = (categoryId) => {
    console.log('yeas');
    const category = document.querySelector(`#category-${categoryId}`)
    console.log(`#category-${categoryId}`);
    let counter = category.querySelectorAll('#task').length
    console.log(category);
    console.log(counter);
    category.querySelector('#counter').textContent = counter;
}

export const countTasks = () => {
    let lists = document.querySelectorAll('details');

    lists.forEach((el) => {
        let counter = el.querySelectorAll('li').length - 1
        el.querySelector('#counter').textContent = counter;
    })
}

export const addNewTask = (categoryId, taskText, isChecked) => {
    const taskPattern = `
        <li class="list__item" id="task">
            <label class="checkbox">
                <input class="checkbox__input" type="checkbox" ${isChecked ? "checked" : ""}>
                <span class="checkbox__custom"></span>
                <span class="checkbox__text">${taskText}</span>
            </label>
        </li>
    `

    document.querySelector(`#category-${categoryId}`).querySelector('#task-input')
        .insertAdjacentHTML('beforebegin', taskPattern)
}

export const addNewCategory = (categoryName) => {
    let id = generateRandomId()
    const categoryPattern = `
        <details class="details main__category" id="category-${id}">
            <summary class="summary main__category-title">
                <div>
                    <img class="summary__icon" src="assets/dir_icon.svg" onerror="this.style.visibility = 'hidden'">
                    <span class="main__category-name">${categoryName}</span>
                </div>
                <hr class="summary__hr">
                <span class="details__counter" id="counter"></span>
            </summary>
            <ul class="list">
                
                <li class="list__item" id="task-input">
                    <label class="checkbox">
                        <input class="checkbox__input" type="checkbox" disabled="disabled">
                        <span class="checkbox__custom"></span>
                        <input class="input" id="category-input-${id}" type="text" placeholder="Write a task..." autocomplete="off">
                    </label>
                </li>
            </ul>
        </details>
    `

    document.querySelector(`.main__inner`).insertAdjacentHTML('beforeend', categoryPattern)
    return id
}

export const saveCategories = () => {
    let categories = []

    document.querySelectorAll('.details').forEach((el) => {
        let category = {}
        category.categoryId = el.id.replace(/^\D+/g, '')
        category.categoryName = el.querySelector('.main__category-name').textContent
        category.tasks = []

        el.querySelectorAll('.list__item').forEach((item) => {
            if (item.id == 'task-input') return;
            category.tasks.push({
                task: item.querySelector('.checkbox__text').textContent,
                isChecked: item.querySelector('.checkbox__input').checked ? true : false
            })
        })
        categories.push(category)
    })
    localStorage.setItem('categories', JSON.stringify(categories))
}

export const loadCategories = () => {
    document.querySelectorAll('.details').forEach(e => e.remove());

    let categories = JSON.parse(localStorage.getItem('categories'))

    categories.forEach((el) => {

        const categoryPattern = `
        <details class="details main__category" id="category-${el.categoryId}">
            <summary class="summary main__category-title">
                <div>
                    <img class="summary__icon" src="assets/dir_icon.svg" onerror="this.style.visibility = 'hidden'">
                    <span class="main__category-name">${el.categoryName}</span>
                </div>
                <hr class="summary__hr">
                <span class="details__counter" id="counter"></span>
            </summary>
            <ul class="list">
                ${el.tasks.map((task) => {
                    return `
                            <li class="list__item">
                                <label class="checkbox">
                                    <input class="checkbox__input" type="checkbox" ${task.isChecked ? "checked" : ""}>
                                    <span class="checkbox__custom"></span>
                                    <span class="checkbox__text">${task.task}</span>
                                </label>
                            </li>`
                }).join('')}
                <li class="list__item" id="task-input">
                    <label class="checkbox">
                        <input class="checkbox__input" type="checkbox" disabled="disabled">
                        <span class="checkbox__custom"></span>
                        <input class="input" id="category-input-${el.categoryId}" type="text" placeholder="Write a task..." autocomplete="off">
                    </label>
                </li>
            </ul>
        </details>`

        document.querySelector('.main__inner').insertAdjacentHTML('beforeend', categoryPattern)
    })
}
