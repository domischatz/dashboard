<template>
  <nav>
    <div class="navbar-logo">
      <img src="http://www.w3.org/2000/svg"/>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
    </div>

    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About Us</router-link></li>
      <li><router-link to="/about">Settings</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* CSS-Stile für die Navigationsleiste */
nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
}

li {
  margin-right: 20px;
}

a {
  text-decoration: none;
  color: #fff;
}

.active {
  font-weight: bold;
}
</style>
