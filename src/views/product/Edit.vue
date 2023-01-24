<template>
  <base-material-card
      icon="mdi-pencil"
      title="ویرایش محصول"
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
                label="نام محصول"
                type="name"
                name="name"
                v-model="form.name"
                :error="errors.name"
                :error-messages="errors.name"
                prepend-inner-icon="mdi-basket-plus-outline"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                class="purple-input"
                label="قیمت خرید"
                name="buying_price"
                v-model="form.buying_price"
                :error="errors.buying_price"
                :error-messages="errors.buying_price"
                prepend-inner-icon="mdi-currency-usd"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="قیمت فروش"
                class="purple-input"
                name="selling_price"
                v-model="form.selling_price"
                :error="errors.selling_price"
                :error-messages="errors.selling_price"
                prepend-inner-icon="mdi-currency-usd"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="تعداد محصول"
                class="purple-input"
                v-model="form.quantity"
                :error="errors.quantity"
                :error-messages="errors.quantity"

            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="تاریخ خرید"
                type="date"
                class="purple-input"
                v-model="form.buying_date"
                :error="errors.buying_date"
                :error-messages="errors.buying_date"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="کد محصول"
                class="purple-input"
                v-model="form.product_code"
                :error="errors.product_code"
                :error-messages="errors.product_code"
                prepend-inner-icon="mdi-bar-code"
            />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-text-field
                label="ریشه"
                class="purple-input"
                v-model="form.root"
                :error="errors.root"
                :error-messages="errors.root"
                prepend-inner-icon="mdi-bar-code"
            />
          </v-col>


          <v-col
              cols="12"
              md="4"
          >
            <v-select
                v-model="form.category_id"
                :items="categories"
                item-text="name"
                item-value="id"
                label="دسته بندی محصول"
                outlined
            >
            </v-select>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-select
                v-model="form.supplier_id"
                :items="suppliers"
                item-text="name"
                item-value="id"
                label="تولید کننده محصول"
                outlined
            >
            </v-select>
          </v-col>

          <v-col
              cols="12"
              md="12"
          >
            <label>تصویر محصول</label><br><br>
            <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected"
            >
          </v-col>

          <div>
            <img :src="form.photo" style="height: 50px;width: 50px">
          </div>

          </v-col>

          <v-col
              cols="12"
              class="text-center"
          >
            <v-card-actions class="justify-center">
              <v-btn color="primary" outlined dark style="font-size: medium" class="mb-5"
                     @click.prevent="ProductUpdate"
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
        buying_price: '',
        selling_price: '',
        quantity: '',
        buying_date: '',
        product_code: '',
        root: '',
        photo: '',
        newphoto: '',
        category_id: '',
        supplier_id: '',
      },
      errors: {},
      categories: {},
      suppliers: {}
    }
  },
  created() {
    let id = this.$route.params.id
    axios.get('http://localhost/api/product/' + id)
        .then(({data})=>(this.form = data))
        .catch(console.log('error'))

    axios.get('http://localhost/api/category')
    .then(({data})=>(this.categories = data))

    axios.get('http://localhost/api/supplier')
    .then(({data})=>(this.suppliers = data))

  },
  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      if (file.size > 1048770) {
        main.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.newphoto = event.target.result
        };
        reader.readAsDataURL(file);
      }

    },

    ProductUpdate() {
      let id = this.$route.params.id
      axios.patch('http://localhost/api/product/'+id , this.form)
          .then(() => {
            this.$router.push('/products')
            Swal.fire(
                '!موفق',
                'محصول با موفقیت ویرایش شد',
                'success'
            )
          }).catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>

<style scoped>

</style>