<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
  >
    <v-btn outlined class="ml-3" color="#8a2580">
      <router-link to="/create/product" class="text-decoration-none" style="color: #8a2580">محصول جدید</router-link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-text-field
        prepend-inner-icon="mdi-account-search"
        type="text"
        style="width: 300px"
        placeholder="نام محصول را جست و جو کنید ..."
        v-model="searchTerm"
    />
    <base-material-card
        icon="mdi-clipboard-text"
        title="لیست محصولات"
        class="px-5 py-3"
        style="background-color: #a2a8a3"
    >
      <v-simple-table>

        <thead>
        <tr>
          <th class="primary--text">
            شماره
          </th>
          <th class="primary--text">
            نام
          </th>
          <th class="primary--text">
          قیمت خرید
          </th>
          <th class="primary--text">
            قیمت فروش
          </th>
          <th class="primary--text">
           تعداد محصول
          </th>
          <th class="text-right primary--text">
           تاریخ خرید محصول
          </th>
          <th class="primary--text">
           کد محصول
          </th>
          <th class="primary--text">
          دسته بندی
          </th>
          <th class="primary--text">
            تولید کننده محصول
          </th>
          <th class="primary--text">
           تصویر محصول
          </th>
          <th class="primary--text">
            عملیات
          </th>

        </tr>
        </thead>

        <tbody>
        <tr v-for="product in filtersearch" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.buying_price }}</td>
          <td>{{ product.selling_price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.buying_date }}</td>
          <td>{{ product.product_code }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{ product.supplier.name }}</td>
          <td><img :src="product.photo" style="height: 40px;width: 40px"></td>
          <td>
            <a @click="deleteProduct(product.id)" style="text-decoration: none"><v-icon color="red" title="حذف">mdi-delete</v-icon></a>
            <router-link :to="{name:'ویرایش محصول' , params:{id:product.id}}" style="text-decoration: none"><v-icon color="#175096" title="ویرایش">mdi-storefront-edit</v-icon></router-link>
          </td>

        </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3"/>
  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data(){
    return {
      products: [],
      searchTerm:''
    }
  },
  computed:{
    filtersearch(){
      return this.products.filter(product=>{
        return product.name.match(this.searchTerm)
      })
    }
  },
  methods: {
    allProducts() {
      axios.get('http://localhost/api/product')
          .then(({data}) => (this.products = data))
          .catch()
    },
    async deleteProduct(id){
      Swal.fire({
        title: 'آیا مطمعن هستید؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله حذف شود'
      }).then((result) => {
        if (result.value) {
          axios.delete('http://localhost/api/product/' + id)
              .then(() =>{
                this.products = this.products.filter(product=>{
                  return product.id !== id
                })
              })
              .catch(()=>{
                this.$router.push('/products')
              })
          Swal.fire(
              '!موفق',
              'محصول با موفقیت حذف شد',
              'success'
          )
        }
      })
    }
  },
  created() {
    this.allProducts()
  }
}
</script>

<style scoped>

</style>