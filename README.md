# План React-копии TikTalk

Копия текущего Angular + Nx приложения на React. Новый репозиторий рядом, этот не переписывать.

Цели: одно SPA (не монорепо), актуальный стек 2026, те же домены, API, стили и ассеты.

---

## 1. Почему не Nx

У приложения одна точка входа. Nx-либы здесь — учебная нарезка, не несколько деплоев. Современный стандарт для такого SPA: **один Vite-проект** и слои внутри `src/`.

---

## 2. Стек

| Задача | Инструмент |
|---|---|
| Сборка | Vite + React 19 + TypeScript |
| Монорепо | не нужен |
| Маршруты, layout, guard | TanStack Router |
| HTTP, JWT, refresh | Axios |
| Кэш API (серверный стейт) | TanStack Query |
| Глобальный клиентский store | Zustand (подключать по необходимости) |
| Cookie | js-cookie |
| Формы | React Hook Form + Zod |
| WebSocket | native WebSocket |
| Infinite scroll | Intersection Observer |
| Даты | `Intl.DateTimeFormat` |
| Стили / ассеты | текущий SCSS + `public/` |
| Тесты | Vitest + Testing Library |
| Линт | ESLint + Prettier (или Biome) |
| Proxy | папка `proxy/` как есть |

Zustand не обязателен на старте. Добавлять, когда появится клиентский стейт, которым неудобно жить в Query или в `useState` (токен в памяти, сообщения с сокета, общие UI-флаги).

---

## 3. Архитектура: Feature-Sliced Design

```
tik-talk/
├── public/                 # SVG, шрифты, лого, bg — копировать
├── proxy/                  # Vercel proxy — копировать
├── src/
│   ├── app/                # сборка приложения
│   ├── pages/              # страницы = роуты
│   ├── widgets/            # крупные блоки из нескольких фич
│   ├── features/           # действия пользователя
│   ├── entities/           # бизнес-сущности
│   └── shared/             # всё без доменной логики
├── index.html
├── vite.config.ts
└── package.json
```

Импорты только вниз:

```
pages → widgets → features → entities → shared
```

Страница не ходит в axios напрямую. У каждого слайса публичный API — `index.ts`.

Алиас: `@/*` → `src/*` (замена `@tt/profile`).

---

## 4. Слои

### `app/`

Единственное место, где всё сшивается: провайдеры (`QueryClient`, Router), дерево роутов, guard, глобальный SCSS, env.

### `pages/`

Тонкие экраны под URL: `login`, `profile`, `settings`, `search`, `chats`. Собирают виджеты и фичи, почти без логики.

### `widgets/`

Блоки «как на макете»: layout + сайдбар, лента постов, список чатов + окно переписки.

### `features/`

Одно действие: логин, фильтр поиска, создать пост, отправить сообщение, загрузить аватар. Формы живут здесь.

### `entities/`

Модель предметной области: `profile`, `post`, `chat`, `session`.  
Типы, функции API (`getMyAccount`), Query-ключи (`['profile', 'me']`), карточка сущности.

### `shared/`

Без знания «профиль/чат»:

- `ui/` — кнопка, инпут, скелетон, иконка, avatar
- `api/` — axios + interceptor
- `config/` — `baseURL`
- `lib/` — cookies, `imageUrl`, даты

---

## 5. Соответствие Nx-либам

| Сейчас | В React-проекте |
|---|---|
| `apps/tik-talk` | `src/app` |
| `libs/common-ui` | `src/shared/ui` |
| `libs/shared` + `libs/interfaces` | `src/shared` + типы в `entities` |
| `libs/auth` | `entities/session` + `features/login` + `pages/login` |
| `libs/layout` | `widgets/layout` |
| `libs/profile` | `entities/profile` + фичи/страницы профиля |
| `libs/posts` | `entities/post` + `features/create-post` + `widgets/post-feed` |
| `libs/chats` | `entities/chat` + фичи чата + `widgets/chats-workspace` |
| `libs/experimental` | не переносить |

---

## 6. Что оставить / заменить / выкинуть

### Оставить (копировать)

- Доменная нарезка: auth, layout, profile, posts, chats
- Типы: `Profile`, `Post`, `Chat`, `Pageable`, WS type guards
- Контракты API и URL бэкенда
- SCSS (`styles/global`, `styles/ui`)
- `public/assets`
- `proxy/`
- `localStorage.lastActiveChatId`
- Нативный WebSocket (`ChatWSNativeService` как образец)
- DaData-контракт (тот же POST, exclude в interceptor)

