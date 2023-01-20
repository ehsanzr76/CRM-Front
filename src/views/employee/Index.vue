<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
  >
    <v-btn outlined class="ml-3" color="#8a2580">
      <router-link to="/create/employee" class="text-decoration-none" style="color: #8a2580">کارمند جدید</router-link>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-text-field
        prepend-inner-icon="mdi-account-search"
        type="text"
        style="width: 300px"
        placeholder="نام کارمند را جست و جو کنید ..."
        v-model="searchTerm"
    />
    <base-material-card
        icon="mdi-clipboard-text"
        title="لیست کارمندان"
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
          <th class="primary--text">
            کد ملی
          </th>
          <th class="primary--text">
            تاریخ عضویت
          </th>
          <th class="text-right primary--text">
            حقوق
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
        <tr v-for="employee in filtersearch" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.nid }}</td>
          <td>{{ employee.joining_date }}</td>
          <td>{{ employee.salary }}</td>
          <td><img :src="employee.photo" style="height: 40px;width: 40px"></td>
          <td>
            <a @click="deleteEmployee(employee.id)" style="text-decoration: none"><v-icon color="red" title="حذف">mdi-delete</v-icon></a>
            <router-link :to="{name:'ویرایش کارمند' , params:{id:employee.id}}" style="text-decoration: none"><v-icon color="#367cba" title="ویرایش">mdi-human-edit</v-icon></router-link>
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
      employees: [],
      searchTerm:''
    }
  },
  computed:{
    filtersearch(){
      return this.employees.filter(employee=>{
        return employee.name.match(this.searchTerm)
      })
    }
  },
  methods: {
    allEmployees() {
      axios.get('http://localhost/api/employee')
          .then(({data}) => (this.employees = data))
          .catch()
    },
   async deleteEmployee(id){
      Swal.fire({
        title: 'آیا مطمعن هستید؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله حذف شود'
      }).then((result) => {
        if (result.value) {
          axios.delete('http://localhost/api/employee/' + id)
          .then(() =>{
            this.employees = this.employees.filter(employee=>{
              return employee.id !== id
            })
          })
          .catch(()=>{
            this.$router.push('/employees')
          })
          Swal.fire(
              '!موفق',
              'کارمند با موفقیت حذف شد',
              'success'
          )
        }
      })
    }
  },
  created() {
    this.allEmployees()
  }
}
</script>

<style scoped>

</style>