**User registration API**
----
    Returns token.

## User register API

* **URL**

  /api/auth/user/register

* **Method**

  `POST`

* **Bearer Token**

  No

* **URL Params**

  None

* **Data Params**

  `firstName=[string]` <br/>
  `lastName=[string]` <br/>
  `email=[string]` <br/>
  `password=[string]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully registered

----

* **Error Response:**

  
    * **Code:** 400 BAD REQUEST <br />
      **Content:** `{ error : "Bad Request" }`

      OR

    * **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data" }`

