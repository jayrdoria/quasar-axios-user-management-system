import {ref} from 'vue';
import {form, submitForm} from "../pages/UserInfo"
import axios from 'axios';
import {rows} from "../pages/ListOfUsers"
let newRow = ref([]);
let ListOfUsers = ref([]);
let UserInfo = ref([]);
let btnLoadingState = ref(false);
let submit = () => {
  btnLoadingState.value = (true);
  axios
    .post("https://jsonplaceholder.typicode.com/users", form.value)
    .then((response) => {
    
    //   console.log(form.value);
    let newId = newRow.value.length;
      if (response.status === 201) {
        let row = response.data;
        console.log(row);
        newRow.value.push ( {
            id: ++ newId,
            name: row.name,
            username: row.username,
            email: row.email,
            address: {
              street: row.address.street,
              suite: row.address.suite,
              city: row.address.city,
              zipcode: row.address.zipcode,
              geo: {
                lat: row.address.geo.lat,
                lng: row.address.geo.lng,
              }
            },
            phone:row.phone, 
            website: row.website,
            company: {
              name: row.company.name,
              catchPhrase: row.company.catchPhrase,
              bs: row.company.bs,
            }

          });
        
        console.log(newRow.value);
        // rows.value.unshift(newRow.value);
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
          }
        };
        submitForm.value.reset(); // add this line to reset the form
      }
      btnLoadingState.value = (false);
    });
};


const getUser = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        newRow.value = response.data;
        rows.value = newRow.value;

      });
  };

      getUser();


export { ListOfUsers,UserInfo,submit,getUser,btnLoadingState}