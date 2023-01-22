<template>
  <base-material-card
      icon="mdi-pencil"
      title="ایجاد دسته بندی جدید"
      class="px-5 py-3"
  >
    <v-form enctype="multipart/form-data">
      <v-container class="py-0">
        <v-row>
          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="نام دسته بندی"
                type="name"
                name="name"
                v-model="form.name"
                :error="errors.name"
                :error-messages="errors.name"
                prepend-inner-icon="mdi-layers-plus"
            />
          </v-col>
          <v-col
              cols="12"
              class="text-center"
          >
            <v-card-actions class="justify-center">
              <v-btn color="primary" outlined dark style="font-size: medium" class="mb-5"
                     @click.prevent="CategoryInsert"
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
import axios from "axios";

export default {
  name: "Create",
  data() {
    return {
      form: {
        name: null,
      },
      errors: {}
    }
  },
  methods: {
    CategoryInsert() {
      axios.post('http://localhost/api/category', this.form)
          .then(() => {
            this.$router.push('/categories')
            Swal.fire(
                '!موفق',
                'دسته بندی با موفقیت ثبت شد',
                'success'
            )
          }).catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>

<style scoped>

</style>