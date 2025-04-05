
# Real Time Movies Fetching App

**A brief description of what this project does and who it's for**

This is a dynamic and responsive **Movie Search & Watchlist Application** built with **React**. Users can search for movies using the **OMDb API**, view details, rate them with a custom-built star component, and manage their watched list — which is stored using **local storage** for persistence.


## Table Of Contents
1.Features

2.Technologies Used

3.Working Process

4.Installation & Set up

## 1.Features

*  🔍 **Movie Search** using OMDb API
- 📄 View movie details, release date, runtime, and IMDb rating
- ⭐ Custom **User Rating Star Component**
- 🧠 Built with **React Hooks** (`useState`, `useEffect`)
- 💾 **Local storage** used for persisting the watched list
- 🗑️ Option to remove watched movies
- 🔄 Dynamic UI updates with user interactions

## 2.Technologies Used
* **HTML** for layout design

* **CSS** for styling and also for responsive design. 

* **Bootstrap** is css frame work used for styling elements.

* **JavaScript** for adding functionality to the elements.

* **React Js** In React Js we actualy used useState hook for handling  state management and useEffect for fetching the Api results.





## 3.Working Process
### 1. **Search Movies**
- User types a query in the search bar.
- App fetches matching movies from the OMDb API using `fetch` and `useEffect`.

### 2. **Display Movie List**
- Matching movies are shown in a scrollable list.
- Clicking a movie shows its full details on the right side.

### 3. **User Ratings**
- A custom **StarComponent** allows the user to rate the movie.
- The rating is stored temporarily and passed back to the parent component.

### 4. **Watched List**
- After rating, the user can add the movie to their watched list.
- Watched movies are stored in **localStorage** and rendered below.
- Option to **delete** movies from the watched list.
## 4. Deployment

1.Clone the repository:

```bash
  git clone https://github.com/Challamsetty-venkata-sai/Real_Time_Movies_App.git
```

2.Navigate to the project directory:

```bash
   cd src
```
3.install all dependecies:

```bash
   npm i
```







4.Start The development server:

```bash
   npm start
```
