document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const importButton = document.querySelector('.import-button');
    const projectModal = document.getElementById('projectModal');
    const projectNameInput = document.getElementById('projectName');
    const platformSelect = document.getElementById('platformSelect');
    const submitProjectButton = document.getElementById('submitProject');
    const projectList = document.getElementById('projectList');

    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            const projectIcon = document.createElement('img');
            projectIcon.classList.add('project-icon');
            projectIcon.src = project.platform === 'Android' 
                ? 'PJIcon/IconAndroidProject.svg' 
                : project.platform === 'iOS' 
                ? 'PJIcon/IPAIconProjects.png' 
                : project.platform === 'Windows'
                ? 'PJIcon/EXEIconProjects.png'  // Иконка для Windows
                : project.platform === 'MacOS'
                ? 'PJIcon/ICNSIconProjects.png'  // Иконка для MacOS
                : 'PJIcon/IPAIconProjects.png'; // Иконка по умолчанию для других платформ
            projectIcon.alt = 'Project Icon';
            projectIcon.style.width = '50px';  // Уменьшенная ширина
            projectIcon.style.height = '50px'; // Уменьшенная высота

            const projectButton = document.createElement('button');
            projectButton.classList.add('project-button');
            projectButton.textContent = project.name;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮';

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                showProjectMenu(event, index);
            });

            projectButton.addEventListener('click', () => {
                openProject(project.name);
            });

            projectContainer.appendChild(projectIcon);
            projectContainer.appendChild(projectButton);
            projectContainer.appendChild(menuButton);
            projectList.appendChild(projectContainer);
        });
    }

    function showProjectMenu(event, index) {
        const existingMenu = document.querySelector('.project-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.classList.add('project-menu');

        const openOption = document.createElement('button');
        openOption.classList.add('menu-option');
        openOption.textContent = 'Открыть проект';
        openOption.addEventListener('click', () => openProject(projects[index].name));

        const exportOption = document.createElement('button');
        exportOption.classList.add('menu-option');
        exportOption.textContent = 'Экспортировать проект';
        exportOption.addEventListener('click', () => exportProject(index));

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('menu-option');
        deleteOption.textContent = 'Удалить проект';
        deleteOption.addEventListener('click', () => confirmDeleteProject(index));

        menu.appendChild(openOption);
        menu.appendChild(exportOption);
        menu.appendChild(deleteOption);

        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        document.body.appendChild(menu);

        document.addEventListener('click', () => {
            menu.remove();
        }, { once: true });
    }

    function openProject(projectName) {
        window.location.href = `Editor/Editor.html?project=${encodeURIComponent(projectName)}`;
    }

    function exportProject(index) {
        const project = projects[index];
        console.log('Экспортируем проект:', project);
        // Добавьте код для экспорта проекта
    }

    function confirmDeleteProject(index) {
        if (confirm('Вы уверены, что хотите удалить этот проект?')) {
            deleteProject(index);
        }
    }

    function deleteProject(index) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }

    plusButton.addEventListener('click', () => {
        projectModal.style.display = 'flex';
    });

    submitProjectButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        const platform = platformSelect.value;

        if (projectName.length < 3 || projectName.length > 18) {
            alert('Название проекта должно содержать от 3 до 18 символов!');
            return;
        }

        if (projects.some(p => p.name === projectName)) {
            alert('Проект с таким названием уже существует!');
            return;
        }

        projects.push({ name: projectName, platform }); // Добавляем платформу
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        projectNameInput.value = '';
        projectModal.style.display = 'none';
    });

    importButton.addEventListener('click', () => {
        console.log('Импорт проекта');
        // Добавьте код для импорта проекта
    });

    renderProjects();
});
