# Перенос BoatFix на Vite + React 19

Старый проект (CRA + React 18) находится в папке `old_website/` — он служит референсом.
Новый проект собран в корне на Vite 8 + React 19.2 + TypeScript 6.

## Конфигурация (сделано)

- [x] Создана папка `old_website/` со всеми старыми файлами
- [x] Vite-шаблон развёрнут в корне (`vite.config.ts`, `tsconfig*`, `index.html`)
- [x] `package.json` — React 19, RR 7, Firebase 12, Redux 5 + thunk, axios
- [x] `.env` — ключи переименованы `REACT_APP_` → `VITE_`, добавлен `VITE_OPENWEATHER_API_KEY`
- [x] `vite.config.ts` — `build.outDir: 'build'` (совместимо с `firebase.json`)
- [x] `index.html` — перенесены meta, favicon, Яндекс.Метрика, `%PUBLIC_URL%` → `/`
- [x] `public/` — старые ассеты (иконки, manifest, верификации)
- [x] `.gitignore` — добавлены `old_website`, `.env`, `build`
- [x] `.env.example` — обновлён под `VITE_` префикс

## Этап 1. Инфраструктура (utils, firebase, store)

- [x] `src/types.ts` (Order, AuthState, RootState, Timestamp)
- [x] `src/firebase.ts` (VITE_ переменные)
- [x] `src/cloudinaryConfig.ts` (VITE_ переменные)
- [x] `src/store.ts` (createStore + thunk, Redux DevTools)
- [x] `src/reducers/authReducer.ts` + `src/reducers/index.ts`
- [x] `src/Utils/` (convertTimestampToDate, public-id-from-url, smooth-scroll)
- [x] `src/Constants/links.ts`
- [x] `src/declarations.d.ts` (Redux DevTools window type)
- [x] `src/react-app-env.d.ts` → заменён на `vite-env.d.ts`

## Этап 2. Общие компоненты

- [x] `button` + module.css
- [x] `modal` + module.css
- [x] `error` + module.css
- [x] `social_links` + module.css
- [x] `header` + module.css (навигация, RR-хуки)
- [x] `footer` + module.css
- [x] `phone-input`
- [x] `private-content` (Redux auth)
- [x] `upload_button` + module.css
- [x] `weather-block` + module.css + `utils/icon-weather.ts` (VITE_ ключ, убран хардкод)
- [x] `components/index.ts`

## Этап 3. Страницы

- [x] `main` + module.css + `worksExamples` + module.css
- [x] `order` + module.css (Firestore + Cloudinary upload, `db` из firebase.ts)
- [x] `contacts` + module.css
- [x] `admin-login` (Firebase auth + Redux)
- [x] `admin-control-orders` + module.css (Firestore CRUD)
- [x] `not-found` + module.css
- [x] `pages/index.ts`

## Этап 4. Сборка приложения

- [x] `routes/routes.tsx`
- [x] `app.tsx` + `app.module.css`
- [x] `main.tsx` (BrowserRouter + Provider)
- [x] `index.css` (+ шрифты jura, фоновые изображения)
- [x] Удалены шаблонные файлы Vite (App.tsx, App.css, assets/)
- [x] Type-only импорты приведены к `verbatimModuleSyntax`

## Этап 5. Проверка

- [x] `npm run lint` (oxlint) — 0 ошибок, 3 предупреждения (setState in effect, унаследованы из старого кода)
- [x] `npm run build` — успешно, 3.48 MB, 23 файла
- [x] Dev-сервер: главная, заказ (форма + маска телефона), контакты, админ-логин, защита админки, 404
- [x] Preview (production-сборка): главная + deep-link `/order`
- [x] Предупреждение `React Router Future Flag` — исчезло (RR 7)
- [x] `npm audit` — 0 уязвимостей (было 64)
- [ ] Проверка реальной отправки заказа (Firestore + Cloudinary) на проде после деплоя
- [ ] Деплой: `firebase deploy` (по согласованию)

## Заметки

- `process.env.REACT_APP_*` → `import.meta.env.VITE_*` во всех файлах
- В старом `weather-block.tsx` был захардкожен ключ OpenWeather — вынесен в `VITE_OPENWEATHER_API_KEY`; компонент не используется нигде (мёртвый код, как и в старом проекте)
- Старый dev-сервер CRA был убит (держал файлы и воссоздавал node_modules/.cache)
- `order.tsx`: `getFirestore()` → общий `db` из `firebase.ts`
- `old_website/` можно удалить после успешной проверки нового сайта на проде
