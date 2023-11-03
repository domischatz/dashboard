<template>
  <nav>
    <div class="navbar-logo">
      <img src="src/assets/logo.svg">
    </div>

    <ul>
      <li>
        <router-link to="/" title="Startseite">
          <i class="fa fa-home"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/about" title="Seite 1">
          <i class="fa fa-file-text"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/seite2" title="Seite 2">
          <i class="fa fa-cogs"></i>
        </router-link>
      </li>
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
  background-color: var(--dark-alt);
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


.fa {
  font-size: 2rem;
  color: var(--light);
  transition: 0.2s ease-out;
}
.fa:hover {
  color: var(--primary);
  transform: translateX(0.2rem);
}
</style>