### Заменить

| Angular | React |
|---|---|
| Angular 18 | React 19 |
| `@angular/router` + `accessGuard` | TanStack Router, `beforeLoad` |
| `HttpClient` + interceptor | Axios + interceptor |
| NgRx Store / Effects | TanStack Query |
| `@angular/forms` + CVA | React Hook Form + `Controller` |
| `ngx-cookie-service` | js-cookie |
| Signals, `AsyncPipe` | хуки Query / `useState` |
| `DatePipe` | `Intl` |
| `Renderer2`, `HostListener` | `useRef` + `useEffect` |
| `DragAndDropDirective` | свой хук на drag events |
| Karma / Jasmine | Vitest + Testing Library |

### Выкинуть

- `@angular/*`, `zone.js`, `angular-eslint`, Nx-пакеты
- RxJS в UI и effects (`debounceTime` → debounce в хуке)
- Route-level `provideState` (кэш Query глобальный)
- `libs/experimental`

RxJS не обязателен: для сокета достаточно native WebSocket.

---

## 7. Зоны ответственности инструментов

1. **Vite** — dev-сервер и бандл.
2. **React 19** — UI, хуки, ререндер.
3. **TypeScript** — типы; `interfaces` копируются.
4. **SCSS + public** — внешний вид.
5. **TanStack Router** — куда идёт пользователь, layout, lazy, guard.
6. **Axios** — как сходить на сервер (JWT, refresh-очередь, пропуск dadata.ru).
7. **TanStack Query** — данные с API: кэш, loading, refetch, infinite query, invalidate после мутаций.
8. **Zustand** — только клиентский глобальный стейт (сокет, токен в памяти, UI-флаги). Не для `GET /account/me` и `GET /post/`.
9. **js-cookie** — `token` / `refreshToken`.
10. **React Hook Form + Zod** — формы и валидация.
11. **WebSocket** — realtime чатов → Zustand или `queryClient.setQueryData`.
12. **Intersection Observer** — подгрузка поиска.
13. **Intl** — форматирование дат.

Поток одного запроса:

```
Роут (TanStack Router)
  → useQuery (есть ли кэш)
    → axios (Bearer, refresh)
      → ответ в кэш Query
        → React рисует UI
```

---

## 8. Маршруты (как сейчас)

```
/login                         без guard
/                              beforeLoad: нет токена → /login
  layout (сайдбар + WS)
    /              → redirect /profile/me
    /profile/:id
    /settings
    /search
    /chats
    /chats/:id
    /chats/new?userId=         создать чат → /chats/:id
```

---

## 9. С чего начинать разработку

Новый репозиторий. Не создавать все слайсы пустыми заранее.

1. **Каркас** — Vite + React + TS, алиас `@/`, перенос `public/`, SCSS, env, `interfaces`/`shared`.
2. **Axios** — `baseURL`, Bearer, skip dadata, очередь refresh на 403. Проверка: `GET /account/me`.
3. **Session** — login / logout / cookie. Аналог `AuthService`.
4. **Роутер** — `/login` и оболочка `/` с `beforeLoad`. Логин → `/profile/me`.
5. **Первый экран** — свой профиль: `useQuery(['profile','me'])`.

Критерий старта: логин пишет cookie, профиль открывается с API, 403 обновляет токен, а не сразу выкидывает на логин.

Дальше по порядку: настройки → поиск → посты → чаты + WebSocket.  
Zustand — в момент чатов, не в день 1.

---

## 10. Риски

1. **Refresh-очередь** — параллельные 403 должны ждать один refresh (сейчас `isRefreshing$`). Портировать на Promise-mutex.
2. **DaData** — не вешать Bearer поверх Token DaData.
3. **WS** — открывать сокет только после чтения cookie; на logout закрывать.
4. **`:host` в SCSS** — в React это корневой `className` компонента.
5. **SVG-иконки** — селектор `svg[icon]` заменить на компонент `<Icon name="chat" />`, ассеты те же.
6. **Redirect `/chats`** на `lastActiveChatId` — делать в `beforeLoad`, не строкой в `redirectTo`.
