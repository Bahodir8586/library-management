**Librarian login API**
----
    Returns token.

## Librarian login API

* **URL**

  /api/auth/librarian/login

* **Method**

  `POST`

* **Bearer Token**

  No

* **URL Params**

  None

* **Data Params**

  `username=[string]` <br/>
  `password=[string]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully logged in

----

* **Error Response:**


      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Credentials do not match" }`

      OR
      **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "Bad Request" }`

      OR

      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data" }`

