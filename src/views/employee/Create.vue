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
                v-model="form.name"
                :error="errors.name"
                :error-messages="errors.name"
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
                v-model="form.email"
                :error="errors.email"
                :error-messages="errors.email"
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
                v-model="form.phone"
                :error="errors.phone"
                :error-messages="errors.phone"
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
                v-model="form.joining_date"
                :error="errors.joining_date"
                :error-messages="errors.joining_date"
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
                v-model="form.nid"
                :error="errors.nid"
                :error-messages="errors.nid"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="حقوق"
                class="purple-input"
                v-model="form.sallery"
                :error="errors.sallery"
                :error-messages="errors.sallery"
            />
          </v-col>

          <v-col
              cols="12"
              md="12"
          >
            <label>عکس</label><br><br>
            <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected"
            >
          </v-col>

          <div>
            <img :src="form.photo" style="height: 50px;width: 50px">
          </div>

          </v-col>

          <v-col cols="12">
            <v-textarea
                class="purple-input"
                label="آدرس محل سکونت"
                v-model="form.address"
                :error="errors.address"
                :error-messages="errors.address"
            />
          </v-col>

          <v-col
              cols="12"
              class="text-center"
          >
            <v-card-actions class="justify-center">
              <v-btn color="primary" outlined dark style="font-size: medium" class="mb-5"
                     @click.prevent="EmployeeInsert"
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
import main from "@/main";
import axios from "axios";

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
  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      if (file.size > 1048770) {
        main.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.photo = event.target.result
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }

    },

    EmployeeInsert() {
      axios.post('http://localhost/api/auth/employee', this.form)
          .then(() => {
            this.$router.push('/employees')
            Swal.fire(
                '!موفق',
                '.کارمند ثبت شد',
                'success'
            )
          }).catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>

<style scoped>

</style>