let telegramApp = window.Telegram.WebApp; // Получаем объект window.Telegram.WebApp Телеграмма

// Функция для обновления данных пользователя
function updateUserData() {
  let userCard = document.getElementById("usercard");
  let userData = telegramApp.initDataUnsafe.user;

  // Создаем элементы для отображения данных пользователя
  let fullName = document.createElement('p');
  fullName.innerText = `${userData.first_name} ${userData.last_name}`;
  userCard.appendChild(fullName);

  let userId = document.createElement('p');
  userId.innerText = `User ID: ${userData.id}`;
  userCard.appendChild(userId);

  let username = document.createElement('p');
  username.innerText = `Username: ${userData.username}`;
  userCard.appendChild(username);

  let avatar = document.createElement('img');
  avatar.src = userData.photo_url;
  avatar.alt = "User Avatar";
  avatar.id = "avatar";
  userCard.appendChild(avatar);

  // Отправляем данные пользователя на сервер
  addUserToServer(userData);
}

// Обновляем данные пользователя при загрузке страницы
updateUserData();

// Добавляем обработчик события для кнопки увеличения баланса
let incrementButton = document.getElementById("incrementButton");
incrementButton.addEventListener('click', function(){
  let balanceElement = document.getElementById("balance");
  let currentBalance = parseInt(balanceElement.innerText.split(": ")[1]);
  balanceElement.innerText = `Balance: ${currentBalance + 1}`;
});

// Функция для отправки данных пользователя на сервер
function addUserToServer(userData) {
  fetch('http://62.217.182.104:80/adduser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullname: `${userData.first_name} ${userData.last_name}`,
      username: userData.username,
      user_id: userData.id,
      balance: 0
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных на сервер');
    }
    console.log('Данные успешно отправлены на сервер');
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });
}
