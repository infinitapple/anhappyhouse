
<template>
  <Layout>
    <v-btn @click="show = !show">Log-In</v-btn>

    <v-dialog
      v-model="show"
      width="500">

      <v-card>

        <v-card-title>
          <h2>Enter your information</h2>
        </v-card-title>

        <v-card-text>

          <v-form
            persistent
            ref="form"
          >

            <v-text-field
              type="text"
              label="enter username"
              class="mb-2"
              v-model="username"
              required
              :rules="usernameRules"
            />

            <v-text-field
              type="password"
              label="enter password"
              class="mb-2"
              v-model="password"
              required
              :rules="passwordRules"
            />

            <v-text-field
              type="password"
              label="check password"
              class="mb-2"
              v-model="checkPassword"
              required
              :rules="checkPasswordRules"
            />

          </v-form>

          <v-btn
            @click="submit"
            color="primary">Submit</v-btn>

          <v-btn
            @click="reset"
            color="error">Cancel</v-btn>

       </v-card-text>
  
    </v-dialog>
  </Layout>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        username: '',
        password: '',
        checkPassword: '',
        usernameRules: [
          v => !!v || 'username is required',
          v => /^[a-zA-Z0-9]{8,24}$/.test(v) || 'username is invalid'
        ],
        passwordRules: [
          v => !!v || 'password is required',
          v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(v) || 
               'password is invalid'
        ],
        checkPasswordRules: [
          v => !!v || 'check password is required',
          v => this.password === this.checkPassword || 'password is different'
        ]
      }
    },
    methods: {
      submit() {
        if (!this.$refs.form.validate()) return;
        alert(`username: ${this.username}, password: ${this.password}`);
        this.reset();
      },
      reset() {
        this.$refs.form.reset();
        this.show = false;
      }
    }
  }
</script>