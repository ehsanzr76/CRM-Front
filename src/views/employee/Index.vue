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
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.nid }}</td>
          <td>{{ employee.joining_date }}</td>
          <td>{{ employee.salary }}</td>
          <td><img :src="employee.photo" style="height: 50px;width: 50px"></td>
          <td>
              <router-link to="#" style="text-decoration: none"><v-icon color="red" title="حذف">mdi-delete</v-icon></router-link>
              <router-link to="#" style="text-decoration: none"><v-icon color="#367cba" title="ویرایش">mdi-human-edit</v-icon></router-link>
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
      employees: []
    }
  },
  methods: {
    allEmployees() {
      axios.get('http://localhost/api/employee')
          .then(({data}) => (this.employees = data))
          .catch()
    }
  },
  created() {
    this.allEmployees()
  }
}
</script>

<style scoped>

</style>