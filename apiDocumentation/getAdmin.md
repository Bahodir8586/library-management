**GET admin information**
----
    Returns json DATA

## Get admin

* **URL**

  /api/admin

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
      `{name:"Abdullayev Bahodir"}`<br/>

  
----

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR
    * **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Not Found" }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to respond" }`

