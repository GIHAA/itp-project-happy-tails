import axios from 'axios'

const API_URL = 'http://localhost:8080/api/users/'

const updateUser = async (userData) => {
    
    const response = await axios.post(API_URL + 'update', userData, {
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      })

    return response.data
}

export default updateUser