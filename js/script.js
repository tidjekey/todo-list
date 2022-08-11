import {
    countTasksInCategory,
    countTasks,
    addNewTask,
    saveCategories,
    loadCategories,
    addNewCategory
} from './functional.js'

if (localStorage.getItem('categories') === null) {
    saveCategories()
}

const mainInner = document.querySelector('.main__inner')

mainInner.addEventListener('click', (e) => {
    let targetClass = e.target.classList

    if (targetClass.contains('checkbox__input') || targetClass.contains('checkbox__custom')) {
        saveCategories()
    }
})

mainInner.addEventListener('keypress', async (e) => {
    let categoryId = await e.target.id.replace(/^\D+/g, '')
    let input = document.querySelector(`#category-input-${categoryId}`)
    let taskName = await input.value

    if (e.key === 'Enter' && taskName != '') {
        addNewTask(categoryId, taskName, false)
        countTasksInCategory(categoryId)
        input.value = ''
        saveCategories()
        console.log('yes');
    }
});

document.querySelector('#category-add-input').addEventListener('keypress', async (e) => {
    let categoryNameInput = document.querySelector('#category-add-input')
    let categoryName = categoryNameInput.value

    if (e.key === 'Enter' && categoryName != '') {
        let categoryId = addNewCategory(categoryName)
        countTasksInCategory(categoryId)
        categoryNameInput.value = ''
        saveCategories()
    }
})

loadCategories()
countTasks()