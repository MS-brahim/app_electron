// loging as admin
function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
  
    axios
      .post('http://localhost:8080/admin/login', {
        email: email,
        password: password
      })
      .then((res) => {
        if (res.data.error) {
          const error = document.getElementById('error')
          error.innerHTML = res.data.error[0]
          console.log(res.data.error[0])
        } else {
          console.log(res.data)
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("id",res.data.id);
          window.location.href = 'home.html'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  // adding new user
  function addUser() {
    const fullName = document.getElementById('fullName').value
    const email = document.getElementById('email').value
    const dateBirth = document.getElementById('dateBirth').value
    const numRegister = document.getElementById('numRegister').value
    const cin = document.getElementById('cin').value
    const password = document.getElementById('password').value
  
    const error = document.getElementById('error')
    if (
      fullName === '' ||
      email === '' ||
      dateBirth === '' ||
      numRegister === '' ||
      cin === '' ||
      password === ''
    ) {
      error.innerHTML = 'please fill all inputs'
    } else {
      axios
        .post('http://localhost:8080/addEmployee', {
          name: fullName,
          mail: email,
          password: password,
          cin: cin,
          dateOfBirth: dateBirth,
          registration_number: numRegister
        })
        .then((res) => {
          if (res.data.error) {
            const error = document.getElementById('error')
            error.innerHTML = res.data.error[0]
            console.log(res.data.error[0])
          } else {
            console.log(res.data)
            getAllUsers();
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  
  // getting all users
  function getAllUsers() {
    axios
      .get('http://localhost:8080/getEmployee')
      .then((res) => {
        const showData = document.getElementById('admin_table')
  
        const data = res.data
        data.map(user => {
          const html = `
            <td>${user.name}</td>
            <td>${user.mail}</td>
            <td>${user.dateOfBirth}</td>
            <td>${user.cin}</td>
            <td>${user.registration_number}</td>
            `
          showData.innerHTML += html
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getAllUsers()
  
  
  // admin logout
  
  function logOut() {
    //localStorage.removeItem('token')
    window.location.href = 'index.html'
  }