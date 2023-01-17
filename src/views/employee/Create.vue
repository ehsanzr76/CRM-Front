<template>
  <base-material-card
      icon="mdi-pencil"
      title="ایجاد کارمند جدید"
      class="px-5 py-3"
  >
    <v-form>
      <v-container class="py-0">
        <v-row>
          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="نام و نام خانوادگی"
                type="name"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                class="purple-input"
                label="ایمیل"
                type="email"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="شماره موبایل"
                class="purple-input"
                type="phone"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="تاریخ عضویت"
                class="purple-input"
                type="date"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="کد ملی"
                type="text"
                class="purple-input"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="حقوق"
                class="purple-input"
            />
          </v-col>

          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="عکس"
                type="file"
                class="purple-input"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
                class="purple-input"
                label="آدرس محل سکونت"
            />
          </v-col>

          <v-col
              cols="12"
              class="text-center"
          >
            <v-card-actions class="justify-center">
              <v-btn color="primary" outlined dark style="font-size: medium" class="mb-5" @click.prevent="EmployeeInsert"
              >
                <span class="px-10">ثبت</span>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-material-card>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        sallery: null,
        address: null,
        photo: null,
        nid: null,
        joining_date: null,
      },
      errors: {}
    }
  },
  methods:{
    EmployeeInsert(){

    }
  }
}
</script>

<style scoped>

</style>