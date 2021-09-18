**Create order API for user**
----
    Returns Success or Fail status message.

## Create order

* **URL**

  /api/order/

* **Method**

  `POST`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Headers**

  None

* **Data Params**

  `bookId=[id]` <br/>
  `bookWantedGetDate=[Date]` <br/>
  `wantedDuration=[numeric]` <br/>


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully created

----

* **Error Response:**


      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to create the order" }`

