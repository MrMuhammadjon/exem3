
const main = document.querySelector('.main')
const LoaderContainer = document.querySelector('.loader-conatiner')
const searchInput = document.getElementById('searchInput')
const searchForm = document.getElementById('searchForm')
const showMoreBtn = document.querySelector('.show-more-btn')
let notFound = document.querySelector('.not-found')

let showMore = 20

AIPrender()

showMoreBtn.addEventListener('click', (e) => {
    e.preventDefault()
    showMore += 10
    console.log(showMore);
    AIPrender()
    notFound.style.display = 'none'
    searchInput.value = ''
})

async function AIPrender() {
    try {
        LoaderContainer.style.display = 'flex';
        const rerspons = await fetch(`https://randomuser.me/api/?results=${showMore}`)
        const data = await rerspons.json()
        RenderUsers(data.results)
        localStorage.setItem('users', JSON.stringify(data.results))



    } catch (error) {
        console.error(error)
    } finally {
        setTimeout(() => {
            LoaderContainer.style.opacity = '0'
            setTimeout(() => {
                LoaderContainer.style.display = 'none'

            }, 500)
        }, 700)
    }
}

function RenderUsers(params) {
    main.innerHTML = ''
    params.forEach(element => {
        const userCard = document.createElement('div')
        const userImg = document.createElement('img')
        const userNmae = document.createElement('h1')
        const userEmail = document.createElement('p')
        const userCountry = document.createElement('p')
        const userSaveBtn = document.createElement('button')

        userCard.className = 'user-card'
        userImg.src = element.picture.large
        userNmae.className = 'user-name'
        userNmae.textContent = element.name.first
        userEmail.className = 'user-email'
        userEmail.textContent = element.email
        userCountry.textContent = element.location.country
        userSaveBtn.className = 'saveBtn'
        userSaveBtn.textContent = 'save'
        userSaveBtn.addEventListener('click', () => saveMOdal(element))

        userCard.appendChild(userImg)
        userCard.appendChild(userNmae)
        userCard.appendChild(userEmail)
        userCard.appendChild(userCountry)
        userCard.appendChild(userSaveBtn)
        main.appendChild(userCard)
    });
}

searchForm.addEventListener('input', async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        const JSONuser = JSON.parse(localStorage.getItem('users')) || []
        RenderUsers(JSONuser)
    }



    try {
        const JSONuser = JSON.parse(localStorage.getItem('users')) || []

        const filterJson = JSONuser.filter(user => {
            const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
            return fullName.includes(query);
        })

        RenderUsers(filterJson)

        if (filterJson.length === 0) {
            notFound.style.display = 'flex';
        } else {
            notFound.style.display = 'none';
        }

    } catch (error) {
        console.error(error)
    }
    finally {
        setTimeout(() => {
            LoaderContainer.style.opacity = '0';
            setTimeout(() => {
                LoaderContainer.style.display = 'none';
            }, 500);
        }, 700);
    }
});

const categor = document.querySelector('.categor')

categor.addEventListener('click', async () => {

    const categorValue = categor.value
    const JSONuserCate = JSON.parse(localStorage.getItem('users')) || []
    console.log(JSONuserCate);


    if (categorValue === 'all') {
        RenderUsers(JSONuserCate)
        return;
    }

    try {

        const filteredUsers = JSONuserCate.filter(user => user.gender === categorValue);
        RenderUsers(filteredUsers)
    } catch (error) {
        console.error(error)
    }
})

const saveUsers = []

let saveMain = document.querySelector('.save-main')

function saveMOdal(params) {
    saveUsers.push(params)
    localStorage.setItem('saveUser', JSON.stringify(saveUsers))
    RenderSaveUser()
}

function RenderSaveUser() {
    const LocalSaveUser = JSON.parse(localStorage.getItem('saveUser')) || []
    saveMain.innerHTML = ""
    LocalSaveUser.forEach((element) => {
        const userCard = document.createElement('div')
        const userImg = document.createElement('img')
        const userNmae = document.createElement('h1')
        const userEmail = document.createElement('p')
        const userCountry = document.createElement('p')

        userCard.className = 'user-card'
        userImg.src = element.picture.large
        userNmae.className = 'user-name'
        userNmae.textContent = element.name.first
        userEmail.className = 'user-email'
        userEmail.textContent = element.email
        userCountry.textContent = element.location.country

        userCard.appendChild(userImg)
        userCard.appendChild(userNmae)
        userCard.appendChild(userEmail)
        userCard.appendChild(userCountry)
        saveMain.appendChild(userCard)
    })
}

RenderSaveUser()