<template>
  <v-container>
    <v-row justify="center" content="center">
      <v-col cols="12" md="9">
        <v-card class="elevation-8" outlined rounded>
          <v-toolbar dark color="gray">
            <v-toolbar-title>بازیابی رمز عبور</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>

              <v-text-field
                  label="ایمیل خود را وارد کنید..."
                  name="email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  outlined
                  rounded
              >
              </v-text-field>
              <router-link to="/login" style="text-decoration: none;color: royalblue">
              <span>
                 بازگشت به صفحه ورود
              </span>
              </router-link>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" outlined rounded dark style="font-size: large" class="mb-5">
              <span class="px-10">ارسال</span>

            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "ForgetPassword"
}
</script>

<style scoped>

</style>