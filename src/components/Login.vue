<template>
  <div class="loginBox">
    <div class="inner">
      <div class="signIn" v-if="signIn">
        <div class="top">
          <img class="logo" src="../assets/Logo_Internet-Paznaun_trans.png" />
          <div class="title">Login</div>
        </div>
        <form>
          <div class="form">
            <input class = input1
                aria-label="E-mail"
                type="email"
                placeholder="Email"
            />

            <input class="input1"
                   type="password"
                   placeholder="Password"
            />
          </div>
          <input
              type="submit"
              value="Login"
              class="action"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailRegex: /^[\w\.-]+@[\w\.-]+\.\w+$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,

      firstName: "",
      lastName: "",

      password: {
        value: "",
        error: false
      },

      email: {
        value: "",
        error: false
      },

      signIn: true
    };
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss">
@mixin box {
  box-shadow: 1px 1px 2px 1px #ccc;
}

@mixin field {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="email"] {
  @include field;
}

input[type="password"] {
  @include field;
}

.input1 {
  width: 100%;
  background-color: white;
}

.logo {
  width: 300px;
  margin-bottom: 10px;
}

.action {
  height: 40px;
  text-transform: uppercase;
  border-radius: 25px;
  width: 100%;
  border: none;
  background: #82d9e1;
  margin-top: 20px;
  color: black;
  font-size: 1.2rem;

  &:hover {
    background-color: #82d9e1;;
    color: white;
  }
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.title {
  width: 100%;
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

html {
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

</style>