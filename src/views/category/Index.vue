<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
  >
    <v-btn outlined class="ml-3" color="#8a2580">
      <router-link to="/create/category" class="text-decoration-none" style="color: #8a2580">دسته بندی جدید</router-link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-text-field
        prepend-inner-icon="mdi-account-search"
        type="text"
        style="width: 300px"
        placeholder="نام دسته بندی را جست و جو کنید ..."
        v-model="searchTerm"
    />
    <base-material-card
        icon="mdi-clipboard-text"
        title="لیست دسته بندی ها"
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
            عملیات
          </th>

        </tr>
        </thead>

        <tbody>
        <tr v-for="category in filtersearch" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
            <a @click="deleteCategory(category.id)" style="text-decoration: none"><v-icon color="red" title="حذف">mdi-delete</v-icon></a>
            <router-link :to="{name:'ویرایش دسته بندی' , params:{id:category.id}}" style="text-decoration: none"><v-icon color="#175096" title="ویرایش">mdi-pencil-box-multiple</v-icon></router-link>
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
      categories: [],
      searchTerm:''
    }
  },
  computed:{
    filtersearch(){
      return this.categories.filter(category=>{
        return category.name.match(this.searchTerm)
      })
    }
  },
  methods: {
    allSuppliers() {
      axios.get('http://localhost/api/category')
          .then(({data}) => (this.categories = data))
          .catch()
    },
    async deleteCategory(id){
      Swal.fire({
        title: 'آیا مطمئن هستید؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله حذف شود'
      }).then((result) => {
        if (result.value) {
          axios.delete('http://localhost/api/category/' + id)
              .then(() =>{
                this.categories = this.categories.filter(category=>{
                  return category.id !== id
                })
              })
              .catch(()=>{
                this.$router.push('/categories')
              })
          Swal.fire(
              '!موفق',
              'دسته بندی با موفقیت حذف شد',
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