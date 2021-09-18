**Return book API for user**
----
    Returns Success or Fail status message.

## Return book

* **URL**

  /api/order/return/${id}

* **Method**

  `PATCH or POST or PUT`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Headers**

  None

* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully returned

----

* **Error Response:**


      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

      **Code:** 405 Not Allowed <br />
      **Content:** `{ error : "Not Allowed" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to create the order" }`

