<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import {getUser} from "../composables/Tasks"
  let rows = ref([]);
  let btnLoadingState = ref(false);
  export default {
    setup() {
  
  // Get
    let columns = ref([
    {
      name: "id",
      label: "User ID",
      align: "left",
      field: "id",
    },
    {
      name: "name",
      label: "Name",
      align: "left",
      field: "name",
    },
    {
      name: "username",
      label: "Username",
      align: "left",
      field: "username",
    },
    {
      name: "email",
      label: "Email Address",
      align: "left",
      field: "email",
    },
    {
      name: "address",
      label: "Address",
      align: "left",
      field: "address",
      format: (value, row) => `${row.address.street}, ${row.address.suite}, ${row.address.city} ${row.address.zipcode}`,
    },
    {
      name: "geo",
      label: "Geo",
      align: "left",
      field: "geo",
      format: (value, row) => `lat: ${row.address.geo.lat}, lng: ${row.address.geo.lng}`,
    },
    {
      name: "phone",
      label: "Phone Number",
      align: "left",
      field: "phone",
    },
    {
      name: "website",
      label: "Website",
      align: "left",
      field: "website",
    },
    {
      name: "company",
      label: "Company Name",
      align: "left",
      field: "company",
      format: (value, row) => `${row.company.name} - ${row.company.catchPhrase} - ${row.company.bs}`,
    },
  ]);
      let form = ref({
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        phone:'', 
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
  });
      let submitForm = ref(null);
      let selectedRow = ref({});
      const onRowClick = (evt, row) => {
        selectedRow.value = row;
          form.value.UserId = row.UserId;
          form.value.name = row.name;
          form.value.username = row.username;
          form.value.email = row.email;
          form.value.address = row.address;
          form.value.phone = row.phone;
          form.value.website = row.website;
          form.value.company = row.company;
      };
      const updateUser = () => {
        btnLoadingState.value = (true);
        axios
          .put(
            `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`,
            {
              name: form.value.name,
              username: form.value.username,
              email: form.value.email,
              address: form.value.address,
              phone: form.value.phone,
              website: form.value.website,
              company: form.value.company,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              let index = rows.value.findIndex(
                (row) => row.id === selectedRow.value.id
              );
                rows.value[index].name = response.data.name;
                rows.value[index].username = response.data.username;
                rows.value[index].email = response.data.email;
                rows.value[index].address = response.data.address;
                rows.value[index].phone = response.data.phone;
                rows.value[index].website= response.data.website;
                rows.value[index].company = response.data.company;
                form.value = {
                name: '',
                username: '',
                email: null,
                address: {
                  street: '',
                  suite: '',
                  city: '',
                  zipcode: '',
                  geo: {
                    lat: '',
                    lng: ''
                  }
                },
                phone: null, 
                website: '',
                company: {
                  name: '',
                  catchPhrase: '',
                  bs: ''
                }
              }
              selectedRow.value = {};
            }
            btnLoadingState.value = (false);
          });
          submitForm.value.reset();
  
      };

      let deleteBtnLoadingState = ref(false);
      const deleteUser = () => {
      deleteBtnLoadingState.value = true;
      axios
        .delete(
        `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`
      )
        .then((response) => {
        if (response.status === 200) {
          let index = rows.value.findIndex(
            (row) => row.id === selectedRow.value.id
          );
          rows.value.splice(index, 1);
          form.value = {
              name: '',
              username: '',
              email: '',
              address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                  lat: '',
                  lng: ''
                }
              },
              phone:'', 
              website: '',
              company: {
                name: '',
                catchPhrase: '',
                bs: ''
        },
      }
        selectedRow.value = {};
      }
        deleteBtnLoadingState.value = false;
      });
  };
      return {
        form,
        rows,
        selectedRow,
        onRowClick,
        submitForm,
        getUser,
        columns,
        updateUser,
        deleteUser,
        deleteBtnLoadingState,
        btnLoadingState,  
  };
  }
  };
  export {rows};
  </script>
<template>
  <q-page class="q-ma-xl" >
    <q-form 
    v-if="selectedRow.id"
    ref="submitForm" @submit="updateUser()" class="q-ma-md">
      <q-input
      dense
      outlined
      style="width: 50%"
      v-model="form.name" 
      label="Name"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
       />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.username" 
      label="username"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined
      style="width: 50%"
      v-model="form.email"
      label="Email Address"
      :rules="[
        (val) => !val.includes(' ') || 'Email address should not contain spaces.',
        (val) => val.trim() !== '' || 'Required to fill',
      ]"
    />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.street" 
      label="Street"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.suite" 
      label="Suite"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.city" 
      label="City"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.zipcode" 
      label="Zipcode"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.geo.lat" 
      label="Lat"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.address.geo.lng" 
      label="Lng"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
    <q-input
      dense
      outlined
      style="width: 50%"
      v-model="form.phone" 
      label="Phone Number"
      :rules="[
        (val) => val.trim() !== '' || 'Required to fill.',
      ]"
    />
    <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.website" 
      label="Website"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.company.name"
      label="Company Name"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.company.catchPhrase" 
      label="Catch Phrase"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-input
      dense
      outlined 
      style="width: 50%"
      v-model="form.company.bs" 
      label="Bs"
      lazy-rules
         :rules="[(val) => !!val || 'Required to fill.']"
      />
      <q-btn  :loading = "btnLoadingState" type="" label= "Update"
      style="background-color: rgb(42, 126, 42); color: white"  />

      <q-btn
              style="background-color: rgb(42, 126, 42); color: white" 
              :loading="deleteBtnLoadingState"
              v-if="selectedRow.id"
              @click="deleteUser()"
              class="q-ml-md"
              label="Delete"
            />
    </q-form>
    <q-table
      title="List of Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="onRowClick"
    />
  </q-page>
</template>

