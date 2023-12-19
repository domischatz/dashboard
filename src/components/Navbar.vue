<template>
  <html>
  <body>
  <nav>
    <div class="navbar-logo">
      <img src="../assets/Logo_Internet-Paznaun_trans.png" alt="Logo" width="100" height="60" >
    </div>
    <ul>
      <li>
        <router-link to="/" title="Startseite">
          <i class="fa fa-home"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/Login" title="Seite 1">
          <i class="fa fa-file-text"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/Login" title="Login">
          <i class="fa fa-user-circle"></i>
        </router-link>
      </li>

    </ul>
  </nav>
  </body>
  </html>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* CSS-Stile für die Navigationsleiste */
/* Test*/
nav {
  background-color: var(--primary);
  color: #fff;
  padding: 7px;
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
  color: #ffffff;
  transition: 0.2s ease-out;
}
.fa:hover {
  color: var(--secondary);
  transform: translateX(0.2rem);
}
</style>

