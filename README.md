# Read me !!!!!
Email: sendfornotification@gmail.com
password: passwordadmin1
Phone number Code verify mail: 0829574920
link google sheet: https://docs.google.com/spreadsheets/d/1ZzSH3_U2cvYxh9lttUBVZ_G6VufmcgxBUxMbAxl6tm4/edit?pli=1#gid=0
step1: yarn 
step2: yarn dev
step3: click http://localhost:3000/ 
## Libraires, dependencies and tools

- Node v16.20
- React v18
- TypeScript
- React router dom v6.14
- React Helmet v6.1
- Axios v1.4
- React Redux
- React Bootstrap v2.8 implement Bootstrap 5
- React Query (TanStack Query v3)
- Redux-toolkit
- React Hook Form
- Yup / Yup Resolvers
- SCSS (sass)
- Storybook v7
- ESLint
- Hygen

## Files / Directories

| Path               | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------ |
| /.storybook/       | contains Storybook config files                                    |
| /.eslintrc         | settings for `ESLint`                                              |
| /.hygen.js         | settings for `Hygen`                                               |
| /\_templates/      | contains scaffolding templates based on `Hygen`                    |
| /.vscode/          | settings for `Visual Studio Code` workspace                        |
| /package.json      | manifest file for Node.js projects                                 |
| /tsconfig.json     | settings for `TypeScript`                                          |
| /dist/             | contains production build codes                                    |
| /public/           | root folder that gets served up as our react app.                  |
| /src/components/   | contains Atomic Design components                                  |
| /src/containers/   | contains constainers / layout                                      |
| /src/pages/        | contains pages                                                     |
| /src/assets/       | contains images, icons, fonts, videos                              |
| /src/stores/       | contains shared stores                                             |
| /src/services/     | contains shared services                                           |
| /src/styles/       | contains common styles: breakpoints, colors, font, mixin, function |
| /src/utils/        | contains common utils: utils, helper, contains, enums              |
| /src/index.tsx/    | contains root file                                                 |
| /src/App.tsx       | contains application page index                                    |
| /src/vite-env.d.ts | contains shared types                                              |

---

## Command Line

| Path                 | Purpose                           |
| -------------------- | --------------------------------- |
| yarn dev             | start the project                 |
| yarn build           | build the project                 |
| gen:component        | generate new `atomic` component   |
| gen:page             | generate new page                 |
| gen:container        | generate new container            |
| yarn storybook       | run the storybook                 |
| yarn build-storybook | build the storybook               |
| yarn lint            | run `Eslint` to check the syntax  |
| yarn prettier        | check format code with `prettier` |
| yarn prettier:fix    | run format code with `prettier`   |

---



<https://css-tricks.com/abem-useful-adaptation-bem/>

**Note: Use only the `lowercase` format for `className`.**

```tsx
//GOOD 🏆🏆🏆
export const Sample: React.FC = ({ children }) => <div className='a-sample'>{children}</div>;

//NOT GOOD 💩💩💩
export const Sample: React.FC = ({ children }) => <div className='a-Sample'>{children}</div>;
```

**Note: Use only the `Single_Underscore(_) && Single-Dash(-)` format for `className`.**

```tsx
//GOOD 🏆🏆🏆
export const Sample = () => (
  <div className='a-sample'>
    <span className='a-sample_title'>Title</span>
  </div>
);

//NOT GOOD 💩💩💩
export const Sample = () => (
  <div className='a--sample'>
    <span className='a--sample__title'>Title</span>
  </div>
);
```

**Note: The `className` must be formatted as `block_element-modifier`. But `Sometimes` it will be formatted as `block_element_element-modifier`.**

```tsx
//GOOD 🏆🏆🏆
export const Sample = () => (
  <div className='a-sample'>
    <span className='a-sample_element'>One Element</span>
  </div>
);

export const Sample = () => (
  <div className='a-sample'>
    <span className='a-sample_element1_element2'>Two elements</span>
  </div>
);

//NOT GOOD 💩💩💩
export const Sample = () => (
  <div className='a-sample'>
    <span className='a-sample_element1_element2_element3'>Greater than 2 elements</span>
  </div>
);
```

### `Atomic`

<https://bradfrost.com/blog/post/atomic-web-design/>

### `Components`

- Use only `React-Hook`
- Follow the `rules of hook` (<https://reactjs.org/docs/hooks-rules.html>)

### `Custom Hooks`

- Example: <https://usehooks-ts.com/introduction>

**Note: Use `ModifierUtils` to generate `modifiers` `className`.**

### `Storybook`

**Note: Make sure that you have included all instances of the component in the storybook when building it.**

### `Typescript`

**See more:**

- <https://www.typescriptlang.org/docs/>

- <https://www.typescriptlang.org/docs/handbook/utility-types.html>

### `Redux`

**See more:**

- redux: <https://redux.js.org/>
- redux-toolkit: <https://redux-toolkit.js.org/>
- react-redux: <https://react-redux.js.org/>

### `React-router-dom`

**See more: <https://reactrouter.com/en/main>**

### `Naming`

**1. Service:** `[moduleName].service.ts`

```ts
export const moduleNameService = {
  crud: async (args): Promise<unknown> => {
    const res = await ....
    return res.data;
  };
  // or
  method[Module][Action]: async (): Promise<unknown> => {
    const res = await ....
    return res.data;
  };
}
```

**2. Interfaces & Types:** `types.d.ts`

**4. Colors:** <https://hexcol.com/> Enter code => Get `color_name`

### `Git`

- Rebase: <https://git-scm.com/docs/git-rebase>
- Git branch format: <http://karma-runner.github.io/5.0/dev/git-commit-msg.html>

**Note: When create a new branch. The `type` will include `feature | bugfix | hotfix | release | support`**

```ssh
  git checkout -b type/feature-name
```

**Note: When committed. The `type` will include `build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test`**

```ssh
  git commit -m 'type(:emoji: | feature-name): messages'
```

**The type must be one of the following:**

| Type         | Emoji                    | Description                                                                                                 |
| ------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **build**    | 📦 :package:             | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| **chore**    |                          | Updating grunt tasks etc.; no production code change                                                        |
| **ci**       | 👷 :construction_worker: | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| **docs**     | 📚 :books:               | Documentation only changes                                                                                  |
| **feat**     | ✨ :sparkles:            | A new feature                                                                                               |
| **fix**      | 🐛 :bug:                 | A bug fix                                                                                                   |
| **perf**     | 🐎 :racehorse:           | A code change that improves performance                                                                     |
| **refactor** | 🔨 :hammer:              | A code change that neither fixes a bug nor adds a feature                                                   |
| **revert**   |                          |                                                                                                             |
| **style**    | 💄 :lipstick:            | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| **test**     | 🚨 :rotating_light:      | Adding missing tests or correcting existing tests                                                           |

**Emoji** <https://gist.github.com/parmentf/035de27d6ed1dce0b36a>

## Generate Template

- Generate component: `yarn gen:component → select level → enter component's name`
- Generate page: `yarn gen:page → enter page's name`
- Generate container: `yarn gen:container → enter container's name`


