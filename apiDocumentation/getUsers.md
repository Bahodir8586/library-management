**Search Users API for admin and librarian**
----
    Returns json data.

## Search user

* **URL**

  /api/admin/users/search

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  `filter=[all|blocked|active|debtor|noDebtor]` <br/>
  `searchText=[string]` <br/>
  `searchBy=[fullName|email]` <br/>
  `page=[numeric|min:1]` <br/>

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**

  `{`<br/>
  `id: 4, ` </br>
  `image: "/url",` </br>
  `fullName: "Bahodir Abdullayev",`</br>
  `email: "bahodira213@gmail.com",`</br>
  `active: "true|false",`</br>

  If no users found return [ ]
----



* **Error Response:**


      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "User not found!" }`

      OR
  
      **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Unauthorized!" }`

      OR

      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data }`

