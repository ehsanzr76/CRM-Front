<template>
  <base-material-card
      icon="mdi-pencil"
      title="ویرایش دسته بندی"
      class="px-5 py-3"
  >
    <v-form enctype="multipart/form-data">
      <v-container class="py-0">
        <v-row>
          <v-col
              cols="12"
              md="4"
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
                     @click.prevent="CategoryUpdate"
              >
                <span class="px-10">ویرایش</span>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </base-material-card>
</template>

<script>
import main from "@/main";
import axios from "axios";

export default {
  name: "Edit",
  data() {
    return {
      form: {
        name: '',
      },
      errors: {}
    }
  },
  created() {
    let id = this.$route.params.id
    axios.get('http://localhost/api/category/' + id)
        .then(({data})=>(this.form = data))
        .catch(console.log('error'))
  },
  methods: {

    CategoryUpdate() {
      let id = this.$route.params.id
      axios.patch('http://localhost/api/category/'+id , this.form)
          .then(() => {
            this.$router.push('/categories')
            Swal.fire(
                '!موفق',
                'دسته بندی با موفقیت ویرایش شد',
                'success'
            )
          }).catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>

<style scoped>

</style>