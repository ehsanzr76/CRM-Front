<template>
  <base-material-card
      icon="mdi-pencil"
      title="ایجاد تامین کننده جدید"
      class="px-5 py-3"
  >
    <v-form enctype="multipart/form-data">
      <v-container class="py-0">
        <v-row>
          <v-col
              cols="12"
              md="3"
          >
            <v-text-field
                label="نام و نام خانوادگی"
                type="name"
                name="name"
                v-model="form.name"
                :error="errors.name"
                :error-messages="errors.name"
                prepend-inner-icon="mdi-account"
            />
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <v-text-field
                class="purple-input"
                label="ایمیل"
                type="email"
                name="email"
                v-model="form.email"
                :error="errors.email"
                :error-messages="errors.email"
                prepend-inner-icon="mdi-email"
            />
          </v-col>

          <v-col
              cols="12"
              md="3"
          >
            <v-text-field
                label="شماره موبایل"
                class="purple-input"
                type="phone"
                v-model="form.phone"
                :error="errors.phone"
                :error-messages="errors.phone"
                prepend-inner-icon="mdi-phone"
            />
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <v-text-field
                label="نام فروشگاه"
                type="text"
                class="purple-input"
                v-model="form.shop_name"
                :error="errors.shop_name"
                :error-messages="errors.shop_name"
                prepend-inner-icon="mdi-store-plus"
            />
          </v-col>

          <v-col
              cols="12"
              md="12"
          >
            <label >عکس</label><br><br>
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
                label="آدرس"
                v-model="form.address"
                :error="errors.address"
                :error-messages="errors.address"
                prepend-inner-icon="mdi-map-marker"
            />
          </v-col>

          <v-col
              cols="12"
              class="text-center"
          >
            <v-card-actions class="justify-center">
              <v-btn color="primary" outlined dark style="font-size: medium" class="mb-5"
                     @click.prevent="SupplierInsert"
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
        address: null,
        shop_name: null,
        photo: null,
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

    SupplierInsert() {
      axios.post('http://localhost/api/supplier', this.form)
          .then(() => {
            this.$router.push('/suppliers')
            Swal.fire(
                '!موفق',
                'تامین کننده با موفقیت ثبت شد',
                'success'
            )
          }).catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>

<style scoped>

</style>