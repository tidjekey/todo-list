import {
    countTasksInCategory,
    countTasks,
    addNewTask,
    saveCategories,
    loadCategories,
    addNewCategory
} from './functional.js'

loadCategories()

document.querySelector('.main__inner').addEventListener('click', (e) => {
    let targetClass = e.target.classList
    if (targetClass.contains('checkbox__input') || targetClass.contains('checkbox__custom' )) {
        saveCategories()
    }
})

document.querySelector('.main__inner').addEventListener('keypress', async (e) => {
    let categoryId = await e.target.id.replace( /^\D+/g, '')
    let input =  document.querySelector(`#category-input-${categoryId}`)
    let taslName = await input.value

    if (e.key === 'Enter' && taslName != '') {
        addNewTask(categoryId, taslName, false)
        countTasksInCategory(categoryId)
        input.value = ''
        saveCategories()
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

saveCategories()
countTasks()