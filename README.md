ссылка на проект: https://crombex.nomorepartiessite.ru/

Чтобы запустить проект локально (без Docker compose), выполните следующие шаги:

1. Клонируйте репозиторий на свой локальный компьютер:
   ```bash
   git clone git@github.com:Crombex/film-react-nest.git
    ```

2. Перейдите в директорию проекта:
   ```bash
   cd film-react-nest
   ```

3. Установите зависимости для backend и frontend:
   выполните `npm i` в директории `backend` и `frontend`

4. Добавьте переменные окружения для backend и frontend:
   - Для backend создайте файл `.env` в директории `backend` и добавьте необходимые переменные окружения на основе файла `.env.example`.
   - Для frontend создайте файл `.env` в директории `frontend` и добавьте необходимые переменные окружения на основе файла `.env.example`.
   - Для Базы данных PostgreSQL создайте файл `.env` в корне проекта и добавьте необходимые переменные окружения на основе файла `.env.example` с блоком переменных для подключения к базе данных.

5. Запустите контейнер Docker для базы данных PostgreSQL:
   ```bash
   docker compose up -d postgres
   ```   

6. Запустите backend и frontend в режиме разработки:
    - Для backend:
      В директории `backend` выполните команду:
      ```bash
      npm run start:dev
      ```
    - Для frontend:
      В директории `frontend` выполните команду:
      ```bash
      npm run start
      ```
7. Откройте браузер и перейдите по адресу `http://localhost:5173` для доступа к frontend, а backend будет доступен по адресу `http://localhost:3000`.

Вариант с использованием Docker Compose:

1. Выполните шаги 1-3 из инструкции выше.

2. Создайте файл `.env` в корне проекта и добавьте необходимые переменные окружения на основе файла `.env.example` из корня проекта. В директории frontend также создайте файл `.env` и добавьте необходимые переменные окружения на основе файла `.env.example` из директории `frontend`.

3. Запустите все сервисы (backend, frontend и базу данных PostgreSQL) с помощью Docker Compose:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```
4. Откройте браузер и перейдите по адресу `http://localhost` для доступа к приложению. Доступ к бекенду будет работать через nginx, который проксирует запросы на backend.