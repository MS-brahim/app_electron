
// user login
function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
  
    axios
      .post('http://localhost:8080/login', {
        mail: email,
        password: password
      })
      .then((res) => {
        if (res.data.error) {
          const error = document.getElementById('error')
          error.innerHTML = res.data.error[0]
          console.log(res.data.error[0])
        } else {
          console.log(res.data.token)
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('token', res.data.token)
          window.location.href = 'userDashbord.html'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  // decoding token
  const token = localStorage.getItem('token')
  
  const Id = localStorage.getItem('id')
  console.log(Id)
  
  // getting one user
  function getOneUser() {
    axios
      .get(`http://localhost:8080/getEmployeeByid/${Id}`)
      .then((res) => {
        const showData = document.getElementById('user_table')
        console.log(res.data)
        const data = res.data
  
        const html = `
              <td>${data.name}</td>
              <td>${data.mail}</td>
              <td>${data.dateOfBirth}</td>
              <td>${data.cin}</td>
              <td>${data.registration_number}</td>
              `
        showData.innerHTML = html
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getOneUser()
  
  
  // log out 
  function logOut() {
      localStorage.removeItem('token')
      window.location.href = 'userLogin.html'
  }