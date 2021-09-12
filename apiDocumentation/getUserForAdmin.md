**GET user API for admin or librarian**
----

    Returns json DATA

## Get user

* **URL**

  /api/${admin||librarian}/users/${id}

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  None


* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**
      `{id:1,image:"url", username:"bahodir01", fullName:"Abdullayev Bahodir",onProcess:"1", inDebt:"0", finished:"18""}`<br/>

  
----

* **Error Response:**

      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR
      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Not Found" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to respond" }`

