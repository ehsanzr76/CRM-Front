<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
  >
    <v-btn outlined class="ml-3" color="#8a2580">
      <router-link to="/create/supplier" class="text-decoration-none" style="color: #8a2580">تامین کننده جدید</router-link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-text-field
        prepend-inner-icon="mdi-account-search"
        type="text"
        style="width: 300px"
        placeholder="نام تامین کننده را جست و جو کنید ..."
        v-model="searchTerm"
    />
    <base-material-card
        icon="mdi-clipboard-text"
        title="لیست تامین کنندگان"
        class="px-5 py-3"
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
            شماره موبایل
          </th>
          <th class="text-right primary--text">
            ایمیل
          </th>
          <th class="text-right primary--text">
            نام فروشگاه
          </th>
          <th class="primary--text">
            عکس
          </th>
          <th class="primary--text">
            عملیات
          </th>

        </tr>
        </thead>

        <tbody>
        <tr v-for="supplier in filtersearch" :key="supplier.id">
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.phone }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.shop_name }}</td>
          <td><img :src="supplier.photo" style="height: 40px;width: 40px"></td>
          <td>
            <a @click="deleteSupplier(supplier.id)" style="text-decoration: none"><v-icon color="red" title="حذف">mdi-delete</v-icon></a>
            <router-link :to="{name:'ویرایش تامین کننده' , params:{id:supplier.id}}" style="text-decoration: none"><v-icon color="#175096" title="ویرایش">mdi-human-edit</v-icon></router-link>
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
      suppliers: [],
      searchTerm:''
    }
  },
  computed:{
    filtersearch(){
      return this.suppliers.filter(supplier=>{
        return supplier.name.match(this.searchTerm)
      })
    }
  },
  methods: {
    allSuppliers() {
      axios.get('http://localhost/api/supplier')
          .then(({data}) => (this.suppliers = data))
          .catch()
    },
    async deleteSupplier(id){
      Swal.fire({
        title: 'آیا مطمئن هستید؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله حذف شود'
      }).then((result) => {
        if (result.value) {
          axios.delete('http://localhost/api/supplier/' + id)
              .then(() =>{
                this.suppliers = this.suppliers.filter(supplier=>{
                  return supplier.id !== id
                })
              })
              .catch(()=>{
                this.$router.push('/suppliers')
              })
          Swal.fire(
              '!موفق',
              'تامین کننده با موفقیت حذف شد',
              'success'
          )
        }
      })
    }
  },
  created() {
    this.allSuppliers()
  }
}
</script>

<style scoped>

</style>